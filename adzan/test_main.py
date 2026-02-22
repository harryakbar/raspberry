import unittest
from datetime import datetime
from unittest.mock import patch, MagicMock
from main import fetch_prayer_times, send_telegram_message

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

        prayer_times = fetch_prayer_times()
        self.assertIsNotNone(prayer_times)
        self.assertEqual(prayer_times['fajr'].time(), datetime.strptime('05:30', "%H:%M").time())
        self.assertEqual(prayer_times['dhuhr'].time(), datetime.strptime('12:00', "%H:%M").time())
        self.assertEqual(prayer_times['asr'].time(), datetime.strptime('15:30', "%H:%M").time())
        self.assertEqual(prayer_times['maghrib'].time(), datetime.strptime('18:00', "%H:%M").time())
        self.assertEqual(prayer_times['isha'].time(), datetime.strptime('19:30', "%H:%M").time())

    @patch('main.requests.get')
    def test_fetch_prayer_times_failure(self, mock_get):
        mock_response = MagicMock()
        mock_response.status_code = 404
        mock_response.text = 'Not Found'
        mock_get.return_value = mock_response

        prayer_times = fetch_prayer_times()
        self.assertIsNone(prayer_times)

    @patch('main.requests.post')
    def test_send_telegram_message_success(self, mock_post):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_post.return_value = mock_response

        with patch('builtins.print') as mocked_print:
            send_telegram_message("Test message")
            mocked_print.assert_called_with("Message sent successfully!")

    @patch('main.requests.post')
    def test_send_telegram_message_failure(self, mock_post):
        mock_response = MagicMock()
        mock_response.status_code = 400
        mock_response.text = 'Bad Request'
        mock_post.return_value = mock_response

        with patch('builtins.print') as mocked_print:
            send_telegram_message("Test message")
            mocked_print.assert_called_with("Failed to send message:", 'Bad Request')

if __name__ == '__main__':
    unittest.main()