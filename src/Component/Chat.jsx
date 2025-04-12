import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { toUserId } = useParams();
  const fromUser = useSelector((state) => state.user.value);
  const fromUserId = fromUser?._id;
  const fromUserName = fromUser?.firstName;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [personName,setPersonName] = useState("");

  useEffect( () => {
    if (!fromUser ) return;
    const fetchProfile = async () => {
        const res = await axios.get(BASE_URL+"/profile/"+toUserId,{withCredentials:true});
        if(!res) return;
        setPersonName(res.data.firstName );
        // console.log(personName);
    }
    
    const socket = createSocketConnection();
    // console.log(fromUserId,toUserId);
    socket.emit("joinChat", { fromUserId, toUserId, fromUserName });

    socket.on("receiveMessage", ({ fromUserName, photoUrl, newMessage }) => {
      //   console.log(fromUserName + " " + newMessage);
      const newObj = {
        name: fromUserName,
        photoUrl,
        message: newMessage,
      };
      setMessages((prevMessage) => [...prevMessage, newObj]);
      setToUserName(fromUserName);
    });
    fetchProfile();
    return () => {
      socket.disconnect();
    };
  }, [fromUserId, toUserId,personName]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      fromUserId,
      fromUserName,
      photoUrl: fromUser.photoUrl,
      toUserId,
      newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="sm:w-1/2 md:w-1/2 mx-auto m-5 h-[70vh] border border-gray-600 flex flex-col ">
      <h1 className="text-center border-b border-gray-600 p-5">{"Chat with: " + personName}</h1>

      <div className="flex-1 overflow-y-scroll p-5">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.name !== fromUserName && (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={msg.photoUrl}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.name}
                  {/* <time className="text-xs opacity-50">12:45</time> */}
                </div>
                <div className="chat-bubble">{msg.message}</div>
                {/* <div className="chat-footer opacity-50">Delivered</div> */}
              </div>
            )}
            {msg.name === fromUserName && (
              <div className="chat chat-end">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={msg.photoUrl}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.name}
                  {/* <time className="text-xs opacity-50">12:46</time> */}
                </div>
                <div className="chat-bubble">{msg.message}</div>
                {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-gray-600 p-5 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-500 rounded"
        ></input>
        <button onClick={handleSendMessage} className="btn btn-secondary">
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
