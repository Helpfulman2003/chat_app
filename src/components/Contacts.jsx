/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../assets/logo.svg";

const Contacts = ({ contacts, changeChat }) => {
  const user = useSelector((state) => state.user.user);
  const [selected, setSelected] = useState(undefined);
  const changeCurrentChat = (index, contact) => {
    setSelected(index)
    changeChat(contact)
  };
  return (
    <div className="w-[25%]">
      
        <div
          className="overflow-hidden h-full bg-[#080420]"
          style={{ display: "grid", gridTemplateRows: "10% 75% 15%" }}
        >
          <div className="flex items-center justify-center gap-[1rem]">
            <img src={Logo} alt="" className="h-[2rem]" />
            <h3 className="text-white uppercase">HELPFULMAN</h3>
          </div>
          <div className="flex flex-col items-center overflow-auto gap-[0.8rem]">
            {contacts.map((contact, index) => {
              return (
                <div onClick={() => changeCurrentChat(index, contact)} className={`${selected === index ? "bg-[#9186f3]" : "bg-[#ffffff34]" } p-[0.4rem] flex gap-[1rem] items-center min-h-[5rem] w-[90%] cursor-pointer rounded-[0.2rem]`} key={index}>
                  <div>
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      className="h-[3rem]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* current user */}
          <div className="bg-[#0d0d30] flex justify-center items-center gap-[2rem]">
            <div>
              <img
                src={`data:image/svg+xml;base64,${user?.avatarImage}`}
                className="h-[4rem]"
              />
            </div>
            <div>
              <h2 className="text-white font-bold">{user?.username}</h2>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default Contacts;
