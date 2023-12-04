import React, { useEffect, useRef } from "react";

const Message = ({ messages }) => {
  const scrollRef = useRef();
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div
      className="h-[66%] w-[100%] overflow-y-auto flex flex-col gap-[1rem]"
      style={{ overflowWrap: "break-word" }}
    >
      {messages.map((msg, index) => {
        return (
          <div ref={scrollRef} key={index}>
            <div className={`flex items-center ${msg.fromSelf ? "justify-end" : "justify-start"}`}>
              <div className={`${msg.fromSelf ? "bg-[#4f04ff21]" : "#9900ff20"} max-w-[40%] p-[1rem] text-[16px] rounded-[1rem] text-[#d1d1d1]`}>
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
