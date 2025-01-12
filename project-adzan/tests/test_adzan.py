import pytest
from app.adzan_script import play_adzan_sound

def test_play_adzan_sound(monkeypatch):
    def mock_init():
        pass
    def mock_load(file_path):
        assert file_path == "test_adzan.mp3"
    def mock_play():
        pass
    def mock_get_busy():
        return False

    monkeypatch.setattr("pygame.mixer.init", mock_init)
    monkeypatch.setattr("pygame.mixer.music.load", mock_load)
    monkeypatch.setattr("pygame.mixer.music.play", mock_play)
    monkeypatch.setattr("pygame.mixer.music.get_busy", mock_get_busy)

    play_adzan_sound("test_adzan.mp3")
