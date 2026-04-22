import { motion } from "motion/react";
import { ArrowLeft, Package, Calendar, User, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface RequestHistoryScreenProps {
  onNavigate: (screen: string) => void;
}

export default function RequestHistoryScreen({ onNavigate }: RequestHistoryScreenProps) {
  const requests = [
    {
      id: "REQ-001",
      equipmentType: "Walkie talkies",
      description: "10 long-range walkie talkies with headsets",
      quantity: 10,
      startDate: "Apr 18, 2026",
      endDate: "Apr 20, 2026",
      purpose: "Security coordination during main stage events",
      requestedDate: "Apr 16, 2026",
      status: "approved",
      poc: "Vikram Singh",
      pocRole: "Security Head",
    },
    {
      id: "REQ-002",
      equipmentType: "Camera equipment",
      description: "Sony A7 camera with 24-70mm lens",
      quantity: 1,
      startDate: "Apr 19, 2026",
      endDate: "Apr 21, 2026",
      purpose: "Event photography for closing ceremony",
      requestedDate: "Apr 15, 2026",
      status: "pending",
      poc: "Arjun Mehta",
      pocRole: "Equipment Manager",
    },
    {
      id: "REQ-003",
      equipmentType: "Food coupons",
      description: "Meal coupons for volunteer team",
      quantity: 25,
      startDate: "Apr 17, 2026",
      endDate: "Apr 17, 2026",
      purpose: "Lunch for security volunteers during setup",
      requestedDate: "Apr 14, 2026",
      status: "rejected",
      poc: "Aisha Khan",
      pocRole: "Events Coordinator",
    },
    {
      id: "REQ-004",
      equipmentType: "Logistical equipment",
      description: "50 plastic chairs for green room",
      quantity: 50,
      startDate: "Apr 18, 2026",
      endDate: "Apr 22, 2026",
      purpose: "Seating arrangement for performers backstage",
      requestedDate: "Apr 13, 2026",
      status: "approved",
      poc: "Priya Sharma",
      pocRole: "Logistics Head",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return { bg: "bg-[#10B981]/10", text: "text-[#10B981]", icon: CheckCircle2 };
      case "pending":
        return { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]", icon: Clock };
      case "rejected":
        return { bg: "bg-[#EF4444]/10", text: "text-[#EF4444]", icon: XCircle };
      default:
        return { bg: "bg-[#6B6B6B]/10", text: "text-[#6B6B6B]", icon: AlertCircle };
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24">
      {/* Header */}
      <div className="bg-white px-4 md:px-6 py-4 border-b border-black/5 sticky top-0 z-10">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold flex-1" style={{ fontSize: "22px" }}>
            Approvals & Requests
          </h1>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-4 md:px-6 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4 text-center"
          >
            <p className="text-[#10B981] font-bold" style={{ fontSize: "24px" }}>
              2
            </p>
            <p className="text-[#6B6B6B] mt-1" style={{ fontSize: "12px" }}>
              Approved
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-4 text-center"
          >
            <p className="text-[#F59E0B] font-bold" style={{ fontSize: "24px" }}>
              1
            </p>
            <p className="text-[#6B6B6B] mt-1" style={{ fontSize: "12px" }}>
              Pending
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 text-center"
          >
            <p className="text-[#EF4444] font-bold" style={{ fontSize: "24px" }}>
              1
            </p>
            <p className="text-[#6B6B6B] mt-1" style={{ fontSize: "12px" }}>
              Rejected
            </p>
          </motion.div>
        </div>

        {/* Requests List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {requests.map((request, index) => {
            const statusInfo = getStatusColor(request.status);
            const StatusIcon = statusInfo.icon;

            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                className="bg-white rounded-2xl p-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-[#FE5A00]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-[#FE5A00]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#6B6B6B] mb-1" style={{ fontSize: "12px" }}>
                        {request.id}
                      </p>
                      <h3 className="font-semibold mb-1" style={{ fontSize: "16px" }}>
                        {request.equipmentType}
                      </h3>
                      <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
                        {request.description}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className={`px-3 py-1.5 rounded-full ${statusInfo.bg} flex items-center gap-1.5 flex-shrink-0`}>
                    <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                    <span className={`font-semibold ${statusInfo.text} capitalize`} style={{ fontSize: "12px" }}>
                      {request.status}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#6B6B6B]" />
                    <div>
                      <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>
                        Duration
                      </p>
                      <p className="font-medium" style={{ fontSize: "13px" }}>
                        {request.startDate} - {request.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#6B6B6B]" />
                    <div>
                      <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>
                        Quantity
                      </p>
                      <p className="font-medium" style={{ fontSize: "13px" }}>
                        {request.quantity} units
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#6B6B6B]" />
                    <div>
                      <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>
                        Assigned to
                      </p>
                      <p className="font-medium" style={{ fontSize: "13px" }}>
                        {request.poc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#6B6B6B]" />
                    <div>
                      <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>
                        Requested on
                      </p>
                      <p className="font-medium" style={{ fontSize: "13px" }}>
                        {request.requestedDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Purpose */}
                <div className="bg-[#F5F3F0] rounded-xl p-3">
                  <p className="text-[#6B6B6B] mb-1" style={{ fontSize: "11px" }}>
                    Purpose
                  </p>
                  <p className="text-black" style={{ fontSize: "13px" }}>
                    {request.purpose}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State (if no requests) */}
        {requests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-[#6B6B6B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-[#6B6B6B]" />
            </div>
            <h3 className="font-semibold mb-2" style={{ fontSize: "18px" }}>
              No Requests Yet
            </h3>
            <p className="text-[#6B6B6B] mb-6" style={{ fontSize: "14px" }}>
              Your equipment requests will appear here
            </p>
            <button
              onClick={() => onNavigate("equipment-request")}
              className="bg-[#FE5A00] text-white font-semibold rounded-xl px-6 py-3"
              style={{ fontSize: "15px" }}
            >
              Make a Request
            </button>
          </motion.div>
        )}
      </div>

      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}