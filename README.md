# Raspberry

Raspberry Pi projects: adhan (prayer times) player with Telegram notifications, and a small Telegram bot to test the speaker.

## Projects

### Adzan (adhan app)

Plays adhan at prayer times for Singapore and sends Telegram notifications.

- Fetches times from [Aladhan API](https://aladhan.com/prayer-times-api).
- Uses separate audio for Fajr; same file for other prayers.
- Requires: `adzan.mp3`, `fajr_adzan.mp3` in the `adzan/` directory.

**Run locally:**

```bash
cd adzan
export TELEGRAM_BOT_TOKEN="your-bot-token"
export TELEGRAM_CHAT_ID="your-chat-id"
pip install -r requirements.txt && pip install pygame
python main.py
```

**Run with Docker:**

```bash
export TELEGRAM_BOT_TOKEN="your-bot-token"
export TELEGRAM_CHAT_ID="your-chat-id"
docker compose up adzan-app
```

### Audio bot

Telegram bot that plays `bell.wav` when you send the `/bell` command (useful for testing the speaker).

**Run locally:**

```bash
cd audio
export TELEGRAM_BOT_TOKEN="your-bot-token"
pip install -r requirements.txt && pip install pygame
python main.py
```

**Run with Docker:**

```bash
export TELEGRAM_BOT_TOKEN="your-bot-token"
docker compose up audio-bot
```

### vite-project

React + TypeScript + Vite app (default template). Not wired into Docker.

```bash
cd vite-project && pnpm install && pnpm dev
```

## Environment variables

| Variable | Used by | Description |
|----------|---------|-------------|
| `TELEGRAM_BOT_TOKEN` | adzan, audio bot | Telegram Bot API token |
| `TELEGRAM_CHAT_ID` | adzan only | Chat ID for adhan notifications |

Create a bot with [@BotFather](https://t.me/BotFather) and get your chat ID (e.g. from [@userinfobot](https://t.me/userinfobot)). Do not commit tokens; use a `.env` file or export in the shell.

## Tests

```bash
cd adzan && python -m pytest test_main.py -v
# or
python -m unittest test_main
```
