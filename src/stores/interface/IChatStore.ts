export default interface IChatStore {
  isListening: boolean;
  voiceURL: JSX.Element;
  lastMessage: any;
  messages: any[];
  updateMessages: (data: any) => void;
}
