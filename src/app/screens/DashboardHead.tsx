import { motion } from "motion/react";
import { Bell, ChevronRight } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

export default function DashboardHead({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const departments = [
    { name: "Cultural", progress: 67, color: "#FE5A00" },
    { name: "Admin", progress: 45, color: "#FE5A00" },
    { name: "IT", progress: 88, color: "#FE5A00" },
    { name: "Finance", progress: 30, color: "#FE5A00" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24">
      {/* Top bar with view toggle */}
      <div className="bg-white px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold" style={{ fontSize: "22px" }}>
            Good morning, Priya 👋
          </h2>
          <button onClick={() => onNavigate("notifications")} className="relative">
            <Bell className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FE5A00] rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-semibold">8</span>
            </div>
          </button>
        </div>

        {/* View toggle */}
        <div className="flex gap-2 p-1 bg-[#F5F3F0] rounded-xl">
          <button className="flex-1 py-2 text-[#6B6B6B] rounded-lg font-semibold" style={{ fontSize: "13px" }}>
            My View
          </button>
          <button className="flex-1 py-2 bg-white text-[#FE5A00] rounded-lg font-semibold" style={{ fontSize: "13px" }}>
            All Depts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-4">
        {/* Pending Approvals Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl p-5 border-l-4 border-[#EF4444]"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold" style={{ fontSize: "22px" }}>
                  Pending Approvals
                </h3>
                <div className="w-2 h-2 bg-[#EF4444] rounded-full" />
              </div>
              <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                5 requests need your action
              </p>
            </div>
            <button
              onClick={() => onNavigate("approvals")}
              className="text-[#FE5A00] flex items-center gap-1"
              style={{ fontSize: "13px" }}
            >
              Review
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Cross-Dept Status Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl p-5"
        >
          <h3 className="font-semibold mb-5" style={{ fontSize: "22px" }}>
            Cross-Dept Status
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                className="bg-[#F5F3F0] rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold" style={{ fontSize: "16px" }}>
                    {dept.name}
                  </span>
                  <span className="text-[#FE5A00] font-bold" style={{ fontSize: "16px" }}>
                    {dept.progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dept.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[#FE5A00] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* My Tasks Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ fontSize: "22px" }}>
              My Tasks
            </h3>
            <button
              onClick={() => onNavigate("tasks")}
              className="text-[#FE5A00] flex items-center gap-1"
              style={{ fontSize: "13px" }}
            >
              See all
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-semibold mb-1" style={{ fontSize: "16px" }}>
                  Review budget allocation
                </p>
                <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                  Due: Today, 3:00 PM
                </p>
              </div>
              <span className="px-3 py-1 bg-[#EF4444]/10 text-[#EF4444] rounded-full text-[13px] font-semibold whitespace-nowrap">
                Overdue
              </span>
            </div>

            <div className="h-px bg-black/5" />

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-semibold mb-1" style={{ fontSize: "16px" }}>
                  Approve equipment requests
                </p>
                <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                  Due: Tomorrow, 5:00 PM
                </p>
              </div>
              <span className="px-3 py-1 bg-[#FE5A00] text-white rounded-full text-[13px] font-semibold whitespace-nowrap">
                In Progress
              </span>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white rounded-2xl p-5"
        >
          <h3 className="font-semibold mb-4" style={{ fontSize: "22px" }}>
            Upcoming Schedule
          </h3>

          <div className="space-y-3">
            <div>
              <p className="font-semibold" style={{ fontSize: "16px" }}>
                Core Committee Meeting
              </p>
              <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                Today, 6:00 PM · Conference Room A
              </p>
            </div>

            <div className="h-px bg-black/5" />

            <div>
              <p className="font-semibold" style={{ fontSize: "16px" }}>
                All-Hands Review
              </p>
              <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                Tomorrow, 11:00 AM · Main Auditorium
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}
