FROM python:3.9-slim

WORKDIR /app

# Install SDL2 development libraries
RUN apt-get update && apt-get install -y \
    libsdl2-dev libsdl2-image-dev libsdl2-mixer-dev libsdl2-ttf-dev \
    libsmpeg-dev libportmidi-dev libavformat-dev libswscale-dev libjpeg-dev zlib1g-dev \
    && apt-get clean

# Copy the requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the application files
COPY app/ .

CMD ["python", "adzan_script.py"]
