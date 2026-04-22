import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Send, MoreVertical, Phone, Video } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface ChatDetailScreenProps {
  onNavigate: (screen: string) => void;
  headId: string;
}

export default function ChatDetailScreen({ onNavigate, headId }: ChatDetailScreenProps) {
  const [message, setMessage] = useState("");

  // Mock data - in real app would fetch based on headId
  const headInfo = {
    name: "Priya Sharma",
    role: "Cultural HOD",
    avatar: "👩‍💼",
    online: true,
    color: "#8B5CF6",
  };

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hey! How's the stage decoration coming along?",
      sender: "head",
      time: "2:15 PM",
      read: true,
    },
    {
      id: "2",
      text: "Hi! We've completed 70% of the work. The main stage backdrop is done!",
      sender: "me",
      time: "2:18 PM",
      read: true,
    },
    {
      id: "3",
      text: "That's great progress! Do you need any additional materials?",
      sender: "head",
      time: "2:20 PM",
      read: true,
    },
    {
      id: "4",
      text: "Yes, we might need some extra fairy lights for the side panels. Can we get those approved?",
      sender: "me",
      time: "2:25 PM",
      read: true,
    },
    {
      id: "5",
      text: "Absolutely! I'll approve the purchase request. Great work on the stage setup! 🎉",
      sender: "head",
      time: "2:30 PM",
      read: true,
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: "me",
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col pb-24">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-black/5 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("messages")}>
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Head info */}
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ backgroundColor: `${headInfo.color}20` }}
              >
                <span>{headInfo.avatar}</span>
              </div>
              {headInfo.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold" style={{ fontSize: "16px" }}>
                {headInfo.name}
              </h3>
              <p className="text-[#10B981]" style={{ fontSize: "12px" }}>
                {headInfo.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-[#F5F3F0] flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#6B6B6B]" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#F5F3F0] flex items-center justify-center">
              <Video className="w-5 h-5 text-[#6B6B6B]" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[#F5F3F0] flex items-center justify-center">
              <MoreVertical className="w-5 h-5 text-[#6B6B6B]" />
            </button>
          </div>
        </div>
      </div>

      {/* Date separator */}
      <div className="px-6 py-4 flex items-center justify-center">
        <div className="bg-white/80 px-4 py-1.5 rounded-full">
          <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
            Today
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 pb-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] ${
                msg.sender === "me"
                  ? "bg-[#FE5A00] text-white rounded-2xl rounded-tr-md"
                  : "bg-white text-black rounded-2xl rounded-tl-md"
              } px-4 py-3 shadow-sm`}
            >
              <p style={{ fontSize: "15px", lineHeight: "1.4" }}>{msg.text}</p>
              <p
                className={`mt-1 ${
                  msg.sender === "me" ? "text-white/70" : "text-[#6B6B6B]"
                }`}
                style={{ fontSize: "11px" }}
              >
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input area */}
      <div className="px-6 py-4 bg-white border-t border-black/5">
        <div className="flex items-end gap-3">
          <div className="flex-1 bg-[#F5F3F0] rounded-xl px-4 py-3 flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: "15px" }}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
              message.trim()
                ? "bg-[#FE5A00] text-white"
                : "bg-[#F5F3F0] text-[#6B6B6B]"
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Typing indicator (optional) */}
        {/* <div className="mt-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#6B6B6B] rounded-full animate-bounce" />
          <div className="w-1.5 h-1.5 bg-[#6B6B6B] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-1.5 h-1.5 bg-[#6B6B6B] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
          <p className="text-[#6B6B6B] ml-1" style={{ fontSize: "12px" }}>
            {headInfo.name} is typing...
          </p>
        </div> */}
      </div>

      {/* Bottom navigation */}
      <BottomNav active="channels" onNavigate={onNavigate} />
    </div>
  );
}