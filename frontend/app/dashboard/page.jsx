"use client";

import { useState, useRef, useEffect } from "react";
import ChatBubble from "@/components/ChatBubble";
import ImagePreview from "@/components/ImagePreview";

export default function DashboardPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sessionId = ""; 

  async function sendMessage() {
    if (!input && !image) return;

    // Add user message to chat UI
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        content: input || null,
        image: image ? URL.createObjectURL(image) : null,
      },
    ]);

    const formData = new FormData();
    formData.append("session_id", sessionId);
    if (input) formData.append("content", input);
    if (image) formData.append("image", image);

    setInput("");
    setImage(null);

    const res = await fetch("http://localhost:8000/api/chat/send-message/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // Append bot message
    setMessages((prev) => [...prev, data.bot]);
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      
      {/* HEADER */}
      <div className="p-4 bg-blue-600 text-white text-2xl font-semibold">
        AI Chat Dashboard
      </div>

      {/* CHAT HISTORY */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <ChatBubble
            key={i}
            sender={msg.sender}
            content={msg.content}
            image={msg.image}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      {/* INPUT BAR */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-3">
          
          {/* Image Upload */}
          <label className="cursor-pointer bg-gray-200 px-3 py-2 rounded-lg">
            📷 Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0] || null)}
            />
          </label>

          {/* Text Input */}
          <input
            className="flex-1 border rounded-lg px-3 py-2"
            placeholder="Type something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Send Button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>

        <ImagePreview file={image} onRemove={() => setImage(null)} />
      </div>
    </div>
  );
}
