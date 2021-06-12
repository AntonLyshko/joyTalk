import fs from "fs";
import { action, observable } from "mobx";
import { IChatStore } from "@stores/interface";
// import { firechat } from "@stores/implementation/Firebase/firebase";
import { syntesize } from "@actions";

export class ChatStore implements IChatStore {
  @observable messages: any[] = [];
  @observable voiceURL: string = "";
  @observable isListening: boolean = false;

  constructor() {
    this.messages = [];
  }

  @action
  async updateMessages(data: any) {
    const formattedMessage: any = await this.formatMessages(data);
    this.messages = formattedMessage;

    let res = await syntesize(this.messages[this.messages.length - 1].content);
    if (res.success) {
      // TODO relative link
      const arrayBuffer = fs.readFileSync("C:/Users/Anton/Desktop/joy-talk/backend/filestore/speech.wav");
      const blob = new Blob([arrayBuffer], { type: "audio/wav" });
      this.voiceURL = window.URL.createObjectURL(blob);
    }
  }

  async formatMessages(data: any): Promise<any[]> {
    let formattedMessage: any = [];
    Object.keys(data).map((key: string) => {
      let item = data[key];

      let body = {
        content: item.content,
      };

      formattedMessage.push(body);
    });
    return formattedMessage;
  }

  @action
  setListening(value: boolean) {
    console.log(value ? "Слушаем" : "Не слушаем");
    this.isListening = value;
  }
}

export const chatStore = new ChatStore();
