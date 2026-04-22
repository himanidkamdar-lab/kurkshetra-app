import { motion } from "motion/react";
import { Search, Plus, ArrowLeft, Megaphone } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

export default function ChannelsScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const channels = [
    {
      id: "all-hands",
      name: "All-Hands",
      icon: "📢",
      lastMessage: "Event starts in 2 days!",
      time: "10:30 AM",
      unread: 5,
      urgent: false,
      pinned: true,
      color: "#FE5A00",
    },
    {
      id: "security",
      name: "Security",
      icon: "🔒",
      lastMessage: "Gate 3 access updated",
      time: "9:45 AM",
      unread: 12,
      urgent: true,
      pinned: false,
      color: "#10B981",
    },
    {
      id: "cultural",
      name: "Cultural",
      icon: "🎭",
      lastMessage: "Stage setup complete",
      time: "Yesterday",
      unread: 0,
      urgent: false,
      pinned: false,
      color: "#8B5CF6",
    },
    {
      id: "admin",
      name: "Admin",
      icon: "📋",
      lastMessage: "Budget approval pending",
      time: "Yesterday",
      unread: 3,
      urgent: false,
      pinned: false,
      color: "#3B82F6",
    },
    {
      id: "it-tech",
      name: "IT & Tech",
      icon: "💻",
      lastMessage: "WiFi credentials shared",
      time: "Apr 10",
      unread: 0,
      urgent: false,
      pinned: false,
      color: "#EC4899",
    },
    {
      id: "hospitality",
      name: "Hospitality",
      icon: "🍽️",
      lastMessage: "Menu finalized",
      time: "Apr 9",
      unread: 0,
      urgent: false,
      pinned: false,
      color: "#F59E0B",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="px-6 py-4 border-b border-black/5">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold flex-1" style={{ fontSize: "22px" }}>
            Channels
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

      {/* Channel list */}
      <div>
        {channels.map((channel, index) => (
          <motion.button
            key={channel.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => {
              // Store channel ID and navigate
              const handleClick = (onNavigate as any);
              handleClick("channel-chat", undefined, channel.id);
            }}
            className={`w-full px-6 py-4 border-b border-black/5 hover:bg-[#F5F3F0] transition-colors text-left ${
              channel.urgent ? "bg-[#FEF2F2]" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Left indicator for unread */}
              <div className={`w-1 h-full -ml-6 flex-shrink-0 ${channel.unread > 0 ? "bg-[#FE5A00]" : ""}`} />

              {/* Channel icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl"
                style={{ backgroundColor: `${channel.color}20` }}
              >
                {channel.pinned ? (
                  <Megaphone className="w-6 h-6 text-[#FE5A00]" />
                ) : (
                  <span>{channel.icon}</span>
                )}
              </div>

              {/* Channel info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3
                    className={`font-semibold ${channel.unread > 0 ? "text-black" : "text-black"}`}
                    style={{ fontSize: "16px" }}
                  >
                    {channel.name}
                    {channel.pinned && (
                      <span className="ml-2 text-[#FE5A00]" style={{ fontSize: "13px" }}>
                        📌
                      </span>
                    )}
                  </h3>
                  <span className="text-[#6B6B6B] flex-shrink-0" style={{ fontSize: "13px" }}>
                    {channel.time}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p
                    className={`truncate ${
                      channel.unread > 0 ? "text-black font-medium" : "text-[#6B6B6B]"
                    }`}
                    style={{ fontSize: "13px" }}
                  >
                    {channel.urgent && (
                      <span className="text-[#EF4444] font-semibold mr-1">URGENT:</span>
                    )}
                    {channel.lastMessage}
                  </p>

                  {/* Unread badge */}
                  {channel.unread > 0 && (
                    <div className="w-6 h-6 rounded-full bg-[#FE5A00] flex items-center justify-center flex-shrink-0 ml-2">
                      <span className="text-white font-semibold" style={{ fontSize: "11px" }}>
                        {channel.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4, type: "spring", stiffness: 200 }}
        className="fixed bottom-28 right-6 w-14 h-14 bg-[#FE5A00] rounded-full flex items-center justify-center shadow-lg"
        style={{ boxShadow: "0px 4px 16px rgba(254, 90, 0, 0.3)" }}
      >
        <Plus className="w-6 h-6 text-white" />
      </motion.button>

      <BottomNav active="channels" onNavigate={onNavigate} />
    </div>
  );
}