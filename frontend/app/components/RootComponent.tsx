"use client";

import { useState } from "react";
import { ChatCompletionMessage } from "../types/chat-completion-message-interface";
import createChatCompletion from "../lib/createChatCompletopn";

const RootComponent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

  const handleMessageSubmit = async () => {
    const updatedMessages = [...messages, { role: "user", content: message }];
    setMessages(updatedMessages);
    setMessage("");
    try {
      const response = (await createChatCompletion(updatedMessages)).choices[0]
        ?.message;
      setMessages([...updatedMessages, response]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Error: Unable to get response from server.",
        },
      ]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyChange = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (message.trim() === "") {
        return;
      }
      await handleMessageSubmit();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-10 container mx-auto">
      <div className="flex flex-col gap-3 h-[75%] overflow-y-scroll w-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role == "user" ? "chat chat-start" : "chat chat-end"}
          >
            <div className="chat-bubble">
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter your Message here"
        value={message}
        onChange={handleChange}
        className="input input-bordered w-full m-10"
        onKeyDown={handleKeyChange}
      />
    </div>
  );
};

export default RootComponent;
