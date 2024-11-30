import React, { useState } from "react";

const ChatFeature = ({ messages, sendMessage, socketId }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  console.log(messages);
  const uniqueMessages = messages.filter((msg, index, self) =>
    index === self.findIndex((m) => JSON.stringify(m) === JSON.stringify(msg))
  );
  console.log(uniqueMessages);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleChat}
        className="flex items-center justify-center text-white bg-blue-600 rounded-full shadow-lg w-14 h-14 hover:bg-blue-700"
      >
        💬
      </button>

      {/* Chat Widget */}
      {isChatOpen && (
        <div className="absolute right-0 flex flex-col bg-white rounded-lg shadow-lg bottom-16 w-96 h-96">
          <div className="p-4 text-white bg-blue-600 rounded-t-lg">
            <h3 className="text-lg font-semibold">Chat</h3>
          </div>
          <div className="flex-grow p-4 overflow-y-auto border-t border-gray-200">
            {uniqueMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === socketId ? "text-left" : "text-right"}`}
              >
                <span
                  className={`inline-block p-2 rounded ${
                    msg.sender === socketId ? "bg-blue-200" : "bg-green-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 p-4 border-t">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatFeature;
