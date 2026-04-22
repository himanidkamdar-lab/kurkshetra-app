import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, History, Package, Bell, HelpCircle, LogOut, FileText } from "lucide-react";
import avatar1 from "../../imports/image-3.png";
import avatar2 from "../../imports/image-4.png";
import avatar3 from "../../imports/image-5.png";
import avatar4 from "../../imports/image-6.png";
import avatar5 from "../../imports/image-7.png";
import avatar6 from "../../imports/image-8.png";
import avatar7 from "../../imports/image-9.png";
import avatar8 from "../../imports/image-10.png";
import avatar9 from "../../imports/image-11.png";

const AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

interface ProfileDropdownProps {
  onNavigate: (screen: string) => void;
  userName?: string;
  userInitials?: string;
  userRole?: string;
}

export function ProfileDropdown({ 
  onNavigate, 
  userName = "Rohan Mehta",
  userInitials = "RM",
  userRole = "Security • Member"
}: ProfileDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    const idx = localStorage.getItem("userAvatarIndex");
    if (idx !== null) {
      const i = parseInt(idx, 10);
      setUserAvatar(AVATARS[i] ?? null);
    }
  }, []);

  const menuItems = [
    { icon: User, label: "Profile & Settings", screen: "settings" },
    { icon: History, label: "Activity History", screen: "history" },
    { icon: FileText, label: "Request History", screen: "request-history" },
    { icon: Package, label: "Equipment Request", screen: "equipment-request" },
    { icon: Bell, label: "Notifications", screen: "notifications", badge: "3" },
    { icon: HelpCircle, label: "Help & Support", screen: "help" },
  ];

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center shadow-md hover:shadow-lg transition-all overflow-hidden"
        style={{ fontSize: "14px", background: userAvatar ? "white" : "linear-gradient(135deg, #FE5A00, #FF7A2F)", border: userAvatar ? "2px solid #FE5A00" : "none" }}
      >
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="w-full h-full object-contain p-0.5"
            style={{ mixBlendMode: "multiply" }}
          />
        ) : (
          userInitials
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden z-50"
          >
            {/* User Info Header */}
            <div className="p-5 border-b border-black/5 bg-gradient-to-br from-[#F5F3F0] to-white">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full text-white font-bold flex items-center justify-center overflow-hidden"
                  style={{ fontSize: "16px", background: userAvatar ? "white" : "linear-gradient(135deg, #FE5A00, #FF7A2F)", border: userAvatar ? "2px solid #FE5A00" : "none" }}
                >
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-full h-full object-contain p-1"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  ) : (
                    userInitials
                  )}
                </div>
                <div>
                  <p className="font-semibold" style={{ fontSize: "15px" }}>
                    {userName}
                  </p>
                  <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                    {userRole}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      onNavigate(item.screen);
                      setShowDropdown(false);
                    }}
                    className="w-full px-5 py-3 flex items-center gap-3 hover:bg-[#F5F3F0] transition-colors text-left"
                  >
                    <Icon className="w-5 h-5 text-[#6B6B6B]" />
                    <span className="flex-1" style={{ fontSize: "14px" }}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className="px-2 py-0.5 bg-[#FE5A00] text-white rounded-full font-semibold"
                        style={{ fontSize: "11px" }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Logout */}
            <div className="p-3 border-t border-black/5">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  // Handle logout
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-[#EF4444]/10 text-[#EF4444] font-semibold hover:bg-[#EF4444]/20 transition-colors flex items-center justify-center gap-2"
                style={{ fontSize: "14px" }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}