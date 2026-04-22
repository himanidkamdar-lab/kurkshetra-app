import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Upload, X, CheckCircle2 } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface EquipmentRequestScreenProps {
  onNavigate: (screen: string) => void;
}

export default function EquipmentRequestScreen({ onNavigate }: EquipmentRequestScreenProps) {
  const [formData, setFormData] = useState({
    equipmentType: "",
    description: "",
    quantity: "",
    purpose: "",
    dateNeeded: "",
    duration: "",
    additionalNotes: "",
  });
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const equipmentTypes = [
    "Walkie talkies",
    "Camera equipment",
    "Logistical equipment",
    "Food coupons",
    "Sports equipment",
    "Flame A frames",
  ];

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onNavigate("history");
    }, 2000);
  };

  const handleFileUpload = () => {
    // Mock file upload
    setAttachments([...attachments, "document.pdf"]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="font-semibold mb-2" style={{ fontSize: "24px" }}>
            Request Submitted!
          </h2>
          <p className="text-[#6B6B6B]" style={{ fontSize: "15px" }}>
            Your equipment request has been sent for approval
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-black/5 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold flex-1" style={{ fontSize: "22px" }}>
            Equipment Request
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-6 space-y-4">
        {/* Equipment Type */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5"
        >
          <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
            Equipment Type *
          </label>
          <select
            value={formData.equipmentType}
            onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
            className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
            style={{ fontSize: "15px" }}
          >
            <option value="">Select equipment type</option>
            {equipmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5"
        >
          <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the equipment..."
            rows={4}
            className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none resize-none"
            style={{ fontSize: "15px" }}
          />
        </motion.div>

        {/* Quantity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5"
        >
          <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
            Quantity *
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            placeholder="Enter quantity"
            className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
            style={{ fontSize: "15px" }}
          />
        </motion.div>

        {/* Purpose */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl p-5"
        >
          <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
            Purpose *
          </label>
          <textarea
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            placeholder="Describe the purpose..."
            rows={4}
            className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none resize-none"
            style={{ fontSize: "15px" }}
          />
        </motion.div>

        {/* Date and Duration */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-white rounded-2xl p-5">
            <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
              Date Needed *
            </label>
            <input
              type="date"
              value={formData.dateNeeded}
              onChange={(e) => setFormData({ ...formData, dateNeeded: e.target.value })}
              className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
              style={{ fontSize: "15px" }}
            />
          </div>

          <div className="bg-white rounded-2xl p-5">
            <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
              Duration (days) *
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="Days"
              className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
              style={{ fontSize: "15px" }}
            />
          </div>
        </motion.div>

        {/* Additional Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl p-5"
        >
          <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
            Additional Notes
          </label>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            placeholder="Any additional information..."
            rows={3}
            className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none resize-none"
            style={{ fontSize: "15px" }}
          />
        </motion.div>

        {/* Attachments */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5"
        >
          <label className="block mb-3 font-semibold" style={{ fontSize: "16px" }}>
            Attachments
          </label>

          {attachments.length > 0 && (
            <div className="mb-3 space-y-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#F5F3F0] rounded-xl px-4 py-3"
                >
                  <span style={{ fontSize: "14px" }}>{file}</span>
                  <button onClick={() => removeAttachment(index)}>
                    <X className="w-5 h-5 text-[#6B6B6B]" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleFileUpload}
            className="w-full border-2 border-dashed border-[#6B6B6B]/20 rounded-xl px-4 py-6 flex flex-col items-center justify-center gap-2 hover:border-[#FE5A00]/50 transition-colors"
          >
            <Upload className="w-8 h-8 text-[#6B6B6B]" />
            <span className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
              Upload documents or images
            </span>
          </button>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          onClick={handleSubmit}
          disabled={
            !formData.equipmentType ||
            !formData.description ||
            !formData.quantity ||
            !formData.purpose ||
            !formData.dateNeeded ||
            !formData.duration
          }
          className={`w-full font-semibold rounded-xl flex items-center justify-center ${
            !formData.equipmentType ||
            !formData.description ||
            !formData.quantity ||
            !formData.purpose ||
            !formData.dateNeeded ||
            !formData.duration
              ? "bg-[#6B6B6B]/20 text-[#6B6B6B]"
              : "bg-[#FE5A00] text-white"
          }`}
          style={{ fontSize: "16px", height: "56px" }}
        >
          Submit Request
        </motion.button>
      </div>

      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}