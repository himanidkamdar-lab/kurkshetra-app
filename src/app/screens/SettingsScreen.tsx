import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Lock,
  Upload,
  FileText,
  LogOut,
  ChevronRight,
  Camera,
  GraduationCap,
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "login" | "schedule">("profile");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    name: "Rohan Mehta",
    email: "rohan.mehta@flame.edu.in",
    phone: "+91 98765 43210",
    batch: "2023-2027",
    department: "Security",
    role: "Member",
    year: "2nd Year",
    address: "Pune, Maharashtra",
  });

  const [scheduleFile, setScheduleFile] = useState<string | null>("Spring_2026_Schedule.pdf");

  useEffect(() => {
    // Get the selected avatar from localStorage
    const savedAvatar = localStorage.getItem("userAvatar");
    setUserAvatar(savedAvatar);
  }, []);

  const handleFileUpload = () => {
    setScheduleFile("Updated_Schedule_2026.pdf");
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
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold flex-1" style={{ fontSize: "22px" }}>
            Settings
          </h1>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white px-6 py-6 border-b border-black/5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#FE5A00] flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
              {userAvatar ? (
                <img 
                  src={userAvatar} 
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                  style={{ mixBlendMode: "normal" }}
                />
              ) : (
                "RM"
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#FE5A00] rounded-full flex items-center justify-center border-2 border-white">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <div>
            <h2 className="font-semibold" style={{ fontSize: "20px" }}>
              {profileData.name}
            </h2>
            <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
              {profileData.department} • {profileData.role}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <GraduationCap className="w-4 h-4 text-[#FE5A00]" />
              <p className="text-[#FE5A00] font-semibold" style={{ fontSize: "13px" }}>
                Batch {profileData.batch}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 py-3 border-b border-black/5 flex gap-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-colors ${
            activeTab === "profile"
              ? "bg-[#FE5A00] text-white"
              : "bg-[#F5F3F0] text-[#6B6B6B]"
          }`}
          style={{ fontSize: "14px" }}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-colors ${
            activeTab === "login" ? "bg-[#FE5A00] text-white" : "bg-[#F5F3F0] text-[#6B6B6B]"
          }`}
          style={{ fontSize: "14px" }}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("schedule")}
          className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-colors ${
            activeTab === "schedule"
              ? "bg-[#FE5A00] text-white"
              : "bg-[#F5F3F0] text-[#6B6B6B]"
          }`}
          style={{ fontSize: "14px" }}
        >
          Schedule
        </button>
      </div>

      {/* Content */}
      <motion.div variants={container} initial="hidden" animate="show" className="px-6 py-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <motion.div variants={item} className="bg-white rounded-2xl p-5">
              <h3 className="font-semibold mb-4" style={{ fontSize: "18px" }}>
                Personal Information
              </h3>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none font-semibold"
                    style={{ fontSize: "15px" }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
                    style={{ fontSize: "15px" }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
                    style={{ fontSize: "15px" }}
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="flex items-center gap-2 text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
                    style={{ fontSize: "15px" }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white rounded-2xl p-5">
              <h3 className="font-semibold mb-4" style={{ fontSize: "18px" }}>
                Academic Information
              </h3>

              <div className="space-y-4">
                {/* Batch */}
                <div>
                  <label className="flex items-center gap-2 text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                    <GraduationCap className="w-4 h-4" />
                    Batch
                  </label>
                  <input
                    type="text"
                    value={profileData.batch}
                    onChange={(e) => setProfileData({ ...profileData, batch: e.target.value })}
                    className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none font-semibold"
                    style={{ fontSize: "15px" }}
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="flex items-center gap-2 text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                    <Calendar className="w-4 h-4" />
                    Current Year
                  </label>
                  <select
                    value={profileData.year}
                    onChange={(e) => setProfileData({ ...profileData, year: e.target.value })}
                    className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
                    style={{ fontSize: "15px" }}
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                {/* Department */}
                <div>
                  <label className="flex items-center gap-2 text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                    <User className="w-4 h-4" />
                    Department
                  </label>
                  <input
                    type="text"
                    value={profileData.department}
                    className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
                    style={{ fontSize: "15px" }}
                    disabled
                  />
                </div>
              </div>
            </motion.div>

            <motion.button
              variants={item}
              className="w-full bg-[#FE5A00] text-white font-semibold rounded-xl"
              style={{ fontSize: "16px", height: "52px" }}
            >
              Save Changes
            </motion.button>
          </div>
        )}

        {/* Login Tab */}
        {activeTab === "login" && (
          <div className="space-y-4">
            <motion.div variants={item} className="bg-white rounded-2xl p-5">
              <h3 className="font-semibold mb-4" style={{ fontSize: "18px" }}>
                Login Credentials
              </h3>

              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label className="flex items-center gap-2 text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                    <User className="w-4 h-4" />
                    Username
                  </label>
                  <input
                    type="text"
                    value="rohan.mehta"
                    className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
                    style={{ fontSize: "15px" }}
                    disabled
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    className="w-full bg-[#F5F3F0] rounded-xl px-4 py-3 outline-none"
                    style={{ fontSize: "15px" }}
                    disabled
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white rounded-2xl p-5">
              <h3 className="font-semibold mb-4" style={{ fontSize: "18px" }}>
                Security
              </h3>

              <button className="w-full flex items-center justify-between p-4 bg-[#F5F3F0] rounded-xl hover:bg-[#F5F3F0]/80 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-[#6B6B6B]" />
                  <span className="font-medium" style={{ fontSize: "15px" }}>
                    Change Password
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6B6B6B]" />
              </button>
            </motion.div>

            <motion.div variants={item} className="bg-white rounded-2xl p-5">
              <h3 className="font-semibold mb-3" style={{ fontSize: "18px" }}>
                Session Information
              </h3>

              <div className="space-y-3 text-[#6B6B6B]" style={{ fontSize: "14px" }}>
                <div className="flex justify-between">
                  <span>Last Login</span>
                  <span className="text-black font-medium">Apr 15, 2026 at 9:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Device</span>
                  <span className="text-black font-medium">iPhone 14 Pro</span>
                </div>
                <div className="flex justify-between">
                  <span>Location</span>
                  <span className="text-black font-medium">Pune, India</span>
                </div>
              </div>
            </motion.div>

            <motion.button
              variants={item}
              className="w-full bg-[#EF4444] text-white font-semibold rounded-xl flex items-center justify-center gap-2"
              style={{ fontSize: "16px", height: "52px" }}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="space-y-4">
            <motion.div variants={item} className="bg-white rounded-2xl p-5">
              <h3 className="font-semibold mb-4" style={{ fontSize: "18px" }}>
                Class Schedule
              </h3>

              <p className="text-[#6B6B6B] mb-4" style={{ fontSize: "14px" }}>
                Upload your class timetable to help HODs schedule volunteer shifts around your
                academic commitments.
              </p>

              {scheduleFile && (
                <div className="mb-4 bg-[#F5F3F0] rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FE5A00]/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#FE5A00]" />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ fontSize: "14px" }}>
                        {scheduleFile}
                      </p>
                      <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                        Uploaded on Apr 10, 2026
                      </p>
                    </div>
                  </div>
                  <button className="text-[#FE5A00] font-semibold" style={{ fontSize: "13px" }}>
                    View
                  </button>
                </div>
              )}

              <button
                onClick={handleFileUpload}
                className="w-full border-2 border-dashed border-[#6B6B6B]/20 rounded-xl px-4 py-8 flex flex-col items-center justify-center gap-3 hover:border-[#FE5A00]/50 transition-colors"
              >
                <div className="w-14 h-14 bg-[#FE5A00]/10 rounded-full flex items-center justify-center">
                  <Upload className="w-7 h-7 text-[#FE5A00]" />
                </div>
                <div className="text-center">
                  <p className="font-semibold mb-1" style={{ fontSize: "15px" }}>
                    Upload New Schedule
                  </p>
                  <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                    PDF, JPG, PNG up to 5MB
                  </p>
                </div>
              </button>
            </motion.div>

            <motion.div variants={item} className="bg-white rounded-2xl p-5">
              <h3 className="font-semibold mb-4" style={{ fontSize: "18px" }}>
                Quick Schedule Info
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#F5F3F0] rounded-xl">
                  <span className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
                    Classes Per Week
                  </span>
                  <span className="font-semibold" style={{ fontSize: "15px" }}>
                    18 hours
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F5F3F0] rounded-xl">
                  <span className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
                    Free Days
                  </span>
                  <span className="font-semibold" style={{ fontSize: "15px" }}>
                    Saturday, Sunday
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F5F3F0] rounded-xl">
                  <span className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
                    Preferred Shift
                  </span>
                  <span className="font-semibold" style={{ fontSize: "15px" }}>
                    Evening
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}