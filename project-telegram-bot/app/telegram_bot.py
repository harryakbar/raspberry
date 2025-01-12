import telegram
from telegram.ext import Updater, CommandHandler

BOT_TOKEN = "7607085823:AAH-lo6Dm9JfXZGfwh7NJGyFCZihG1KEiZ0"

def start(update, context):
    update.message.reply_text("Hello! Use /test_speaker to test the adzan sound.")

def test_speaker(update, context):
    # Simulate speaker testing
    update.message.reply_text("Speaker test initiated!")

def main():
    updater = Updater(BOT_TOKEN, use_context=True)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("test_speaker", test_speaker))
    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    main()
