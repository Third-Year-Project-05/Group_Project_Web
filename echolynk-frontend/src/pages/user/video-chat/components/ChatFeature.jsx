import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatFeature = ({ messages, sendMessage, socketId, clearChat }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef(null);

  const uniqueMessages = messages.filter(
    (msg, index, self) =>
      index === self.findIndex((m) => JSON.stringify(m) === JSON.stringify(msg))
  );

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [uniqueMessages]);

  return (
    <div className="fixed bottom-20 right-4 md:bottom-3">
      <button
        onClick={toggleChat}
        className="flex items-center justify-center text-white bg-blue-600 rounded-full shadow-lg w-14 h-14 hover:bg-blue-700 dark:bg-gray-800"
      >
        💬
      </button>

      {/* Chat Widget */}
      {isChatOpen && (
        <div className="absolute right-0 flex flex-col rounded-lg shadow-lg bg-gray-700 bottom-16 w-96 h-[40rem]">
          <div className="flex justify-between p-4 text-white bg-gray-800 rounded-t-lg">
            <h3 className="text-lg font-semibold">Meeting Chat</h3>
            <button className="text-md" onClick={clearChat}>
              clear
            </button>
          </div>
          {uniqueMessages.length > 0 ? (
            <div
              ref={chatContainerRef}
              className="flex-grow p-4 overflow-y-auto border-t border-gray-200"
            >
              {uniqueMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.sender === socketId ? "text-left" : "text-right"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded text-white ${
                      msg.sender === socketId ? "bg-blue-600" : "bg-green-600"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-grow p-4 overflow-y-auto text-white border-t border-gray-200">
             📨 No Messages yet !📮
            </div>
          )}

          {/* Input Area */}
          <div className="flex items-center gap-2 p-4 border-t">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <FaPaperPlane className="w-5 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatFeature;
