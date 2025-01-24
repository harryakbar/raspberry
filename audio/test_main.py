import unittest
from unittest.mock import patch, MagicMock
from datetime import datetime
from main import fetch_prayer_times
from telegram import Update, Message
from telegram.ext import CallbackContext


class TestMain(unittest.TestCase):

    @patch('main.requests.get')
    def test_fetch_prayer_times_success(self, mock_get):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'data': {
                'timings': {
                    'Fajr': '05:30',
                    'Dhuhr': '12:00',
                    'Asr': '15:30',
                    'Maghrib': '18:00',
                    'Isha': '19:30'
                }
            }
        }
        mock_get.return_value = mock_response

        # Mocking the Update and CallbackContext objects
        mock_update = MagicMock(spec=Update)
        mock_message = MagicMock(spec=Message)
        mock_update.message = mock_message
        mock_context = MagicMock(spec=CallbackContext)

        prayer_times = fetch_prayer_times(mock_update, mock_context)
        self.assertIsNotNone(prayer_times)
        self.assertEqual(prayer_times['fajr'].time(), datetime.strptime('05:30', "%H:%M").time())
        self.assertEqual(prayer_times['dhuhr'].time(), datetime.strptime('12:00', "%H:%M").time())
        self.assertEqual(prayer_times['asr'].time(), datetime.strptime('15:30', "%H:%M").time())
        self.assertEqual(prayer_times['maghrib'].time(), datetime.strptime('18:00', "%H:%M").time())
        self.assertEqual(prayer_times['isha'].time(), datetime.strptime('19:30', "%H:%M").time())

        mock_update.message.reply_text.assert_called()

    @patch('main.requests.get')
    def test_fetch_prayer_times_failure(self, mock_get):
        mock_response = MagicMock()
        mock_response.status_code = 404
        mock_response.text = 'Not Found'
        mock_get.return_value = mock_response

        # Mocking the Update and CallbackContext objects
        mock_update = MagicMock(spec=Update)
        mock_message = MagicMock(spec=Message)
        mock_update.message = mock_message
        mock_context = MagicMock(spec=CallbackContext)

        prayer_times = fetch_prayer_times(mock_update, mock_context)
        self.assertIsNone(prayer_times)
        mock_update.message.reply_text.assert_called()
if __name__ == '__main__':
    unittest.main()
