import Image from "next/image";

export default function ChatBubble({ sender, content, image }) {
  const isUser = sender === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-xl ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {content && <p className="whitespace-pre-wrap">{content}</p>}

        {image && (
          <div className="mt-2">
            <Image
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