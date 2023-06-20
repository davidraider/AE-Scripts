import os, ffmpeg,tkinter,customtkinter

# system settings
customtkinter.set_appearance_mode("dark")
customtkinter.set_default_color_theme("blue")

# app frame
app = customtkinter.CTk()
app.geometry("640x360")
app.title("Video_Compressor")

# UI Elements
title = customtkinter.CTkLabel(app,text="Select Video Path")
title.pack(padx=10,pady=10)

path_url = tkinter.StringVar()
path = customtkinter.CTkEntry(app,width=350,height=35,textvariable=path_url)
path.pack()

#covert button

convert = customtkinter.CTkButton(app, text="Convert")
convert.pack(padx=10,pady=10)

app.mainloop()

def compress_video(video_full_path, output_file_name, target_size,shell=True):
    # Reference: https://en.wikipedia.org/wiki/Bit_rate#Encoding_bit_rate
    min_audio_bitrate = 32000
    max_audio_bitrate = 256000

    probe = ffmpeg.probe(video_full_path)
    # Video duration, in s.
    duration = float(probe['format']['duration'])
    # Audio bitrate, in bps.
    audio_bitrate = float(next((s for s in probe['streams'] if s['codec_type'] == 'audio'), None)['bit_rate'])
    # Target total bitrate, in bps.
    target_total_bitrate = (target_size * 1024 * 8) / (1.073741824 * duration)

    # Target audio bitrate, in bps
    if 10 * audio_bitrate > target_total_bitrate:
        audio_bitrate = target_total_bitrate / 10
        if audio_bitrate < min_audio_bitrate < target_total_bitrate:
            audio_bitrate = min_audio_bitrate
        elif audio_bitrate > max_audio_bitrate:
            audio_bitrate = max_audio_bitrate
    # Target video bitrate, in bps.
    video_bitrate = target_total_bitrate - audio_bitrate

    i = ffmpeg.input(video_full_path)
    ffmpeg.output(i, os.devnull,
                  **{'c:v': 'libx264', 'b:v': video_bitrate, 'pass': 1, 'f': 'mp4'}
                  ).overwrite_output().run()
    ffmpeg.output(i, output_file_name,
                  **{'c:v': 'libx264', 'b:v': video_bitrate, 'pass': 2, 'c:a': 'aac', 'b:a': audio_bitrate}
                  ).overwrite_output().run()

compress_video('PV diagram 17062023.mp4','PV diagram 17062023_convert.mp4',50*1000)
