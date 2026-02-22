import os
import time
import pygame
import requests
from datetime import date
from datetime import datetime, timedelta

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")
ADZAN_FILE_PATH = "./adzan.mp3"
FAJR_ADZAN_FILE_PATH = "./fajr_adzan.mp3"

adzan_files = {
    'fajr': FAJR_ADZAN_FILE_PATH,
    'dhuhr': ADZAN_FILE_PATH,
    'asr': ADZAN_FILE_PATH,
    'maghrib': ADZAN_FILE_PATH,
    'isha': ADZAN_FILE_PATH
}

def play_adzan(prayer_name):
    print(f"Playing {prayer_name} Adzan...")
    pygame.mixer.init()
    pygame.mixer.music.load(adzan_files[prayer_name])
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy():
        time.sleep(1)

def fetch_prayer_times():
    url = f"http://api.aladhan.com/v1/timingsByCity?city=Singapore&country=SG&method=11"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        timings = data['data']['timings']
        today = datetime.now().date()
        return {
            'fajr': datetime.combine(today, datetime.strptime(timings['Fajr'], "%H:%M").time()),
            'dhuhr': datetime.combine(today, datetime.strptime(timings['Dhuhr'], "%H:%M").time()),
            'asr': datetime.combine(today, datetime.strptime(timings['Asr'], "%H:%M").time()),
            'maghrib': datetime.combine(today, datetime.strptime(timings['Maghrib'], "%H:%M").time()),
            'isha': datetime.combine(today, datetime.strptime(timings['Isha'], "%H:%M").time())
        }
    else:
        print("Failed to fetch prayer times:", response.text)
        return None

def send_telegram_message(message):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": CHAT_ID,
        "text": message
    }
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("Message sent successfully!")
        else:
            print("Failed to send message:", response.text)
    except Exception as e:
        print("Error:", e)

prayer_times = fetch_prayer_times()

def notify_adzan(prayer_name):
    current_time = datetime.now().strftime("%H:%M")
    message = f"Hi! Adzan {prayer_name} has started! ({current_time})"
    send_telegram_message(message)

def main():
    while True:
        now = datetime.now()

        if now.hour == prayer_times['fajr'].hour and now.minute == prayer_times['fajr'].minute:
            notify_adzan('Fajr')
            play_adzan('fajr')
        elif now.hour == prayer_times['dhuhr'].hour and now.minute == prayer_times['dhuhr'].minute:
            notify_adzan('Dhuhr')
            play_adzan('dhuhr')
        elif now.hour == prayer_times['asr'].hour and now.minute == prayer_times['asr'].minute:
            notify_adzan('Asr')
            play_adzan('asr')
        elif now.hour == prayer_times['maghrib'].hour and now.minute == prayer_times['maghrib'].minute:
            notify_adzan('Maghrib')
            play_adzan('maghrib')
        elif now.hour == prayer_times['isha'].hour and now.minute == prayer_times['isha'].minute:
            notify_adzan('Isha')
            play_adzan('isha')

        time.sleep(60)

if __name__ == "__main__":
    if not BOT_TOKEN or not CHAT_ID:
        print("Error: Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.")
        exit(1)
    try:
        send_telegram_message("starting adzan bot...")
        main()
    except Exception as e:
        print(f"Error: {e}")
