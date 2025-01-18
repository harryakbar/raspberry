import pygame
import time

def play_audio(file_path):
    # Initialize the mixer module
    pygame.mixer.init()

    # Load the audio file
    pygame.mixer.music.load(file_path)

    # Play the audio
    print(f"Playing {file_path}")
    pygame.mixer.music.play()

    # Wait until the music finishes playing
    while pygame.mixer.music.get_busy():
        time.sleep(1)

if __name__ == "__main__":
    # Path to the audio file you want to play
    audio_file = "./adzan.mp3"

    try:
        play_audio(audio_file)
    except Exception as e:
        print(f"Error: {e}")
