import { useEffect, useRef } from "react";

import { IoMdSend } from "react-icons/io";
import { IoMdFlag } from "react-icons/io";
import { FaEquals } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";

function ChatWindow({ handleSendMessage, chatMessages, setChatMessages, roomCode }) {
  const inputRef = useRef();

  useEffect(() => {
    let chatDiv = document.getElementsByClassName("scrollbar")[0];

    chatDiv.scrollTop = chatDiv.scrollHeight;
  }, [chatMessages])

  const sendMessage = () => {
    if(inputRef.current.value !== ""){
      let chat = inputRef.current.value;

      const message = {
        type: "chat",
        roomCode: roomCode,
        chatMessage: chat,
      };
  
      setChatMessages((prevState) => {
        return [...prevState, { sender: "self", text: chat }];
      });
  
      handleSendMessage(message);
  
      inputRef.current.value = "";
    }
  };

  return (
    <div className="h-[45%] overflow-hidden px-4 py-1 flex flex-col justify-between">
      <div className="flex flex-col h-[85%] py-2 px-1 rounded-md bg-zinc-700">
        <div className="flex-1 px-1 overflow-y-scroll scrollbar">
          {chatMessages.map((message, index) => (
            <div key={index} className={`flex items-start gap-6 mb-4 ${message.sender === "self" ? "flex-row-reverse" : "flex-row"}`}>
              <div className="bg-zinc-600 w-auto p-1">
                <IoPerson className="h-8 w-8"/>
              </div>
              <div className={`p-2 mt-2.5 bg-[#8F8F8F] rounded-md relative tri-right ${message.sender == "self" ? "right-top" : "left-top"} `}>
                <span className="text-white">{message.text}</span>
              </div>
              <div className="w-auto p-1">
                <div className="h-8 w-8"/>
              </div>
            </div>
          ))}
        </div>
        <div className="h-auto relative">
          <input
            ref={inputRef}
            className="block w-full pl-2 pr-8 py-1 rounded-lg shadow-sm text-white bg-zinc-600 border border-zinc-900 placeholder-zinc-400 focus:ring-1 focus:ring-inset focus:ring-black-900"
            placeholder="Enter your message here..."
          />
          <div onClick={sendMessage} className="absolute right-1.5 top-2.5">
            <IoMdSend className="text-white hover:text-gray-700 hover:cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex pb-1.5 justify-between items-center text-white">
        <div className="group flex items-center gap-1">
          <FaEquals className="text-white h-5 w-5 group-hover:text-gray-400 group-hover:cursor-pointer" />
          <p className="group-hover:text-gray-400 group-hover:cursor-pointer">Draw</p>
        </div>
        <div className="group flex items-center gap-1">
          <IoMdFlag className="text-white h-5 w-5 group-hover:text-gray-400 group-hover:cursor-pointer" />
          <p className="group-hover:text-gray-400 group-hover:cursor-pointer">Resign</p>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
