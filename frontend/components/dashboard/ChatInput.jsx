"use client";
import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const submit = () => {
    if (!text && !file) return;
    onSend(text, file);
    setText("");
    setFile(null);
  };

  return (
    <div className="flex items-center gap-3 p-3 border-t bg-base-200">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="file-input file-input-bordered"
      />

      <input
        type="text"
        placeholder="Type your message..."
        className="input input-bordered w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn btn-primary" onClick={submit}>
        Send
      </button>
    </div>
  );
}
