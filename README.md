# Universal Video Downloader

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![Django](https://img.shields.io/badge/django-5.0%2B-green)
![React](https://img.shields.io/badge/react-18-blue)
![Next.js](https://img.shields.io/badge/next.js-14-black)

## 🚀 Introduction
**Universal Video Downloader** is a production-grade, open-source solution for downloading high-quality videos from social media platforms like Facebook, TikTok, YouTube, and more. Designed with a clean Monorepo architecture, it features a robust Django backend and a high-performance Next.js frontend, ensuring scalability, security, and a premium user experience.

## ✨ Features
- **Multi-Platform Support**: Seamlessly download from FB, TikTok, YT, and other supported sites.
- **Smart Quality Selection**: Auto-detects and offers HD, SD, and Audio-only options.
- **Auto-Merge Technology**: Automatically merges video and audio streams for superior quality using `yt-dlp`.
- **Privacy First**: Zero-logging policy ensuring user anonymity.
- **Modern UI/UX**: A sleek, responsive interface built with React, Tailwind CSS, and Framer Motion.
- **Production Ready**: Docked with Celery for async tasks, Redis for caching, and strict security configurations.

## 🛠️ Tech Stack
- **Backend**: Django Rest Framework (DRF), Celery, Redis
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Utilities**: yt-dlp, FFmpeg

## ⚡ Quick Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+
- Redis (for async tasks)
- FFmpeg (for media processing)

### 📂 Backend Setup (Django)

1.  **Navigate to the backend:**
    ```bash
    cd backend
    ```

2.  **Create virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment:**
    ```bash
    cp .env.example .env
    # Update .env with your REDIS_URL and SECRET_KEY
    ```

5.  **Run Migrations & Server:**
    ```bash
    python manage.py migrate
    python manage.py runserver 8000
    ```
    *The API will be available at `http://localhost:8000`*

6.  **Run Celery Worker (Required for Downloads):**
    Open a new terminal, activate venv, and run:
    ```bash
    celery -A core worker --loglevel=info
    ```
    *Ensure Redis is running: `redis-server`*

### 💻 Frontend Setup (Next.js)

1.  **Navigate to the frontend:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    ```bash
    cp .env.local.example .env.local
    ```

4.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    *The Frontend will be available at `http://localhost:3000`*

## 🤝 Contributing
We welcome contributions from the community!

1.  **Fork** the repository.
2.  Create a **Feature Branch** (`git checkout -b feature/NewFeature`).
3.  **Commit** changes (`git commit -m 'Add NewFeature'`).
4.  **Push** to Branch (`git push origin feature/NewFeature`).
5.  Open a **Pull Request**.

## 📄 License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---
*Built with ❤️ for the Open Source Community.*
# Just-Save-Vid
