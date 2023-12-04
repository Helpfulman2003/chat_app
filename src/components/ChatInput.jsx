import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setMsg(msg + event.emoji);
  };

  const sendChat = () => {
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className=" w-full h-[10%] flex items-center justify-between">
      <div className="flex items-center text-white gap-[1rem]">
        <div className="px-2 relative">
          <MdEmojiEmotions
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="cursor-pointer"
            size={"1.5rem"}
            color="#ffff00c8"
          />
          {showEmojiPicker && (
            <div className="absolute bottom-[100%] left-0">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </div>
      <div className="w-full rounded-[2rem] flex items-center justify-center gap-[2rem] overflow-hidden bg-[#ffffff34] mr-2">
        <input
          type="text"
          className="w-[90%] h-5 bg-transparent border-none pl-[1rem] text-[16px] focus:outline-none"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          onClick={sendChat}
          className="px-4 py-2 flex justify-center items-center bg-[#9a86f3]"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
