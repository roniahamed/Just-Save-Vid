import os
import uuid
import shutil
import logging
import yt_dlp
from django.conf import settings

logger = logging.getLogger(__name__)

class VideoDownloaderService:
    def __init__(self):
        title_max_len = 80
        try:
            configured_len = int(os.environ.get('YTDLP_TITLE_MAXLEN', title_max_len))
            title_max_len = max(20, min(200, configured_len))
        except (TypeError, ValueError):
            title_max_len = 80

        cookies_from_browser = os.environ.get('YTDLP_COOKIES_FROM_BROWSER', '').strip()
        youtube_clients_raw = os.environ.get('YTDLP_YOUTUBE_PLAYER_CLIENTS', 'android,ios,web').strip()
        youtube_clients = [c.strip() for c in youtube_clients_raw.split(',') if c.strip()]

        self.base_opts = {
            'quiet': True,
            'noplaylist': True,
            'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            # yt-dlp enables only Deno by default. Explicitly enabling Node avoids
            # degraded YouTube extraction on systems without Deno installed.
            'js_runtimes': {
                'node': {},
            },
            # Avoid pathological filename issues with very long titles
            'trim_file_name': title_max_len,
        }

        # Some YouTube videos fail with certain web clients (403/blocked formats).
        # Try multiple client profiles to improve reliability.
        if youtube_clients:
            self.base_opts['extractor_args'] = {
                **(self.base_opts.get('extractor_args') or {}),
                'youtube': {
                    'player_client': youtube_clients,
                },
            }

        # Optional: allow authenticated/age-restricted downloads in local setups.
        # Example: YTDLP_COOKIES_FROM_BROWSER=chrome
        # Note: this reads cookies from the machine running the backend.
        if cookies_from_browser:
            self.base_opts['cookiesfrombrowser'] = (cookies_from_browser,)

    def _get_filesize_str(self, filesize):
        if not filesize:
            return "Unknown"
        return f"{filesize / (1024 * 1024):.2f} MB"

    def analyze(self, url):
        """Extract metadata and available formats for the given URL."""
        opts = self.base_opts.copy()
        
        try:
            with yt_dlp.YoutubeDL(opts) as ydl:
                info = ydl.extract_info(url, download=False)

            formats = []
            raw_formats = info.get('formats', [])

            # Identify best audio for merging if needed
            best_audio_id = None
            audio_formats = [f for f in raw_formats if f.get('vcodec') == 'none' and f.get('acodec') != 'none']
            if audio_formats:
                best_audio_id = audio_formats[-1]['format_id']

            for f in raw_formats:
                vcodec = f.get('vcodec')
                acodec = f.get('acodec')
                height = f.get('height')
                filesize = f.get('filesize') or f.get('filesize_approx')

                # Skip audio-only
                if vcodec == 'none':
                    continue
                
                # Determine if merge is needed (Video-only 1080p+ usually)
                needs_merge = False
                if acodec == 'none' and vcodec != 'none':
                    needs_merge = True

                format_id = f['format_id']
                if needs_merge and best_audio_id:
                    format_id = f"{format_id}+{best_audio_id}"
                
                resolution = f"{height}p" if height else "Unknown"
                if not height:
                    resolution = "Auto/Best"

                # TikTok HD Check
                note = f.get('format_note') or ''
                if info.get('extractor_key') == 'TikTok' and height and height >= 1080:
                     note = "HD"
                
                if needs_merge:
                     note = f"{note} (Merged)" if note else "(Merged)"

                formats.append({
                    "format_id": format_id,
                    "resolution": resolution,
                    "ext": f.get('ext', 'mp4'),
                    "filesize": self._get_filesize_str(filesize),
                    "note": note.strip()
                })

            formats.insert(0, {
                "format_id": "best",
                "resolution": "Best Available",
                "ext": "mp4",
                "filesize": "Unknown",
                "note": "Let server decide"
            })
            
            # Remove duplicates
            unique_formats = []
            seen_ids = set()
            for fmt in formats:
                if fmt['format_id'] not in seen_ids:
                    unique_formats.append(fmt)
                    seen_ids.add(fmt['format_id'])

            unique_formats.reverse()

            return {
                "status": "success",
                "title": info.get('title', 'Video'),
                "thumbnail": info.get('thumbnail'),
                "source": info.get('extractor_key'),
                "duration": info.get('duration_string'),
                "formats": unique_formats
            }

        except Exception as e:
            logger.error(f"Analysis failed: {e}")
            raise Exception(f"Analysis failed: {str(e)}")

    def download(self, url, format_id):
        """Download the video and return the file path and temp dir."""
        request_id = str(uuid.uuid4())
        temp_dir = settings.MEDIA_ROOT / 'temp' / request_id
        temp_dir.mkdir(parents=True, exist_ok=True)

        opts = self.base_opts.copy()
        
        # Format selection logic
        if format_id == 'best':
            if "tiktok.com" in url:
                opts['format'] = "best[height>=1280]/best[height>=1080]/best"
            else:
                opts['format'] = 'bestvideo+bestaudio/best'
        else:
            opts['format'] = format_id

        # Merge output format to MP4 if needed
        if '+' in format_id or opts.get('format', '') == 'bestvideo+bestaudio/best':
            opts['merge_output_format'] = 'mp4'

        # Limit filename length to prevent filesystem errors (especially with Unicode)
        title_max_len = int(opts.get('trim_file_name') or 80)
        opts['outtmpl'] = str(temp_dir / f'%(title).{title_max_len}s.%(ext)s')

        try:
            with yt_dlp.YoutubeDL(opts) as ydl:
                ydl.extract_info(url, download=True)

            # Don't guess the final filename (merges can change extension).
            # Pick the actual produced file from the temp folder.
            candidates = []
            for path in temp_dir.rglob('*'):
                if not path.is_file():
                    continue
                name = path.name
                if name.endswith('.part') or name.endswith('.ytdl'):
                    continue
                candidates.append(path)

            if not candidates:
                raise Exception("File not found after download.")

            best_path = max(candidates, key=lambda p: (p.stat().st_size, p.stat().st_mtime))
            return str(best_path), temp_dir

        except Exception as e:
            if temp_dir.exists():
                shutil.rmtree(temp_dir)

            msg = str(e)
            if 'HTTP Error 403' in msg or '403: Forbidden' in msg:
                raise Exception(
                    "Download failed: HTTP 403 Forbidden. This video may require login/cookies, be age/region restricted, or temporarily blocked. "
                    "If this is your own browser session, you can set YTDLP_COOKIES_FROM_BROWSER (e.g. chrome) on the backend machine and retry."
                )

            raise Exception(f"Download failed: {msg}")
