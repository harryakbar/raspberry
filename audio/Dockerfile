FROM python:3.11-slim
RUN apt-get update && apt-get install -y \
    alsa-utils \
    bluez \
    python3-pygame \
    pygame
WORKDIR /app
COPY . .
CMD ["python", "your_audio_app.py"]
