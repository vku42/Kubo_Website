"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles, Zap } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "@/lib/kubo-knowledge";

type Message = {
  role: "bot" | "user";
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hi! I'm Kubo's AI assistant. Ask me anything about your new desk companion — specs, ordering, shipping, you name it 😊",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming, streamingContent]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Stream failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;
        setStreamingContent(fullContent);
      }

      // Commit to messages
      setMessages(prev => [...prev, { role: "bot", content: fullContent }]);
      setStreamingContent("");
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [
        ...prev,
        { role: "bot", content: "Hmm, I had a little hiccup. Could you try again?" },
      ]);
      setStreamingContent("");
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  // All messages to render, plus the in-progress streaming bubble
  const allMessages = messages;

  return (
    <div className="fixed bottom-4 md:bottom-6 left-4 md:left-6 z-[9999] flex flex-col items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95, transformOrigin: "bottom left" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-[calc(100vw-2rem)] md:w-[420px] mb-4 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white/95 backdrop-blur-2xl border border-black/8 shadow-[0_40px_100px_rgba(0,0,0,0.15)] flex flex-col"
            style={{ height: "min(70vh, 620px)" }}
          >
            {/* Header */}
            <div className="px-6 py-5 bg-[#1d1d1f] flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight text-sm leading-none mb-1">
                    Ask Kubo AI
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                      Powered by Gemini
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3 scroll-smooth"
            >
              {allMessages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-[13px] font-medium leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#1d1d1f] text-white rounded-3xl rounded-tr-sm shadow-sm"
                        : "bg-[#f5f5f7] text-[#1d1d1f] rounded-3xl rounded-tl-sm border border-black/5"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {/* Streaming bubble */}
              {isStreaming && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-4 py-3 text-[13px] font-medium leading-relaxed bg-[#f5f5f7] text-[#1d1d1f] rounded-3xl rounded-tl-sm border border-black/5">
                    {streamingContent ? (
                      <>
                        {streamingContent}
                        <span className="inline-block w-1 h-3.5 bg-black/40 ml-0.5 animate-pulse rounded-sm" />
                      </>
                    ) : (
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce" />
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Suggested questions */}
            {messages.length <= 2 && !isStreaming && (
              <div className="px-5 pb-3 flex flex-wrap gap-2 flex-shrink-0">
                {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    disabled={isStreaming}
                    className="text-[10px] font-bold py-1.5 px-3.5 rounded-full bg-black/[0.04] border border-black/8 text-black/50 hover:bg-black/[0.08] hover:text-black/70 transition-all disabled:opacity-40"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 pt-0 flex-shrink-0">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={isStreaming ? "Kubo is thinking..." : "Ask anything about Kubo..."}
                  value={inputValue}
                  disabled={isStreaming}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-[#f5f5f7] border border-transparent focus:border-black/15 focus:bg-white px-5 py-3.5 rounded-full outline-none transition-all pr-12 text-sm font-medium disabled:opacity-60 placeholder:text-black/30"
                />
                <button
                  disabled={isStreaming || !inputValue.trim()}
                  onClick={() => handleSend(inputValue)}
                  aria-label="Send message"
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-[#1d1d1f] flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-colors duration-300 bg-[#1d1d1f]"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl font-black text-white tracking-tighter leading-none pb-1">k.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification pulse */}
        {!isOpen && (
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"
          />
        )}
      </motion.button>
    </div>
  );
}
