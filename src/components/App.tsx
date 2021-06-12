import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from "antd";
import { firechat } from "@stores/implementation/firebase";
import { inject, observer } from "mobx-react";
import { default as IStores, IChatStore } from "@stores/interface";

import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import ReactAudioPlayer from "react-audio-player";

import { sendRecoding } from "@actions";

type TProps = {
  chatStore: IChatStore;
};

const App = inject((stores: IStores) => ({ chatStore: stores.chatStore }))(
  observer((props: TProps) => {
    const { chatStore } = props;
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState([]);
    const fireMessages = chatStore.messages ? chatStore.messages : [];

    useEffect(() => {
      firechat
        .messages("864260404")
        .limitToLast(5)
        .on("value", (snapshot: any) => {
          chatStore.updateMessages(snapshot.val());
        });
    }, []);

    const onChange = (content: any) => {
      setContent(content);
    };

    const onSend = async () => {
      let res = await axios.post("http://127.0.0.1:5000/api/dialog", { content });

      if (res.data.success) {
        setMessages([...messages, content]);
      }

      setContent("");
    };

    useEffect(() => {
      document.addEventListener("keypress", (event) => {
        const keyName = event.key;

        if (keyName === "l" && !chatStore.isListening) chatStore.setListening(true);
      });
      document.addEventListener("keyup", (event) => {
        const keyName = event.key;

        if (keyName === "l" && chatStore.isListening) chatStore.setListening(false);
      });
    }, []);

    const onStopRecording = async (audioData: any) => {
      sendRecoding(audioData);
    };

    // const blobToFile = async (theBlob: any, fileName: any) => {
    //   theBlob.lastModifiedDate = new Date();
    //   theBlob.name = fileName;
    //   return theBlob;
    // };

    // const onStopRecording = async (audioData: any) => {
    //   let file = await blobToFile(audioData, "my_speech.wav");
    //   file = new File(file, "my_speech.wav");
    //   console.log("file", file);
    //   sendRecoding(file);
    // };

    // const onStopRecording = async (audioData: any) => {
    //   const file = new File([audioData.blob], "my_speech.wav", { type: audioData.type });
    //   console.log("file", file);
    //   sendRecoding(file);
    // };

    return (
      <div className='main-container'>
        <div className='chat-container'>
          <div className='chat-history'>
            {fireMessages.length > 0 &&
              fireMessages.map((m: any, index: number) => {
                if (index < fireMessages.length - 1) {
                  return <div className='message'>{m.content}</div>;
                }
              })}
          </div>
          <div className='voice-container'>
            <div className='voice-animation'>
              {chatStore.voiceURL && <ReactAudioPlayer src={chatStore.voiceURL} autoPlay controls />}
            </div>
            <div className='last-message-text'>
              {fireMessages.length > 0 && <>{fireMessages[fireMessages.length - 1].content}</>}
            </div>

            <AudioReactRecorder
              state={chatStore.isListening ? RecordState.START : RecordState.STOP}
              onStop={onStopRecording}
            />
          </div>
        </div>
      </div>
    );
  })
);

export default App;
