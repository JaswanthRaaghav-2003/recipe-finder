// src/components/ChatbotPanel.jsx
import React, { useState } from "react";
import { Send } from "lucide-react";
import { getChatbotResponse } from "../logic/ailogic";

const ChatbotPanel = ({ context }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const aiReply = await getChatbotResponse(input, context);
    setMessages((prev) => [...prev, { sender: "bot", text: aiReply }]);
    setInput("");
  };

  return (
    <>
      {/* Button for mobile screens */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-amber-500 text-white p-4 rounded-full shadow-lg md:hidden"
      >
        💬
      </button>

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/3 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center p-4 bg-amber-600 text-white font-semibold">
          <h2>👨‍🍳 Chat with Chef</h2>
          <button onClick={() => setOpen(false)} className="md:hidden">
            ✖️
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-64px)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl ${
                  m.sender === "user"
                    ? "bg-amber-100 self-end text-right"
                    : "bg-gray-100 self-start"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex p-3 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI Chef..."
              className="flex-1 border rounded-lg p-2 outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotPanel;
