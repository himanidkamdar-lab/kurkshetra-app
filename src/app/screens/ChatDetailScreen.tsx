import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Send } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import type { Contact, ChatMessage } from "../App";

interface ChatDetailScreenProps {
  onNavigate: (screen: string) => void;
  contactId: string;
  contacts: Contact[];
  messages: ChatMessage[];
  onSendMessage: (contactId: string, text: string) => void;
}

export default function ChatDetailScreen({ onNavigate, contactId, contacts, messages, onSendMessage }: ChatDetailScreenProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const contact = contacts.find((c) => c.id === contactId) ?? {
    id: contactId,
    name: "Unknown",
    role: "",
    avatarSrc: "",
    color: "#FE5A00",
    online: false,
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(contactId, input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col bg-[#F5F3F0]" style={{ minHeight: "100dvh" }}>
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-black/5 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("messages")}>
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden" style={{ backgroundColor: `${contact.color}20` }}>
                {contact.avatarSrc && (
                  <img src={contact.avatarSrc} alt={contact.name} className="w-full h-full object-contain" style={{ mixBlendMode: "multiply" }} />
                )}
              </div>
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold" style={{ fontSize: "16px" }}>{contact.name}</h3>
              <p style={{ fontSize: "12px", color: contact.online ? "#10B981" : "#6B6B6B" }}>
                {contact.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto pb-32">
        {messages.length === 0 && (
          <div className="text-center py-12 text-[#6B6B6B]" style={{ fontSize: "14px" }}>
            Say hi to {contact.name}!
          </div>
        )}
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index < 6 ? index * 0.04 : 0 }}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 shadow-sm ${
                msg.sender === "me"
                  ? "bg-[#FE5A00] text-white rounded-2xl rounded-tr-md"
                  : "bg-white text-black rounded-2xl rounded-tl-md"
              }`}
            >
              <p style={{ fontSize: "15px", lineHeight: "1.4" }}>{msg.text}</p>
              <p className={`mt-1 ${msg.sender === "me" ? "text-white/70" : "text-[#6B6B6B]"}`} style={{ fontSize: "11px" }}>
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-black/5 sticky bottom-16">
        <div className="flex items-end gap-3">
          <div className="flex-1 bg-[#F5F3F0] rounded-xl px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Type a message..."
              className="w-full bg-transparent outline-none"
              style={{ fontSize: "15px" }}
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              input.trim() ? "bg-[#FE5A00] text-white" : "bg-[#F5F3F0] text-[#6B6B6B]"
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <BottomNav active="channels" onNavigate={onNavigate} />
    </div>
  );
}
