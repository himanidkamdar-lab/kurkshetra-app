import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import avatar1 from "../../imports/image-3.png";
import avatar2 from "../../imports/image-4.png";
import avatar3 from "../../imports/image-5.png";
import avatar4 from "../../imports/image-6.png";
import avatar5 from "../../imports/image-7.png";
import avatar6 from "../../imports/image-8.png";
import avatar7 from "../../imports/image-9.png";
import avatar8 from "../../imports/image-10.png";
import avatar9 from "../../imports/image-11.png";


interface AvatarSelectionScreenProps {
  onComplete: () => void;
}

export default function AvatarSelectionScreen({ onComplete }: AvatarSelectionScreenProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const avatars = [
    { id: 0, src: avatar1, name: "Security" },
    { id: 1, src: avatar2, name: "Admin & Logistics" },
    { id: 2, src: avatar3, name: "Hospitality" },
    { id: 3, src: avatar4, name: "Public Relations" },
    { id: 4, src: avatar5, name: "Sponsorship" },
    { id: 5, src: avatar6, name: "Registrations" },
    { id: 6, src: avatar7, name: "Sports" },
    { id: 7, src: avatar8, name: "Culturals" },
    { id: 8, src: avatar9, name: "Finance" },
  ];

  const handleContinue = () => {
    // Store selected avatar in localStorage or state management
    localStorage.setItem("userAvatarIndex", String(selectedAvatar));
    onComplete();
  };

  return (
    <div className="bg-[#F5F3F0] flex flex-col" style={{ minHeight: "100%", paddingBottom: "env(safe-area-inset-bottom)" }}>
      {/* Header */}
      <div className="px-6 pt-10 pb-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold mb-2"
          style={{ fontSize: "28px" }}
        >
          Pick Your Avatar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#6B6B6B]"
          style={{ fontSize: "15px" }}
        >
          Select your committee
        </motion.p>
      </div>

      {/* Main Avatar Display */}
      <div className="flex items-center justify-center px-6 py-4">
        <motion.div
          key={selectedAvatar}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative"
        >
          {/* Decorative Circle Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-48 h-48 rounded-full opacity-10"
              style={{ backgroundColor: "#FE5A00" }}
            />
          </div>

          {/* Avatar Image */}
          <div className="relative z-10 w-44 h-44 rounded-full overflow-hidden bg-white shadow-lg flex items-center justify-center">
            <img
              src={avatars[selectedAvatar].src}
              alt={avatars[selectedAvatar].name}
              className="w-full h-full object-cover"
              style={{ 
                mixBlendMode: "multiply",
                objectFit: "contain"
              }}
            />
          </div>

          {/* Avatar Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-6"
          >
            <p className="font-semibold" style={{ fontSize: "20px" }}>
              {avatars[selectedAvatar].name}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Avatar Selection Grid */}
      <div className="px-6 pb-4">
        <div className="bg-white rounded-3xl p-4 shadow-lg">
          <p className="text-[#6B6B6B] text-center mb-4" style={{ fontSize: "13px" }}>
            Tap to switch avatars
          </p>
          <div className="grid grid-cols-5 gap-3">
            {avatars.map((avatar) => (
              <motion.button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                whileTap={{ scale: 0.9 }}
                className={`relative aspect-square rounded-2xl overflow-hidden transition-all ${
                  selectedAvatar === avatar.id
                    ? "ring-4 ring-[#FE5A00] shadow-lg"
                    : "ring-2 ring-black/5"
                }`}
              >
                <div className="absolute inset-0 bg-[#F5F3F0]" />
                <img
                  src={avatar.src}
                  alt={avatar.name}
                  className="relative z-10 w-full h-full object-contain p-1"
                  style={{ mixBlendMode: "multiply" }}
                />
                {selectedAvatar === avatar.id && (
                  <motion.div
                    layoutId="selected-indicator"
                    className="absolute inset-0 bg-[#FE5A00]/10"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="px-6 pb-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleContinue}
          className="w-full bg-[#FE5A00] text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
          style={{ fontSize: "16px", height: "56px" }}
        >
          Continue to Dashboard
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}