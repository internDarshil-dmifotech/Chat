// Chatbot.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async (e) => {
  e.preventDefault();
  if (!userInput.trim()) return;

  const userMsg = { sender: 'user', text: userInput };
  setMessages(prev => [...prev, userMsg]);
  setUserInput('');

  try {
    const response = await axios.post('http://localhost:3000/chat/generate', { prompt: userInput });
    const botMsg = { sender: 'bot', text: response.data.response };
    setMessages(prev => [...prev, botMsg]);
  } catch (error) {
    console.error('Error:', error);
    setMessages(prev => [...prev, { sender: 'bot', text: 'Oops! Something went wrong.' }]);
  }
};


  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      {/* FAB Chat Button */}
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 cursor-pointer border-gray-200 p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        onClick={toggleChat}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px] shadow"
        >
          {/* Header */}
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight">Dhanamitra Infotech Chatbot</h2>
            <p className="text-sm text-[#6b7280] leading-3">Powered by Gemini</p>
          </div>

          {/* Messages */}
          <div className="pr-4 h-[474px] overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 my-4 text-sm flex-1 text-gray-600`}
              >
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                    <svg
                      stroke="none"
                      fill="black"
                      viewBox="0 0 24 24"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={
                        msg.sender === 'bot'
                          ? "M9.813 15.904L9 18.75l-.813-2.846..." // AI icon path (truncated for brevity)
                          : "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z..." // User icon path
                      } />
                    </svg>
                  </div>
                </span>
                <p className="leading-relaxed">
                  <span className="block font-bold text-gray-700">
                    {msg.sender === 'user' ? 'You' : 'AI'}
                  </span>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center pt-0">
            <form className="flex items-center justify-center w-full space-x-2" onSubmit={handleSend}>
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] text-[#030712]"
                placeholder="Type your message"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
