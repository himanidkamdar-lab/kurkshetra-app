import { motion } from "motion/react";
import {
  User,
  History,
  Package,
  Settings,
  Bell,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Users,
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface MoreMenuScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export default function MoreMenuScreen({ onNavigate, onLogout }: MoreMenuScreenProps) {
  const menuSections = [
    {
      title: "My Account",
      items: [
        {
          id: "settings",
          icon: User,
          label: "Profile & Settings",
          description: "Manage your personal information",
          color: "#FE5A00",
          screen: "settings",
        },
        {
          id: "history",
          icon: History,
          label: "Activity History",
          description: "View all your past activities",
          color: "#8B5CF6",
          screen: "history",
        },
      ],
    },
    {
      title: "Documents & Directory",
      items: [
        {
          id: "team-directory",
          icon: Users,
          label: "Team Directory",
          description: "Contact HODs, coordinators & members",
          color: "#6366F1",
          screen: "team-directory",
        },
        {
          id: "docs",
          icon: FileText,
          label: "Documentation",
          description: "View platform guides",
          color: "#EC4899",
        },
      ],
    },
    {
      title: "Requests",
      items: [
        {
          id: "equipment",
          icon: Package,
          label: "Equipment Request",
          description: "Request festival equipment",
          color: "#10B981",
          screen: "equipment-request",
        },
        {
          id: "request-history",
          icon: History,
          label: "Request History",
          description: "View all submitted requests",
          color: "#8B5CF6",
          screen: "request-history",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          id: "notifications",
          icon: Bell,
          label: "Notifications",
          description: "Manage notification settings",
          color: "#F59E0B",
          badge: "3",
          screen: "notifications",
        },
        {
          id: "help",
          icon: HelpCircle,
          label: "Help & Support",
          description: "Get help or contact support",
          color: "#3B82F6",
        },
      ],
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
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-black/5">
        <h1 className="font-semibold" style={{ fontSize: "22px" }}>
          More
        </h1>
      </div>

      {/* Profile Card */}
      <div className="px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#FE5A00] to-[#FE5A00]/80 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold border-2 border-white/30">
              RM
            </div>
            <div>
              <h2 className="font-semibold mb-1" style={{ fontSize: "20px" }}>
                Rohan Mehta
              </h2>
              <p className="opacity-90" style={{ fontSize: "14px" }}>
                Security Department • Member
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 bg-white/20 backdrop-blur rounded-xl p-3 text-center">
              <p className="font-bold" style={{ fontSize: "20px" }}>
                12
              </p>
              <p className="opacity-90" style={{ fontSize: "12px" }}>
                Tasks Done
              </p>
            </div>
            <div className="flex-1 bg-white/20 backdrop-blur rounded-xl p-3 text-center">
              <p className="font-bold" style={{ fontSize: "20px" }}>
                8
              </p>
              <p className="opacity-90" style={{ fontSize: "12px" }}>
                Requests
              </p>
            </div>
            <div className="flex-1 bg-white/20 backdrop-blur rounded-xl p-3 text-center">
              <p className="font-bold" style={{ fontSize: "20px" }}>
                2.5
              </p>
              <p className="opacity-90" style={{ fontSize: "12px" }}>
                Weeks Left
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Menu Sections */}
      <motion.div variants={container} initial="hidden" animate="show" className="px-6 space-y-6">
        {menuSections.map((section) => (
          <motion.div key={section.title} variants={item}>
            <h3 className="font-semibold mb-3 px-1 text-[#6B6B6B]" style={{ fontSize: "13px" }}>
              {section.title.toUpperCase()}
            </h3>

            <div className="bg-white rounded-2xl overflow-hidden">
              {section.items.map((menuItem, index) => {
                const Icon = menuItem.icon;
                return (
                  <button
                    key={menuItem.id}
                    onClick={() => menuItem.screen && onNavigate(menuItem.screen)}
                    className={`w-full flex items-center gap-4 p-4 hover:bg-[#F5F3F0]/50 transition-colors text-left ${
                      index !== section.items.length - 1 ? "border-b border-black/5" : ""
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${menuItem.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: menuItem.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold" style={{ fontSize: "16px" }}>
                          {menuItem.label}
                        </h4>
                        {menuItem.badge && (
                          <span
                            className="px-2 py-0.5 bg-[#FE5A00] text-white rounded-full font-semibold"
                            style={{ fontSize: "11px" }}
                          >
                            {menuItem.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                        {menuItem.description}
                      </p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-[#6B6B6B] flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          variants={item}
          onClick={onLogout}
          className="w-full bg-white text-[#EF4444] font-semibold rounded-2xl flex items-center justify-center gap-2 border border-[#EF4444]/20"
          style={{ fontSize: "16px", height: "56px" }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>

        {/* App Info */}
        <motion.div variants={item} className="text-center pb-6">
          <p className="text-[#6B6B6B] mb-1" style={{ fontSize: "12px" }}>
            Kurukshetra Platform
          </p>
          <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>
            Version 2.0.1 • FLAME University
          </p>
        </motion.div>
      </motion.div>

      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}