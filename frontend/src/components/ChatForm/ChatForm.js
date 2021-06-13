import React, { useState } from 'react'
import './ChatForm.scss';
import  { IconButton } from '@material-ui/core';
import SmileyIcon from '@material-ui/icons/EmojiEmotions';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import  MicIcon  from '@material-ui/icons/Mic';
import { postRequest } from "./../../utils/apiRequests";
import { ReactMic } from "react-mic";
import {
  BASE_URL,
  UPLOAD_AUDIO,
  UPLOAD_IMAGE_FILE,
} from "../../utils/apiEndpoints";


const ChatForm = ({sendMsg, sendTyping}) => {

  const [msg, setMsg] = useState("");
  const [record, setRecord] = useState(false);

  const handleChange = (e) => {
    setMsg(e.target.value);
    sendTyping({ value: e.target.value, type: "typing", theme: "text" });
  };

  const handleSend = (e) => {
    if (e.key === "Enter") {
      setMsg("");
      sendMsg({ value: e.target.value, type: "message", theme: "text" });
    }
  };

  const onFileChange = async (e) => {
    let filePath = await imageFileUpload(e.target.files[0]);
    sendMsg({ value: filePath, type: "file", theme: "image" });
  };

  const imageFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("imageMsg", file, file.name);
    const response = await postRequest(
      `${BASE_URL}${UPLOAD_IMAGE_FILE}`,
      formData
    );
    return response;
  };

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    // console.log(recordedBlob);
  };

  const onStop = async (recordedBlob) => {
    let filePath = await audioFileUpload(recordedBlob);
    sendMsg({ value: filePath, type: "file", theme: "audio" });
  };

  const audioFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("track", file.blob);

    const url = `${BASE_URL}${UPLOAD_AUDIO}`;
    let response = await postRequest(url, formData);
    return response;
  };


    return (
        <div className="chat-form">
             <div className="action-btn">
             <IconButton className="icon-block">
                <SmileyIcon />
             </IconButton>
             <div className="file-share">
              <input type="file" onChange={(e) => onFileChange(e)} />
                <IconButton className="icon-block">
                  <AttachFileIcon/>
                </IconButton>
           </div>
             </div>
             <input className="chat-input" placeholder="message" 
             value={msg} onChange={(e) => handleChange(e)}
             onKeyPress={(e) => {handleSend(e)}}
             />
     <ReactMic
        record={record}
        onStop={onStop}
        onData={onData}
        visualSetting="frequencyBars"
        className="sound-wave"
        strokeColor="#999"
        backgroundColor="#ffffff"
        echoCancellation="true"
        channelCount="2"
      />
      {record ? (
             <IconButton className="icon-block active"
             onClick={stopRecording}
             >
               <MicIcon/>
             </IconButton>
             ) : (
              <IconButton className="icon-block"
                onClick={startRecording}>
                <MicIcon/>
              </IconButton>
             )}
        </div>
    )
}

export default ChatForm
