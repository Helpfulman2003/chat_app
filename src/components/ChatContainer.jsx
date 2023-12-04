/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Message from "./Message";
import axios from "axios"
import { getAllMessage, sendMessage } from "../utils/APIRoutes";
import { updateMessage } from "../redux/messageSlice";


const ChatContainer = ({ currentChat, socket }) => {
  const user = useSelector((state) => state.user.user);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async() => {
      const res = await axios.post(getAllMessage, {
        from: user._id,
        to: currentChat._id
      })
      setMessages(res.data.projectMessage)
    }
    fetchData()
  }, [currentChat, user._id, dispatch])


  const handleSendMsg = async(msg) => {
    await axios.post(sendMessage, {
      from: user._id,
      to: currentChat._id,
      message: msg
    })
    socket.current.emit("send-msg", {
      from: user._id,
      to: currentChat._id,
      message: msg
    })
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({fromSelf: false, message: msg})
      })
    }
  }, [socket])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage])

  return (
    <div className="p-[1rem] h-full w-full flex-1">
      <div className="flex justify-between items-center py-[2rem]">
        <div className="flex items-center gap-[1rem]">
          <div>
            <img
              src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
              className="h-[3rem]"
            />
          </div>
          <div>
            <h3 className="text-white font-bold">{currentChat?.username}</h3>
          </div>
        </div>
        <Logout/>
      </div>
      <Message messages={messages}/>
      <ChatInput handleSendMsg={handleSendMsg}/>
    </div>
  );
};

export default ChatContainer;
