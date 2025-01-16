FROM arm32v7/python:3.9-slim

# Install dependencies and build tools
RUN apt-get update && \
    apt-get install -y \
    pulseaudio \
    libsndfile1 \
    sox \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create a directory for the app
WORKDIR /app

# Copy your Python application into the container
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variable for PulseAudio
ENV PULSE_SERVER=unix:/run/pulse/native

# Run the application
CMD ["python", "play_audio.py"]
