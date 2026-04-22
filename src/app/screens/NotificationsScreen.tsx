import { motion } from "motion/react";
import { ArrowLeft, Bell, Package, CheckCircle2, AlertCircle, MessageSquare, Users } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface NotificationsScreenProps {
  onNavigate: (screen: string) => void;
}

export default function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const notifications = [
    {
      id: "1",
      type: "approval",
      title: "Equipment Request Approved",
      message: "Your audio equipment request has been approved by Priya Sharma",
      time: "5 mins ago",
      icon: CheckCircle2,
      color: "#10B981",
      unread: true,
    },
    {
      id: "2",
      type: "message",
      title: "New Message from HOD",
      message: "Priya Sharma: Great work on the stage setup!",
      time: "2:30 PM",
      icon: MessageSquare,
      color: "#8B5CF6",
      unread: true,
    },
    {
      id: "3",
      type: "task",
      title: "Task Assignment",
      message: "You have been assigned to 'Main Gate Security' shift",
      time: "1:15 PM",
      icon: AlertCircle,
      color: "#F59E0B",
      unread: true,
    },
    {
      id: "4",
      type: "announcement",
      title: "Department Meeting",
      message: "Security department meeting scheduled for tomorrow at 2:00 PM",
      time: "Yesterday",
      icon: Users,
      color: "#3B82F6",
      unread: false,
    },
    {
      id: "5",
      type: "equipment",
      title: "Equipment Returned",
      message: "Your lighting equipment has been successfully returned",
      time: "2 days ago",
      icon: Package,
      color: "#6B6B6B",
      unread: false,
    },
    {
      id: "6",
      type: "system",
      title: "Profile Updated",
      message: "Your class schedule has been successfully uploaded",
      time: "3 days ago",
      icon: Bell,
      color: "#6B6B6B",
      unread: false,
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
      <div className="bg-white px-6 py-4 border-b border-black/5 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold flex-1" style={{ fontSize: "22px" }}>
            Notifications
          </h1>
          <button className="text-[#FE5A00] font-semibold" style={{ fontSize: "14px" }}>
            Mark all read
          </button>
        </div>

        {/* Unread Count */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#FE5A00] rounded-full" />
          <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
            3 unread notifications
          </p>
        </div>
      </div>

      {/* Notifications List */}
      <motion.div variants={container} initial="hidden" animate="show" className="px-6 py-6">
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <motion.div
                key={notification.id}
                variants={item}
                className={`bg-white rounded-2xl p-5 border-l-4 ${
                  notification.unread ? "border-[#FE5A00]" : "border-transparent"
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${notification.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: notification.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold" style={{ fontSize: "16px" }}>
                        {notification.title}
                      </h3>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-[#FE5A00] rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-[#6B6B6B] mb-2" style={{ fontSize: "14px" }}>
                      {notification.message}
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                      {notification.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}
