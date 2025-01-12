from unittest.mock import MagicMock
from app.telegram_bot import test_speaker

def test_test_speaker():
    # Mock the `update` and `context` objects
    update = MagicMock()
    context = MagicMock()

    # Mock the message object inside `update`
    update.message.reply_text = MagicMock()

    # Call the function
    test_speaker(update, context)

    # Assert that `reply_text` was called with the expected message
    update.message.reply_text.assert_called_once_with("Speaker test initiated!")
