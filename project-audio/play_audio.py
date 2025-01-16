from pydub import AudioSegment
import simpleaudio as sa

# Load your audio file
audio = AudioSegment.from_file('./adzan.mp3')

# Play the audio
play_obj = sa.play_buffer(audio.raw_data, num_channels=audio.channels,
                          bytes_per_sample=audio.sample_width, sample_rate=audio.frame_rate)

# Wait for the audio to finish playing
play_obj.wait_done()
