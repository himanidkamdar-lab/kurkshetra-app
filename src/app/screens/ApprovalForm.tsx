import { motion } from "motion/react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { StickFigureWithClipboard } from "../components/StickIllustrations";
import { BottomNav } from "../components/BottomNav";
import { useState } from "react";

export default function ApprovalForm({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [quantity, setQuantity] = useState(1);
  const [equipmentType, setEquipmentType] = useState("");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [step, setStep] = useState(1);
  const [selectedPOC, setSelectedPOC] = useState("");

  const equipmentTypes = [
    "Walkie talkies",
    "Camera equipment",
    "Logistical equipment",
    "Food coupons",
    "Sports equipment",
    "Flame A frames",
  ];

  const pocList = [
    { id: "1", name: "Priya Sharma", role: "Logistics Head", dept: "Operations" },
    { id: "2", name: "Arjun Mehta", role: "Equipment Manager", dept: "Technical" },
    { id: "3", name: "Sneha Patel", role: "Inventory Lead", dept: "Logistics" },
    { id: "4", name: "Vikram Singh", role: "Security Head", dept: "Security" },
    { id: "5", name: "Aisha Khan", role: "Events Coordinator", dept: "Management" },
  ];

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Submit form
      onNavigate("dashboard");
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return equipmentType && description && quantity && startDate && endDate && purpose;
    }
    if (step === 2) {
      return selectedPOC;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-white pb-32 md:pb-24">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-black/5 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => step === 1 ? onNavigate("dashboard") : setStep(1)}>
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h1 className="font-semibold" style={{ fontSize: "20px" }}>
              Equipment Request
            </h1>
          </div>

          {/* Stick illustration top-right */}
          <StickFigureWithClipboard className="w-10 h-10 md:w-12 md:h-12 text-[#FE5A00]" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 md:px-6 py-4 bg-white sticky top-[68px] z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-[#FE5A00]' : 'bg-black/10'}`} />
            <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-[#FE5A00]' : 'bg-black/10'}`} />
          </div>
          <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
            Step {step} of 2
          </p>
        </div>
      </div>

      {/* Step 1: Equipment Details */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 md:px-6 py-6 space-y-6 max-w-4xl mx-auto"
        >
          {/* Equipment Type */}
          <div>
            <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
              Equipment Type *
            </label>
            <select
              value={equipmentType}
              onChange={(e) => setEquipmentType(e.target.value)}
              className="w-full border-b-2 border-black/10 pb-3 outline-none focus:border-[#FE5A00] transition-colors bg-white"
              style={{ fontSize: "15px" }}
            >
              <option value="">Select equipment type</option>
              {equipmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Description - Manual Input */}
          <div>
            <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
              Item Details *
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., 10 plastic chairs, Sony A7 camera with 24-70mm lens"
              className="w-full border-b-2 border-black/10 pb-3 outline-none focus:border-[#FE5A00] transition-colors"
              style={{ fontSize: "15px" }}
            />
            <p className="text-[#6B6B6B] mt-2" style={{ fontSize: "12px" }}>
              Describe exactly what you need
            </p>
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
              Quantity *
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-xl border-2 border-black/10 flex items-center justify-center hover:border-[#FE5A00] transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div
                className="flex-1 text-center font-bold"
                style={{ fontSize: "32px" }}
              >
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 rounded-xl border-2 border-black/10 flex items-center justify-center hover:border-[#FE5A00] transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dates Required */}
          <div>
            <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
              Dates Required *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border-2 border-black/10 rounded-xl px-4 py-3 outline-none focus:border-[#FE5A00] transition-colors"
                  style={{ fontSize: "15px" }}
                />
              </div>
              <div>
                <label className="block mb-2 text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border-2 border-black/10 rounded-xl px-4 py-3 outline-none focus:border-[#FE5A00] transition-colors"
                  style={{ fontSize: "15px" }}
                />
              </div>
            </div>
          </div>

          {/* Purpose */}
          <div>
            <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
              Purpose *
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Why do you need this equipment?"
              rows={4}
              className="w-full border-2 border-black/10 rounded-xl px-4 py-3 outline-none focus:border-[#FE5A00] transition-colors resize-none"
              style={{ fontSize: "15px" }}
            />
          </div>

          {/* Auto-filled info */}
          <div className="bg-[#F5F3F0] rounded-xl p-4">
            <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
              Requesting as <span className="font-semibold text-black">Rohit Sharma</span> · <span className="font-semibold text-black">Security Dept</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Step 2: Select POC */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 md:px-6 py-6 space-y-4 max-w-4xl mx-auto"
        >
          <div className="mb-6">
            <h2 className="font-semibold mb-2" style={{ fontSize: "18px" }}>
              Select Point of Contact
            </h2>
            <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
              Choose who should receive and approve this request
            </p>
          </div>

          <div className="space-y-3">
            {pocList.map((poc) => (
              <motion.button
                key={poc.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPOC(poc.id)}
                className={`w-full text-left bg-white rounded-2xl p-4 border-2 transition-all ${
                  selectedPOC === poc.id
                    ? "border-[#FE5A00] bg-[#FE5A00]/5"
                    : "border-black/5 hover:border-black/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold mb-1" style={{ fontSize: "15px" }}>
                      {poc.name}
                    </p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                      {poc.role} · {poc.dept}
                    </p>
                  </div>
                  {selectedPOC === poc.id && (
                    <div className="w-6 h-6 rounded-full bg-[#FE5A00] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Next/Submit button - Fixed at bottom */}
      <div className="fixed bottom-20 md:bottom-24 left-0 right-0 bg-white border-t border-black/5 px-4 md:px-6 py-4 z-20">
        <div className="max-w-4xl mx-auto">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={!canProceed()}
            className={`w-full font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
              canProceed()
                ? "bg-[#FE5A00] text-white"
                : "bg-black/10 text-[#6B6B6B] cursor-not-allowed"
            }`}
            style={{ fontSize: "16px", height: "52px" }}
          >
            <span>{step === 2 ? "Submit Request" : "Next: Select POC"}</span>
            <span>→</span>
          </motion.button>
        </div>
      </div>

      <BottomNav active="requests" onNavigate={onNavigate} />
    </div>
  );
}
