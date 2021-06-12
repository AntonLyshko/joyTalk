from pyrogram import Client, filters
from pyrogram import filters
from pyrogram.handlers import MessageHandler

import config


API_ID = config.api_id
API_HASH = config.api_hash

class UserBot(Client):
    def __init__(self):
        print('Init')

        name = 'userbot'

        super().__init__(
            name,
            api_id=API_ID,
            api_hash=API_HASH,
            workdir="./",
        )
    async def start(self):
        await super().start()
        print("Userbot started. Hi.")
    async def stop(self):
        await super().stop()
        print("Userbot stopped. Bay.")
    async def restart(self):
        await self.stop()
        print("Userbot stopped. Here we go again.")
    async def send_msg(content):
        print(content)