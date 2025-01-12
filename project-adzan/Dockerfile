FROM python:3.11-slim

WORKDIR /app

# Install required libraries
RUN apt-get update && apt-get install -y \
    alsa-utils \
    libasound2 \
    libasound2-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy your application code
COPY app/ .

CMD ["python", "adzan_script.py"]
