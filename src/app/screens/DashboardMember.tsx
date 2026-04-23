import { motion, AnimatePresence } from "motion/react";
import { Bell, ChevronRight, MessageSquare, Menu, X, Home, Users, Calendar, Settings } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useState, useEffect, useRef } from "react";
import { Illustration, IllustrationTypes } from "../components/Illustration";

export default function DashboardMember({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, minutes: 34, seconds: 56 });
  const menuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigationItems = [
    { icon: Home, label: "Dashboard", screen: "dashboard" },
    { icon: MessageSquare, label: "Messages", screen: "messages" },
    { icon: Users, label: "Team Directory", screen: "team-directory" },
    { icon: Calendar, label: "Schedule", screen: "schedule" },
    { icon: Settings, label: "More", screen: "more" },
  ];

  const notifications = [
    { id: 1, title: "New task assigned", time: "5m ago", unread: true },
    { id: 2, title: "Schedule updated", time: "1h ago", unread: true },
    { id: 3, title: "Meeting reminder", time: "2h ago", unread: true },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24 overflow-y-auto">
      {/* Top bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 border-b border-black/5">
        {/* Left: Hamburger Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-10 h-10 rounded-full bg-[#F5F3F0] flex items-center justify-center text-black hover:bg-[#FE5A00] hover:text-white transition-colors"
          >
            {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Hamburger Menu Dropdown */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden z-50"
              >
                {/* Navigation Menu Items */}
                <div className="py-2">
                  {navigationItems.map((navItem, index) => {
                    const Icon = navItem.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          onNavigate(navItem.screen);
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F5F3F0] transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#FE5A00]/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#FE5A00]" />
                        </div>
                        <p className="font-semibold" style={{ fontSize: "15px" }}>
                          {navItem.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Greeting */}
        <h2 className="font-semibold" style={{ fontSize: "16px" }}>
          Good morning, Rohan 👋
        </h2>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-full bg-[#F5F3F0] flex items-center justify-center relative hover:bg-[#FE5A00]/10 transition-colors"
            >
              <Bell className="w-5 h-5 text-[#6B6B6B]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FE5A00] rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-[9px] font-semibold">3</span>
              </div>
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-black/5">
                    <h3 className="font-semibold" style={{ fontSize: "16px" }}>
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => {
                          onNavigate("notifications");
                          setShowNotifications(false);
                        }}
                        className="w-full flex items-start gap-3 p-4 hover:bg-[#F5F3F0] transition-colors border-b border-black/5 last:border-0"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.unread ? "bg-[#FE5A00]" : "bg-transparent"}`} />
                        <div className="flex-1 text-left">
                          <p className="font-semibold" style={{ fontSize: "14px" }}>
                            {notif.title}
                          </p>
                          <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                            {notif.time}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      onNavigate("notifications");
                      setShowNotifications(false);
                    }}
                    className="w-full p-3 text-[#FE5A00] font-semibold border-t border-black/5 hover:bg-[#F5F3F0]"
                    style={{ fontSize: "14px" }}
                  >
                    View All Notifications
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-10 h-10 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-semibold"
            >
              RM
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden z-50"
                >
                  {/* Profile Header */}
                  <div className="bg-gradient-to-br from-[#FE5A00] to-[#FF7A2F] p-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-lg font-bold border-2 border-white/30">
                        RM
                      </div>
                      <div>
                        <p className="font-semibold" style={{ fontSize: "14px" }}>
                          Rohan Mehta
                        </p>
                        <p className="opacity-90" style={{ fontSize: "12px" }}>
                          Security · Member
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        onNavigate("settings");
                        setShowProfile(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F5F3F0] transition-colors"
                    >
                      <Settings className="w-5 h-5 text-[#6B6B6B]" />
                      <p className="font-semibold" style={{ fontSize: "14px" }}>
                        Settings & Profile
                      </p>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-4 pt-5 pb-8 space-y-4"
      >
        {/* Festival Countdown - Minimalist & Clean */}
        <motion.div
          variants={item}
          className="bg-white rounded-2xl px-8 py-6"
        >
          <div className="text-center mb-4">
            <p className="text-[#6B6B6B] font-semibold tracking-wide mb-1" style={{ fontSize: "11px" }}>
              KURUKSHETRA 2026
            </p>
            <h2 className="font-bold" style={{ fontSize: "20px" }}>
              Festival Begins In
            </h2>
          </div>

          {/* Clean Timer */}
          <div className="flex items-center justify-center gap-2">
            {/* Hours */}
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ opacity: [1, 0.9, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-[#FE5A00]/10 rounded-2xl px-3 py-4 shadow-md border border-[#FE5A00]/20"
              >
                <div className="font-bold tabular-nums" style={{ fontSize: "32px", lineHeight: "1" }}>
                  {String(timeLeft.hours).padStart(2, '0')[0]}
                </div>
              </motion.div>
              <motion.div
                animate={{ opacity: [1, 0.9, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                className="bg-[#FE5A00]/10 rounded-2xl px-3 py-4 shadow-md border border-[#FE5A00]/20"
              >
                <div className="font-bold tabular-nums" style={{ fontSize: "32px", lineHeight: "1" }}>
                  {String(timeLeft.hours).padStart(2, '0')[1]}
                </div>
              </motion.div>
            </div>

            <span className="font-bold text-[#6B6B6B] mb-2" style={{ fontSize: "24px" }}>:</span>

            {/* Minutes */}
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ opacity: [1, 0.9, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="bg-[#FE5A00]/10 rounded-2xl px-3 py-4 shadow-md border border-[#FE5A00]/20"
              >
                <div className="font-bold tabular-nums" style={{ fontSize: "32px", lineHeight: "1" }}>
                  {String(timeLeft.minutes).padStart(2, '0')[0]}
                </div>
              </motion.div>
              <motion.div
                animate={{ opacity: [1, 0.9, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="bg-[#FE5A00]/10 rounded-2xl px-3 py-4 shadow-md border border-[#FE5A00]/20"
              >
                <div className="font-bold tabular-nums" style={{ fontSize: "32px", lineHeight: "1" }}>
                  {String(timeLeft.minutes).padStart(2, '0')[1]}
                </div>
              </motion.div>
            </div>

            <span className="font-bold text-[#6B6B6B] mb-2" style={{ fontSize: "24px" }}>:</span>

            {/* Seconds */}
            <div className="flex items-center gap-1">
              <motion.div
                animate={{ opacity: [1, 0.9, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className="bg-[#FE5A00]/10 rounded-2xl px-3 py-4 shadow-md border border-[#FE5A00]/20"
              >
                <div className="font-bold tabular-nums" style={{ fontSize: "32px", lineHeight: "1" }}>
                  {String(timeLeft.seconds).padStart(2, '0')[0]}
                </div>
              </motion.div>
              <motion.div
                animate={{ opacity: [1, 0.9, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="bg-[#FE5A00]/10 rounded-2xl px-3 py-4 shadow-md border border-[#FE5A00]/20"
              >
                <div className="font-bold tabular-nums" style={{ fontSize: "32px", lineHeight: "1" }}>
                  {String(timeLeft.seconds).padStart(2, '0')[1]}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-3">
            <span className="text-[#6B6B6B] font-semibold tracking-wider" style={{ fontSize: "11px" }}>HOURS</span>
            <span className="text-[#6B6B6B] font-semibold tracking-wider" style={{ fontSize: "11px" }}>MINUTES</span>
            <span className="text-[#6B6B6B] font-semibold tracking-wider" style={{ fontSize: "11px" }}>SECONDS</span>
          </div>
        </motion.div>

        {/* Two Column Grid - My Tasks and Messages */}
        <div className="grid grid-cols-2 gap-3">
          {/* My Tasks Card */}
          <motion.div variants={item} className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold" style={{ fontSize: "15px" }}>
                My Tasks
              </h3>
              <button
                onClick={() => onNavigate("tasks")}
                className="text-[#FE5A00] font-semibold hover:underline"
                style={{ fontSize: "12px" }}
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              <div className="border-l-4 border-[#3B82F6] bg-[#3B82F6]/5 rounded-lg p-2.5">
                <span className="px-2 py-0.5 bg-[#3B82F6] text-white rounded-md text-xs font-semibold">
                  In Progress
                </span>
                <p className="font-semibold mt-2" style={{ fontSize: "13px" }}>
                  Update security roster
                </p>
                <p className="text-[#6B6B6B] mt-0.5" style={{ fontSize: "11px" }}>
                  Due: Apr 16, 5:00 PM
                </p>
              </div>

              <div className="border-l-4 border-[#F59E0B] bg-[#F59E0B]/5 rounded-lg p-2.5">
                <span className="px-2 py-0.5 bg-[#F59E0B] text-white rounded-md text-xs font-semibold">
                  Pending
                </span>
                <p className="font-semibold mt-2" style={{ fontSize: "13px" }}>
                  Equipment check
                </p>
                <p className="text-[#6B6B6B] mt-0.5" style={{ fontSize: "11px" }}>
                  Due: Apr 17, 2:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Messages Card */}
          <motion.div variants={item} className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold" style={{ fontSize: "15px" }}>
                Messages
              </h3>
              <button
                onClick={() => onNavigate("messages")}
                className="text-[#FE5A00] font-semibold hover:underline"
                style={{ fontSize: "12px" }}
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-[#F5F3F0] transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                  AJ
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate" style={{ fontSize: "13px" }}>
                    Arjun Joshi
                  </p>
                  <p className="text-[#6B6B6B] truncate" style={{ fontSize: "11px" }}>
                    Updated the task list
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-[#F5F3F0] transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                  PS
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate" style={{ fontSize: "13px" }}>
                    Priya Sharma
                  </p>
                  <p className="text-[#6B6B6B] truncate" style={{ fontSize: "11px" }}>
                    Meeting at 4 PM today
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Upcoming Schedule - Full Width */}
        <motion.div variants={item} className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {/* Calendar Illustration */}
              <Illustration row={0} col={3} size={40} className="opacity-80" />
              <div>
                <h3 className="font-semibold" style={{ fontSize: "17px" }}>
                  This Week
                </h3>
                <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                  April 15-19, 2026
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate("schedule")}
              className="text-[#FE5A00] text-sm font-semibold hover:underline"
            >
              View All
            </button>
          </div>

          {/* Simple Event List */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#3B82F6]/5 border-l-4 border-[#3B82F6]">
              <div className="text-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-bold" style={{ fontSize: "14px" }}>
                  15
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold" style={{ fontSize: "14px" }}>
                  Security briefing
                </p>
                <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                  2:00 PM • Main Auditorium
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F59E0B]/5 border-l-4 border-[#F59E0B]">
              <div className="text-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center font-bold" style={{ fontSize: "14px" }}>
                  16
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold" style={{ fontSize: "14px" }}>
                  Equipment check
                </p>
                <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                  11:00 AM • Security Storage
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#10B981]/5 border-l-4 border-[#10B981]">
              <div className="text-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center font-bold" style={{ fontSize: "14px" }}>
                  17
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold" style={{ fontSize: "14px" }}>
                  Training session
                </p>
                <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                  3:00 PM • Training Room B
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions - Two Column Grid */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("request-history")}
            className="bg-white rounded-2xl p-5 text-left border-2 border-transparent hover:border-[#FE5A00] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FE5A00]/10 flex items-center justify-center mb-2">
              <ChevronRight className="w-5 h-5 text-[#FE5A00]" />
            </div>
            <h4 className="font-semibold mb-1" style={{ fontSize: "14px" }}>
              Approvals
            </h4>
            <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
              2 pending requests
            </p>
          </motion.button>

          <motion.button
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate("channels")}
            className="bg-white rounded-2xl p-5 text-left border-2 border-transparent hover:border-[#FE5A00] transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center mb-2">
              <MessageSquare className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <h4 className="font-semibold mb-1" style={{ fontSize: "14px" }}>
              Announcements
            </h4>
            <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
              Check latest updates
            </p>
          </motion.button>
        </div>
      </motion.div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}