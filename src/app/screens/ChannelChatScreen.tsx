import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Send, MoreVertical } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface ChannelChatScreenProps {
  onNavigate: (screen: string) => void;
  channelId: string;
}

export default function ChannelChatScreen({ onNavigate, channelId }: ChannelChatScreenProps) {
  const [message, setMessage] = useState("");

  // Channel data
  const channelData: { [key: string]: any } = {
    "all-hands": {
      name: "All-Hands",
      icon: "📢",
      color: "#FE5A00",
      members: 450,
    },
    "security": {
      name: "Security",
      icon: "🔒",
      color: "#10B981",
      members: 45,
    },
    "cultural": {
      name: "Cultural",
      icon: "🎭",
      color: "#8B5CF6",
      members: 85,
    },
    "admin": {
      name: "Admin",
      icon: "📋",
      color: "#3B82F6",
      members: 12,
    },
    "it-tech": {
      name: "IT & Tech",
      icon: "💻",
      color: "#EC4899",
      members: 25,
    },
    "hospitality": {
      name: "Hospitality",
      icon: "🍽️",
      color: "#F59E0B",
      members: 38,
    },
  };

  const channel = channelData[channelId] || channelData["all-hands"];

  // Messages data
  const initialMessages: { [key: string]: any[] } = {
    "all-hands": [
      {
        id: "1",
        text: "Reminder: Festival starts in 2 days! Everyone please be ready.",
        sender: "Priya Sharma",
        role: "Cultural HOD",
        time: "10:30 AM",
        avatar: "PS",
        color: "#8B5CF6",
      },
      {
        id: "2",
        text: "All departments should submit their final reports by EOD today.",
        sender: "Arjun Joshi",
        role: "Admin HOD",
        time: "10:45 AM",
        avatar: "AJ",
        color: "#3B82F6",
      },
      {
        id: "3",
        text: "Got it! Security team is ready. All checkpoints are set up.",
        sender: "Rohan Mehta",
        role: "Security Member",
        time: "11:00 AM",
        avatar: "RM",
        color: "#FE5A00",
        isMe: true,
      },
    ],
    "security": [
      {
        id: "1",
        text: "URGENT: Gate 3 access has been updated. New codes sent via email.",
        sender: "Vikram Singh",
        role: "Security HOD",
        time: "9:45 AM",
        avatar: "VS",
        color: "#10B981",
      },
      {
        id: "2",
        text: "Acknowledged. Will update the team immediately.",
        sender: "Rohan Mehta",
        role: "Security Member",
        time: "9:50 AM",
        avatar: "RM",
        color: "#FE5A00",
        isMe: true,
      },
    ],
    "cultural": [
      {
        id: "1",
        text: "Stage setup is complete! The backdrop looks amazing 🎨",
        sender: "Priya Sharma",
        role: "Cultural HOD",
        time: "Yesterday",
        avatar: "PS",
        color: "#8B5CF6",
      },
    ],
    "admin": [
      {
        id: "1",
        text: "Budget approval is still pending. Please follow up with finance.",
        sender: "Arjun Joshi",
        role: "Admin HOD",
        time: "Yesterday",
        avatar: "AJ",
        color: "#3B82F6",
      },
    ],
    "it-tech": [
      {
        id: "1",
        text: "WiFi credentials have been shared with all team leads. Network: FLAME_FEST_2026",
        sender: "Rahul Kapoor",
        role: "IT HOD",
        time: "Apr 10",
        avatar: "RK",
        color: "#EC4899",
      },
    ],
    "hospitality": [
      {
        id: "1",
        text: "Final menu has been approved! Catering will start at 8 AM on event day.",
        sender: "Neha Gupta",
        role: "Hospitality HOD",
        time: "Apr 9",
        avatar: "NG",
        color: "#F59E0B",
      },
    ],
  };

  const [messages, setMessages] = useState(initialMessages[channelId] || []);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: "Rohan Mehta",
        role: "Security Member",
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        avatar: "RM",
        color: "#FE5A00",
        isMe: true,
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
          <button onClick={() => onNavigate("channels")}>
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Channel info */}
          <div className="flex items-center gap-3 flex-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ backgroundColor: `${channel.color}20` }}
            >
              <span>{channel.icon}</span>
            </div>
            <div>
              <h2 className="font-semibold" style={{ fontSize: "16px" }}>
                {channel.name}
              </h2>
              <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                {channel.members} members
              </p>
            </div>
          </div>

          <button>
            <MoreVertical className="w-6 h-6 text-[#6B6B6B]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.isMe ? "flex-row-reverse" : ""}`}>
              {/* Avatar */}
              {!msg.isMe && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 text-xs"
                  style={{ backgroundColor: msg.color }}
                >
                  {msg.avatar}
                </div>
              )}

              {/* Message bubble */}
              <div>
                {!msg.isMe && (
                  <div className="mb-1">
                    <span className="font-semibold" style={{ fontSize: "13px" }}>
                      {msg.sender}
                    </span>
                    <span className="text-[#6B6B6B] ml-2" style={{ fontSize: "11px" }}>
                      {msg.role}
                    </span>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.isMe
                      ? "bg-[#FE5A00] text-white"
                      : "bg-white border border-black/10"
                  }`}
                >
                  <p style={{ fontSize: "14px" }}>{msg.text}</p>
                </div>
                <p
                  className={`mt-1 text-[#6B6B6B] ${msg.isMe ? "text-right" : ""}`}
                  style={{ fontSize: "11px" }}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input area */}
      <div className="px-6 py-4 bg-white border-t border-black/5">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
            style={{ fontSize: "15px" }}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-12 h-12 bg-[#FE5A00] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <BottomNav active="channels" onNavigate={onNavigate} />
    </div>
  );
}
