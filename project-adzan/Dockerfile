# Use a lightweight Python image compatible with Raspberry Pi
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application code to the container
COPY app/ .
COPY ./adzan.mp3 .

# Install necessary system libraries and Python dependencies
RUN apt-get update && apt-get install -y \
    libsdl2-mixer-2.0-0 \
    && pip install --no-cache-dir pygame \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the default command to run the script
CMD ["python", "adzan_script.py"]
