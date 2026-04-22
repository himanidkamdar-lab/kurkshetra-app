import { motion } from "motion/react";
import {
  ArrowLeft,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  ClipboardCheck,
  FileText,
  Calendar,
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface HistoryScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const activities = [
    {
      id: "1",
      type: "equipment",
      title: "Audio Equipment Request",
      description: "2x Wireless Microphones for Stage Event",
      status: "approved",
      date: "Apr 15, 2026",
      time: "2:30 PM",
      icon: Package,
      color: "#10B981",
    },
    {
      id: "2",
      type: "approval",
      title: "Budget Approval Submitted",
      description: "Event Decoration Budget - ₹15,000",
      status: "pending",
      date: "Apr 14, 2026",
      time: "4:15 PM",
      icon: ClipboardCheck,
      color: "#F59E0B",
    },
    {
      id: "3",
      type: "message",
      title: "Message to Priya Sharma",
      description: "Discussed stage setup requirements",
      status: "completed",
      date: "Apr 14, 2026",
      time: "2:30 PM",
      icon: MessageSquare,
      color: "#8B5CF6",
    },
    {
      id: "4",
      type: "equipment",
      title: "Lighting Equipment Request",
      description: "4x LED Par Lights for Cultural Event",
      status: "approved",
      date: "Apr 13, 2026",
      time: "11:20 AM",
      icon: Package,
      color: "#10B981",
    },
    {
      id: "5",
      type: "task",
      title: "Task Completed",
      description: "Security briefing attendance confirmed",
      status: "completed",
      date: "Apr 12, 2026",
      time: "2:00 PM",
      icon: CheckCircle2,
      color: "#10B981",
    },
    {
      id: "6",
      type: "equipment",
      title: "Stage Props Request",
      description: "3x Podiums for Speaker Sessions",
      status: "rejected",
      date: "Apr 11, 2026",
      time: "3:45 PM",
      icon: Package,
      color: "#EF4444",
    },
    {
      id: "7",
      type: "document",
      title: "Class Schedule Uploaded",
      description: "Spring 2026 Timetable.pdf",
      status: "completed",
      date: "Apr 10, 2026",
      time: "9:30 AM",
      icon: Calendar,
      color: "#3B82F6",
    },
    {
      id: "8",
      type: "approval",
      title: "Venue Booking Request",
      description: "Main Auditorium - Cultural Night",
      status: "approved",
      date: "Apr 9, 2026",
      time: "1:00 PM",
      icon: ClipboardCheck,
      color: "#10B981",
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: "bg-[#10B981]/10 text-[#10B981]",
      pending: "bg-[#F59E0B]/10 text-[#F59E0B]",
      rejected: "bg-[#EF4444]/10 text-[#EF4444]",
      completed: "bg-[#10B981]/10 text-[#10B981]",
    };

    const icons = {
      approved: CheckCircle2,
      pending: Clock,
      rejected: XCircle,
      completed: CheckCircle2,
    };

    const StatusIcon = icons[status as keyof typeof icons];

    return (
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
          styles[status as keyof typeof styles]
        }`}
      >
        <StatusIcon className="w-4 h-4" />
        <span className="font-semibold capitalize" style={{ fontSize: "12px" }}>
          {status}
        </span>
      </div>
    );
  };

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
            Activity History
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#F5F3F0] rounded-xl p-3 text-center">
            <p className="text-[#FE5A00] font-bold" style={{ fontSize: "24px" }}>
              12
            </p>
            <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
              Total
            </p>
          </div>
          <div className="bg-[#F5F3F0] rounded-xl p-3 text-center">
            <p className="text-[#10B981] font-bold" style={{ fontSize: "24px" }}>
              8
            </p>
            <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
              Approved
            </p>
          </div>
          <div className="bg-[#F5F3F0] rounded-xl p-3 text-center">
            <p className="text-[#F59E0B] font-bold" style={{ fontSize: "24px" }}>
              3
            </p>
            <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
              Pending
            </p>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <motion.div variants={container} initial="hidden" animate="show" className="px-6 py-6">
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.id}
                variants={item}
                className="bg-white rounded-2xl p-5 border-l-4"
                style={{ borderColor: activity.color }}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${activity.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: activity.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1" style={{ fontSize: "16px" }}>
                          {activity.title}
                        </h3>
                        <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
                          {activity.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 text-[#6B6B6B]">
                        <span style={{ fontSize: "13px" }}>{activity.date}</span>
                        <span>•</span>
                        <span style={{ fontSize: "13px" }}>{activity.time}</span>
                      </div>
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        <motion.button
          variants={item}
          className="w-full mt-6 bg-white text-black font-semibold rounded-xl border border-black/10"
          style={{ fontSize: "15px", height: "48px" }}
        >
          Load More Activities
        </motion.button>
      </motion.div>

      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}
