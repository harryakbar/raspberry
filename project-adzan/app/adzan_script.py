import pygame.mixer
import os
import time

FILE_PATH = './adzan.mp3'
os.environ["SDL_AUDIODRIVER"] = "alsa"

pygame.mixer.init()

def play_adzan_sound():
    print(f"Playing Adzan...")
    pygame.mixer.music.load(FILE_PATH)
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy():
        time.sleep(1)

def main():
    play_adzan_sound()

if __name__ == "__main__":
    main()