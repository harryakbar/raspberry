import os
import sys
import pygame
import time
import requests
from datetime import datetime
from telegram.ext import Updater, CommandHandler

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")

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

def fetch_prayer_times(update, context):
    url = f"http://api.aladhan.com/v1/timingsByCity?city=Singapore&country=SG&method=11"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        timings = data['data']['timings']
        today = datetime.now().date()
        
        prayer_times = {
            'fajr': datetime.combine(today, datetime.strptime(timings['Fajr'], "%H:%M").time()),
            'dhuhr': datetime.combine(today, datetime.strptime(timings['Dhuhr'], "%H:%M").time()),
            'asr': datetime.combine(today, datetime.strptime(timings['Asr'], "%H:%M").time()),
            'maghrib': datetime.combine(today, datetime.strptime(timings['Maghrib'], "%H:%M").time()),
            'isha': datetime.combine(today, datetime.strptime(timings['Isha'], "%H:%M").time())
        }
        
        message = "🕌 Prayer times today 🕌\n"
        message += f"- Fajr: {prayer_times['fajr'].strftime('%H:%M')}\n"
        message += f"- Dhuhr: {prayer_times['dhuhr'].strftime('%H:%M')}\n"
        message += f"- Asr: {prayer_times['asr'].strftime('%H:%M')}\n"
        message += f"- Maghrib: {prayer_times['maghrib'].strftime('%H:%M')}\n"
        message += f"- Isha: {prayer_times['isha'].strftime('%H:%M')}"
        
        update.message.reply_text(message)
        return prayer_times
        
    else:
        print("Failed to fetch prayer times:", response.text)
        update.message.reply_text("Failed to fetch prayer times.")
        return None


def main():
    updater = Updater(BOT_TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("bell", test_speaker))
    dp.add_handler(CommandHandler("adzan", fetch_prayer_times))
    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    if not BOT_TOKEN:
        print("Error: Set TELEGRAM_BOT_TOKEN environment variable.")
        sys.exit(1)
    try:
        main()
    except Exception as e:
        print(f"Error: {e}")
