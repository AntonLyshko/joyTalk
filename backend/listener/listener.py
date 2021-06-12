import userbot
from userbot import UserBot
from pyrogram import filters
import asyncio
import json
from pyrogram import Client, filters, idle
from pyrogram import filters
from pyrogram.handlers import MessageHandler
import config
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("./bothub-b5094-firebase-adminsdk-m9boo-b100b3799b.json")
firebase_admin.initialize_app(cred, {
    'databaseURL':'https://bothub-b5094-default-rtdb.europe-west1.firebasedatabase.app/'
})

userbotClass = UserBot()

@userbotClass.on_message(filters.chat("me"))
def echo(client, message):
    ref = db.reference('/messages/' + str(message.chat.id))
    ref.push().set({"content": message.text})

if __name__ == '__main__':
     userbotClass.run()

    