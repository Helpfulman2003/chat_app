import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {allUserRoute, host} from "../utils/APIRoutes"
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import io from "socket.io-client";

const Chat = () => {
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const socket = useRef()

  useEffect(() =>{
    socket.current = io.connect(host)
    socket.current.emit("add-user", user._id)
  }, [])

  useEffect(() => {
    if (!user._id) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const {data} = await axios.get(`${allUserRoute}/${user._id}`)
          setContacts(data.data)
        } catch (error) {
          console.error(error);
        }
      };
      fetchData()
    }
  }, [user]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 bg-[#131324]">
      <div className="h-[85%] w-[85%] m-auto bg-[#00000076] text-white flex">
        <Contacts contacts={contacts} changeChat={setCurrentChat}/>
          {
            currentChat ? <ChatContainer currentChat={currentChat} socket={socket}/> : <Welcome/> 
          }
      </div>
    </div>
  );
};

export default Chat;
