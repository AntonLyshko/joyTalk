from flask import Flask
from flask_cors import CORS
from flask import request
import requests
import threading
import userbot
from userbot import UserBot
from pyrogram import filters
import asyncio
import json
from pyrogram import Client, filters, idle
from pyrogram import filters
from pyrogram.handlers import MessageHandler
import config
import wave
import urllib.request
import base64
import os
from scipy.io import wavfile



from scipy.io.wavfile import write



API_ID = config.api_id
API_HASH = config.api_hash


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# userbotClass = UserBot()

@app.route('/api/dialog', methods=['POST'])
def send_message():
    reqData = json.loads(request.data)
    print('sending messsage', reqData['content'])
    with Client('anon',api_id=API_ID,api_hash=API_HASH) as pyro:
        pyro.send_message('me', reqData['content'])
    return {'success': 'true'}

@app.route('/api/syntesis', methods=['POST'])
def sytensis_request():    
    reqData = json.loads(request.data)
    text = reqData['text']
    url = 'https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize'
    headers = {'Authorization': 'Bearer ' + config.IAM_TOKEN}
    data = {
        'text': text,
        'lang': 'ru-RU',
        'voice': 'jane',
        'folderId': config.FOLDER_ID,
        'format': 'lpcm',
        'sampleRateHertz': 48000,
    }
    response = requests.post(url, data=data, headers=headers)
    raw = open("../filestore/speech.raw", "wb")
    for chunk in response.iter_content(chunk_size=None):     
        raw.write(chunk)
    
    raw = open("../filestore/speech.raw", "rb")
    data = raw.read()
    out_wav = wave.open("../filestore/speech.wav", "wb")

    out_wav.setnchannels(1)
    out_wav.setsampwidth(2)
    out_wav.setframerate(48000)
    out_wav.writeframesraw(data)

    return {'success': 'true'}

@app.route('/api/text2speech', methods=['POST'])
def get_audio_blob():    
    raw =  open("../filestore/me.wav", "rb")
    data = raw.read()

    params = "topic=general&" + "&folderId=" + config.FOLDER_ID +"&lang=ru-RU"
    headers = {'Authorization': 'Bearer ' + config.IAM_TOKEN}

    response = requests.post("https://stt.api.cloud.yandex.net/speech/v1/stt:recognize?" + params, data=data, headers=headers)


    print('response', response)
    # responseData = urllib.request.urlopen(url).read().decode('UTF-8')
    # decodedData = json.loads(responseData)

    

    return {'success': 'true'}

    

if __name__ == '__main__':
    # userbotClass.run()
    # threading.Thread(target=app.run, daemon=True).start()
    threading.Thread(target=app.run, daemon=True).start()
    idle()
    # app.run(debug=True)
    