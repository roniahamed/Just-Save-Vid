# Comprehensive Setup Guide

## 🔧 Prerequisites
Before starting, ensure you have the following installed:
- **Python 3.10+**: [Download Here](https://www.python.org/downloads/)
- **Node.js 18+**: [Download Here](https://nodejs.org/)
- **Redis**: Required for Celery (background tasks).
    - Linux: `sudo apt install redis-server`
    - Mac: `brew install redis`
    - Windows: Use WSL2 or Docker.

---

## 🏗️ Backend Setup (Django)
The backend runs on **Port 8002**.

### 1. Environment Variables
Navigate to `backend/` and create a `.env` file:
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
REDIS_URL=redis://localhost:6379/1

# Optional (helps with some YouTube 403 / age-restricted videos on your own machine)
# YTDLP_COOKIES_FROM_BROWSER=chrome

# Optional (try multiple YouTube client profiles; can reduce 403 on some videos)
# YTDLP_YOUTUBE_PLAYER_CLIENTS=android,ios,web

# Optional (controls filename truncation length)
# YTDLP_TITLE_MAXLEN=80
```

### 2. Installation
```bash
cd backend
python -m venv venv
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

pip install -r requirements.txt
```

### 3. Database Migration
```bash
python manage.py migrate
```

### 4. Running the Server
```bash
python manage.py runserver 8002
```

### 5. Running background tasks (Celery)
To download videos, you MUST run a Celery worker in a separate terminal:
```bash
# In a new terminal, navigate to backend and activate venv
cd backend
source venv/bin/activate
celery -A core worker --loglevel=info
```

---

## 🎨 Frontend Setup (Next.js)
The frontend runs on **Port 3000**.

### 1. Environment Variables
Navigate to `frontend/` and create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8002/api/v1
```

### 2. Installation & Run
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## ❓ FAQ

### Why two `.env` files?
- `backend/.env` is for **Server Secrets** (DB passwords, API keys) that must never be exposed.
- `frontend/.env.local` is for **Public Configuration** (identifying the API URL) required by the client-side browser.

### "Connection Refused" error?
Ensure Redis is running: `sudo service redis-server start` (Linux).
