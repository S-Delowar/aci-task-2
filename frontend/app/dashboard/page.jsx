"use client";

import { useState, useRef, useEffect } from "react";
import Topbar from "../../components/dashboard/Topbar";
import ChatMessage from "../../components/dashboard/ChatMessage";
import ChatInput from "../../components/dashboard/ChatInput";
import { getChatHistory, sendChatMessage } from "../../lib/api";

export default function DashboardPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const scrollRef = useRef(null);

  // Auto-scroll when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Load full history on page load
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await getChatHistory();
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  console.log(messages)

  // Handle sending of message and update message display
  const handleSend = async (text, file) => {
    if (!text && !file) return;

    // Create optimistic message (shown instantly)
    const optimisticMessage = {
      id: Date.now(), // temporary ID
      role: "user",
      text,
      image: file ? URL.createObjectURL(file) : null,
      optimistic: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      setSending(true);
      const response = await sendChatMessage(text, file)
      console.log("Response: ", response)
      
      const realUser = response.data.user_message;
      const aiMessage = response.data.assistant_message;

      // Replace optimistic message with actual server message + AI message
      setMessages((prev) =>
        prev
          .map((msg) =>
            msg.id === optimisticMessage.id ? realUser : msg
          )
          .concat(aiMessage)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to send message.")
      // remove optimistic message
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== optimisticMessage.id)
      );
    } finally {
      setSending(false)
    }
  }


  return (
    <div>
      <Topbar/>

      <div className="container mx-auto md:px-4 lg:px-10">

      <main className="flex flex-col  bg-base-100">
        {/* Messages Container */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center pt-10">
              <div className="loading loading-dots text-primary"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-base-content opacity-60 pt-10">
              No messages yet. Start chatting!
            </div>
          ) : (
            messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                role={msg.role}
                text={msg.text}
                image={
                  msg.image
                    ? msg.image.startsWith("blob:")
                      ? msg.image // optimistic preview
                      : `http://localhost:8000${msg.image}`
                    : null
                }
              />
            ))
          )}
        </div>
      
        {/* Sending Indicator */}
        {sending && (
          <div className="p-2 text-center bg-base-200">
            <div className="text-sm opacity-70">Processing...</div>
          </div>
        )}

        {/* Chat Input */}
        <ChatInput onSend={handleSend} />
      </main>
      </div>
    </div>
  )
  }



  // =============================
// <div className="h-screen flex flex-col bg-white">
      
    //   {/* HEADER */}
    //   <div className="p-4 bg-blue-600 text-white text-2xl font-semibold">
    //     AI Chat Dashboard
    //   </div>

    //   {/* CHAT HISTORY */}
    //   <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
    //     {messages.map((msg, i) => (
    //       <ChatBubble
    //         key={i}
    //         role={msg.role}
    //         content={msg.content}
    //         image={msg.image}
    //       />
    //     ))}

    //     <div ref={bottomRef} />
    //   </div>

    //   {/* INPUT BAR */}
    //   <div className="p-4 border-t bg-white">
    //     <div className="flex items-center gap-3">
          
    //       {/* Image Upload */}
    //       <label className="cursor-pointer bg-gray-200 px-3 py-2 rounded-lg">
    //         📷 Upload Image
    //         <input
    //           type="file"
    //           hidden
    //           accept="image/*"
    //           onChange={(e) => setImage(e.target.files[0] || null)}
    //         />
    //       </label>

    //       {/* Text Input */}
    //       <input
    //         className="flex-1 border rounded-lg px-3 py-2"
    //         placeholder="Type something..."
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //       />

    //       {/* Send Button */}
    //       <button
    //         className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    //         onClick={sendMessage}
    //       >
    //         Send
    //       </button>
    //     </div>

    //     <ImagePreview file={image} onRemove={() => setImage(null)} />
    //   </div>
    // </div>