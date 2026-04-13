"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";

type Message = {
  role: "bot" | "user";
  content: string;
  isSuggestion?: boolean;
};

const KNOWLEDGE_BASE = [
  {
    keywords: ["price", "cost", "how much", "buy", "order"],
    answer: "Kubo Bot is currently available for pre-order at a special price of ₹2,999 for Batch 01. You can secure yours on our 'Buy' page!"
  },
  {
    keywords: ["spec", "technical", "hardware", "processor", "battery", "size"],
    answer: "Kubo is a 50x50mm cube powered by a Xiao ESP32 C3 processor. It features a 1.3\" OLED display, a 500mAh battery (5hrs active), and is built from premium PLA+ material."
  },
  {
    keywords: ["ship", "delivery", "when", "arrive"],
    answer: "Batch 01 pre-orders are expected to begin shipping in late Q3 2026. We'll keep you updated every step of the way!"
  },
  {
    keywords: ["privacy", "offline", "data", "secure"],
    answer: "Kubo is 100% private. All emotional processing and AI models run locally on the device. Your data never leaves your desk."
  },
  {
    keywords: ["what is", "kubo", "who are you"],
    answer: "I'm Kubo, your emotional AI desktop companion! I'm here to keep you focused, keep you company, and make your workspace feel alive."
  }
];

const SUGGESTIONS = [
  "What are the specs?",
  "How much does it cost?",
  "Is it private?",
  "When will it ship?"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi there! I'm Kubo's digital twin. How can I help you today? *blink*" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();
      
      if (data.content) {
        setMessages(prev => [...prev, { role: "bot", content: data.content }]);
      } else {
        setMessages(prev => [...prev, { role: "bot", content: "I'm having a little trouble thinking. *wince* Can we try that again?" }]);
      }
    } catch (error) {
       console.error("Chat Error:", error);
       setMessages(prev => [...prev, { role: "bot", content: "My connection seems lost! *sad bleep* Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[90vw] md:w-[400px] h-[600px] mb-4 overflow-hidden rounded-[2.5rem] glass-panel border border-white/40 shadow-[0_32px_80px_rgba(0,0,0,0.1)] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-white/50 backdrop-blur-xl border-b border-black/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amberMain flex items-center justify-center shadow-lg shadow-amberMain/20">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1d1d1f] tracking-tight text-base">Kubo Support</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">AI Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4 text-[#1d1d1f]" />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 scroll-smooth"
            >
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] font-medium leading-relaxed ${
                    m.role === "user" 
                      ? "bg-[#1d1d1f] text-white rounded-tr-none shadow-lg shadow-black/5" 
                      : "bg-[#f5f5f7] text-[#1d1d1f] rounded-tl-none border border-black/5"
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#f5f5f7] p-4 rounded-3xl rounded-tl-none border border-black/5 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggestions */}
            <div className="px-6 pb-4 flex flex-wrap gap-2">
               {SUGGESTIONS.map((s, i) => (
                 <button
                   key={i}
                   disabled={isTyping}
                   onClick={() => handleSend(s)}
                   className="text-[10px] font-bold py-2 px-4 rounded-full border border-amberMain/30 text-amberMain bg-amberMain/5 hover:bg-amberMain/10 transition-all disabled:opacity-50"
                 >
                   {s}
                 </button>
               ))}
            </div>

            {/* Input */}
            <div className="p-6 pt-0">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  autoFocus
                  placeholder={isTyping ? "Kubo is thinking..." : "Ready to chat..."}
                  value={inputValue}
                  disabled={isTyping}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend(inputValue)}
                  className="w-full bg-[#f5f5f7] border border-transparent focus:border-amberMain/50 focus:bg-white px-6 py-4 rounded-full outline-none transition-all pr-12 text-sm font-medium disabled:opacity-70"
                />
                <button 
                  disabled={isTyping || !inputValue.trim()}
                  onClick={() => handleSend(inputValue)}
                  className="absolute right-2 w-10 h-10 rounded-full bg-[#1d1d1f] flex items-center justify-center hover:scale-105 active:scale-95 transition-all group disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_16px_40px_rgba(0,0,0,0.15)] transition-all duration-500 ${
          isOpen ? "bg-white rotate-90" : "bg-[#1d1d1f]"
        }`}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-[#1d1d1f]" />
        ) : (
          <div className="relative">
            <Bot className="w-8 h-8 text-white" />
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute -top-1 -right-1 w-3 h-3 bg-amberMain rounded-full"
            />
          </div>
        )}
      </motion.button>
    </div>
  );
}
