import { motion } from "motion/react";
import { StickFigureReading } from "../components/StickIllustrations";

export default function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12">
      {/* Step indicator */}
      <div className="flex justify-center gap-2 mb-16">
        <div className="w-2 h-2 rounded-full bg-[#FE5A00]" />
        <div className="w-2 h-2 rounded-full bg-black/10" />
        <div className="w-2 h-2 rounded-full bg-black/10" />
      </div>

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center mb-12"
      >
        <StickFigureReading className="w-48 h-48 text-[#FE5A00]" />
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="font-bold text-center" style={{ fontSize: "32px" }}>
            Welcome to Kurukshetra '26
          </h1>

          <p className="text-center text-[#6B6B6B] max-w-md mx-auto" style={{ fontSize: "16px" }}>
            You're in the Security department. Here's what you'll be doing.
          </p>

          {/* Role badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FE5A00]/10 rounded-full">
              <span className="text-[#FE5A00] font-semibold" style={{ fontSize: "13px" }}>
                Member · Security
              </span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="mt-auto space-y-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="w-full bg-[#FE5A00] text-white font-semibold rounded-xl flex items-center justify-center gap-2"
            style={{ fontSize: "16px", height: "52px" }}
          >
            <span>Get Started</span>
            <span>→</span>
          </motion.button>

          <button className="w-full text-[#6B6B6B]" style={{ fontSize: "16px" }}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
