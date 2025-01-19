import pygame
import time

import telegram
from telegram.ext import Updater, CommandHandler

BOT_TOKEN = "7607085823:AAH-lo6Dm9JfXZGfwh7NJGyFCZihG1KEiZ0"

def start(update, context):
    update.message.reply_text("Hello! Use /test_speaker to test the adzan sound.")

def test_speaker(update, context):
    # Simulate speaker testing
    update.message.reply_text("Speaker test initiated!")
    play_audio()

def play_audio():
    file_path = "./bell.wav"

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

def main():
    updater = Updater(BOT_TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("bell", test_speaker))
    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"Error: {e}")
