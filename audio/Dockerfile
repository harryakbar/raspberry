FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    alsa-utils \
    libasound2 \
    pulseaudio \
    libpulse0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
COPY . .
RUN pip install -r requirements.txt
RUN pip install pygame

CMD ["python", "main.py"]
