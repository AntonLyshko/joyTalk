export default interface IFirebase {
  db: any;
  messagesCollection: any;
  chatsCollection: any;
  usersCollection: any;
  storage: any;
  addMessage: (
    chatId: string,
    username: string,
    avatar: string,
    content: string,
    time: any,
    cuid: any,
    social_media: any,
    readed: boolean,
    buddies: any
  ) => void;
  uploadFile: (fileName: string, data: any) => any;
  messages: (uid: any) => any;
  chats: () => any;
  user: (uid: any) => any;
  addChat: (name: string) => void;
  addUser: (hero: any) => void;
  addArrayMessage: (data: any) => void;
}
