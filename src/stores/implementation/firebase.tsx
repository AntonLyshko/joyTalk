import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/analytics";
import "firebase/database";
import { IFirebase } from "@stores/interface";
import axios from "axios";

var firebaseConfig = {
  apiKey: "AIzaSyBtuYmpgFBEE7Oq769heCPlEqvXTCsC5B0",
  authDomain: "bothub-b5094.firebaseapp.com",
  databaseURL: "https://bothub-b5094-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bothub-b5094",
  storageBucket: "bothub-b5094.appspot.com",
  messagingSenderId: "894394042832",
  appId: "1:894394042832:web:0b7921f78ab28112d911d5",
};

class Firebase implements IFirebase {
  serverValue: any;
  db: any;
  storage: any;
  messagesCollection: any;
  chatsCollection: any;
  usersCollection: any;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    } else {
      firebase.app();
    }
    this.db = firebase.database();
    this.storage = firebase.storage().ref();
  }

  getPrevMessages = async (chatId: any, TopMessageTime: any, limit: any) => {
    let { data } = await axios.get(
      `${firebaseConfig.databaseURL}/messages/${chatId}.json?orderBy="time"&endAt=${TopMessageTime}&limitToLast=${limit}`
    );
    return data;
  };

  getUnreadMessages = async (chatId: any, TopMessageTime: any, limit: any) => {
    let { data } = await axios.get(
      `${firebaseConfig.databaseURL}/messages/${chatId}.json?orderBy="time"&endAt=${TopMessageTime}&limitToLast=${limit}`
    );
    return data;
  };

  getPrevContact = async (chatId: any, TopMessageTime: any, limit: any) => {
    let { data } = await axios.get(
      `${firebaseConfig.databaseURL}/contacts/${chatId}.json?orderBy="time"&endAt=${TopMessageTime}&limitToLast=${limit}`
    );
    return data;
  };

  editMessage = (chatId: string, messageId: string, key: string, value: any) => {
    let message = this.db.ref("messages/" + chatId + "/" + messageId);
    message.update({
      [key]: value,
    });
  };

  editChat = (chatId: string, key: string, value: any) => {
    let chat = this.db.ref("chats/" + chatId);
    chat.update({
      [key]: value,
    });
  };

  editMessagesCascade = (chatId: string, array: any) => {
    let messagesList = this.db.ref("messages/" + chatId);
    messagesList.update({ ...array });
  };

  //Add
  addMessage = (
    chatId: string,
    username: string,
    avatar: string,
    content: string,
    time: any,
    cuid: any,
    social_media: any,
    readed: boolean,
    buddies: any
  ) => {
    const msgList = this.db.ref("messages/" + chatId);
    const newMsg = msgList.push();
    newMsg.set({ avatar, username, content, time, cuid, social_media, readed });
    const chatItem = this.db.ref("chats/" + chatId);
    chatItem.update({
      users: buddies,
      last_message: {
        avatar,
        username,
        content,
        time,
        cuid,
        social_media,
        readed: true,
      },
    });
  };

  //Add
  addArrayMessage = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      const { chatId, username, avatar, content, time, cuid, social_media, readed, buddies } = data[i];
      this.addMessage(chatId, username, avatar, content, time, cuid, social_media, readed, buddies);
    }
  };

  addChat = ({ users }: any) => {
    var chatList = this.db.ref("chats");
    var newChat = chatList.push();
    newChat.set({ users });
  };

  addContact = ({ avatar, name, id, last_message }: any) => {
    let newContact = this.db.ref("contacts/" + id);
    newContact.set({
      avatar,
      id,
      last_message,
      name,
      online: true,
    });
  };

  addUser = ({ id, username, avatar }: any) => {
    var userList = this.db.ref("users/" + id);
    var newUser = userList.push();
    newUser.set({ username, avatar });
  };

  uploadFile = async (fileName: any, data: any) => {
    var imageRef = this.storage.child(fileName);
    var uploadTask = imageRef.putString(data, "data_url");

    await uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      (error: any) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User unauthorized");
            break;
          case "storage/canceled":
            console.log("User canceled upload");
            break;
          case "storage/unknown":
            console.log("unknown error");
            break;
        }
      }
    );

    return await uploadTask.snapshot.ref.getDownloadURL();
  };

  //Get
  chats = () => this.db.ref(`chats`);
  user = (uid: any) => this.db.ref(`users/${uid}`);
  messages = (uid: any) => this.db.ref(`messages/${uid}`);
  contacts = () => this.db.ref(`contacts`);

  lastConnection = (id: any) => this.db.ref(`contacts/${id}/online`);
}

export const firechat = new Firebase();
