#!/bin/bash
# Helper script to run Django on LAN
source ../venv/bin/activate
echo "Starting Backend on 0.0.0.0:8002..."
python manage.py runserver 0.0.0.0:8002
