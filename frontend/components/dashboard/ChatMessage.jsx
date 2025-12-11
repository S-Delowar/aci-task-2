"use client";

import Image from "next/image";
import Cookies from "js-cookie"; 
import { useEffect, useState } from "react";
import AIAvatar from "../../public/images/ai_avatar.png"

export default function ChatMessage({role, text, image}) {
  const [username, setUsername] = useState("");

  // load username and email from cookies
  useEffect(() => {
    setUsername(Cookies.get("username"));
  }, []);

  const isUser = role === "user";

  console.log(image)

  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full flex items-center justify-center bg-primary text-white font-bold text-lg">
          {isUser ? (
            username ? username.slice(0, 2).toUpperCase() : "US"
          ) : (
            <Image src={AIAvatar} alt="assistant" width={40} height={40} />
          )}
        </div>
      </div>

      {/* Username */}
      <div className="chat-header">{isUser ? "You" : "CHIMERA AI"}</div>

      {/* Bubble */}
      <div
        className={`chat-bubble ${
          isUser ? "chat-bubble-primary" : "chat-bubble-info"
        }`}
      >
        {text && <p>{text}</p>}
        {image && (
          <div className="mt-2">
            <img
              src={image}
              alt="uploaded"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
