import { useState } from "react";
import ReactMarkdown from "react-markdown";
import api from "../services/api";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm **Abhi**, your Job Portal Assistant. 👋\n\nHow can I help you today?",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim() || loading) {
      return;
    }

    const userMessage = message.trim();

    // Add user message immediately
    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/api/chat", {
        message: userMessage,
      });

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: response.data.response,
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* =================================================
          FLOATING CHAT BUTTON
      ================================================== */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-blue-700"
          title="Chat with Abhi"
        >
          🤖
        </button>
      )}

      {/* =================================================
          CHAT WINDOW
      ================================================== */}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

          {/* =================================================
              HEADER
          ================================================== */}

         <div className="flex items-center justify-between bg-blue-950 px-5 py-4 text-white">

            <div className="flex items-center gap-3">

              {/* Bot Icon */}

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg">
                🤖
              </div>

              <div>
                <h2 className="font-bold">
                  Abhi
                </h2>

                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>

                  <p className="text-xs text-slate-300">
                    Job Portal Assistant
                  </p>
                </div>
              </div>

            </div>

            {/* Close Button */}

            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-slate-300 transition hover:bg-slate-800 hover:text-white"
              title="Close"
            >
              ×
            </button>

          </div>

          {/* =================================================
              CHAT MESSAGES
          ================================================== */}

          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">

            {messages.map((item, index) => (

              <div
                key={index}
                className={`flex ${
                  item.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {/* Bot Icon */}

                {item.sender === "bot" && (
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm">
                    🤖
                  </div>
                )}

                {/* Message Bubble */}

                <div
                  className={`max-w-[82%] px-4 py-3 text-sm leading-6 ${
                    item.sender === "user"
                      ? "rounded-2xl rounded-br-md bg-blue-600 text-white"
                      : "rounded-2xl rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm"
                  }`}
                >

                  {item.sender === "bot" ? (
                    <div className="prose prose-sm max-w-none prose-headings:mb-2 prose-headings:mt-3 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1">
                      <ReactMarkdown>
                        {item.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    item.text
                  )}

                </div>

              </div>

            ))}

            {/* =================================================
                LOADING INDICATOR
            ================================================== */}

            {loading && (
              <div className="flex items-center">

                <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm">
                  🤖
                </div>

                <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">

                  <div className="flex items-center gap-1">

                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></span>

                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: "0.15s" }}
                    ></span>

                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: "0.3s" }}
                    ></span>

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* =================================================
              INPUT AREA
          ================================================== */}

          <div className="border-t border-slate-200 bg-white p-3">

            <div className="flex items-end gap-2">

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Abhi something..."
                rows="1"
                className="max-h-24 min-h-[42px] flex-1 resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                title="Send message"
              >
                ➤
              </button>

            </div>

            <p className="mt-2 text-center text-[10px] text-slate-400">
              Abhi can help with jobs and Job Portal questions
            </p>

          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;