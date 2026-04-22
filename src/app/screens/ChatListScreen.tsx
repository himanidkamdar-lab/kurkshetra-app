import { motion } from "motion/react";
import { Search, ArrowLeft, MessageSquare } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import avatar1 from "../../imports/image-3.png";
import avatar2 from "../../imports/image-4.png";
import avatar3 from "../../imports/image-5.png";
import avatar4 from "../../imports/image-6.png";

interface ChatListScreenProps {
  onNavigate: (screen: string) => void;
  onOpenChat: (headId: string) => void;
}

export default function ChatListScreen({ onNavigate, onOpenChat }: ChatListScreenProps) {
  const chats = [
    {
      id: "head-cultural",
      name: "Priya Sharma",
      role: "Cultural HOD",
      avatar: avatar1,
      lastMessage: "Great work on the stage setup!",
      time: "2:30 PM",
      unread: 2,
      online: true,
      color: "#8B5CF6",
    },
    {
      id: "head-security",
      name: "Rajesh Kumar",
      role: "Security CC Head",
      avatar: avatar2,
      lastMessage: "Please check the gate assignments",
      time: "1:15 PM",
      unread: 0,
      online: true,
      color: "#10B981",
    },
    {
      id: "head-hospitality",
      name: "Ananya Verma",
      role: "Hospitality HOD",
      avatar: avatar3,
      lastMessage: "Menu review at 4 PM tomorrow",
      time: "Yesterday",
      unread: 0,
      online: false,
      color: "#F59E0B",
    },
    {
      id: "head-tech",
      name: "Vikram Singh",
      role: "IT & Tech HOD",
      avatar: avatar4,
      lastMessage: "WiFi configuration is complete",
      time: "Apr 13",
      unread: 0,
      online: false,
      color: "#EC4899",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="px-6 py-4 border-b border-black/5 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold flex-1" style={{ fontSize: "22px" }}>
            Messages
          </h1>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-[#F5F3F0] rounded-xl pl-12 pr-4 py-3 outline-none"
            style={{ fontSize: "16px" }}
          />
        </div>
      </div>

      {/* Info banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-6 my-4 p-4 bg-[#FE5A00]/5 rounded-2xl border border-[#FE5A00]/10"
      >
        <div className="flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-[#FE5A00] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-black font-medium" style={{ fontSize: "14px" }}>
              Direct messaging with your heads
            </p>
            <p className="text-[#6B6B6B] mt-1" style={{ fontSize: "13px" }}>
              Get quick responses and stay connected with your department leadership
            </p>
          </div>
        </div>
      </motion.div>

      {/* Chat list */}
      <motion.div variants={container} initial="hidden" animate="show">
        {chats.map((chat) => (
          <motion.button
            key={chat.id}
            variants={item}
            onClick={() => onOpenChat(chat.id)}
            className="w-full px-6 py-4 border-b border-black/5 hover:bg-[#F5F3F0]/50 transition-colors text-left"
          >
            <div className="flex items-start gap-4">
              {/* Left indicator for unread */}
              <div
                className={`w-1 h-full -ml-6 flex-shrink-0 ${
                  chat.unread > 0 ? "bg-[#FE5A00]" : ""
                }`}
              />

              {/* Avatar with online indicator */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden"
                  style={{ backgroundColor: `${chat.color}20` }}
                >
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-full h-full object-contain"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] rounded-full border-2 border-white" />
                )}
              </div>

              {/* Chat info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3
                      className={`font-semibold ${
                        chat.unread > 0 ? "text-black" : "text-black"
                      }`}
                      style={{ fontSize: "16px" }}
                    >
                      {chat.name}
                    </h3>
                    <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                      {chat.role}
                    </p>
                  </div>
                  <span className="text-[#6B6B6B] flex-shrink-0 ml-2" style={{ fontSize: "13px" }}>
                    {chat.time}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <p
                    className={`truncate ${
                      chat.unread > 0 ? "text-black font-medium" : "text-[#6B6B6B]"
                    }`}
                    style={{ fontSize: "14px" }}
                  >
                    {chat.lastMessage}
                  </p>

                  {/* Unread badge */}
                  {chat.unread > 0 && (
                    <div className="w-6 h-6 rounded-full bg-[#FE5A00] flex items-center justify-center flex-shrink-0 ml-2">
                      <span className="text-white font-semibold" style={{ fontSize: "11px" }}>
                        {chat.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Empty state for no more chats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-6 py-12 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F3F0] rounded-full flex items-center justify-center">
          <MessageSquare className="w-8 h-8 text-[#6B6B6B]" />
        </div>
        <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
          You're all caught up!
        </p>
      </motion.div>

      <BottomNav active="channels" onNavigate={onNavigate} />
    </div>
  );
}
