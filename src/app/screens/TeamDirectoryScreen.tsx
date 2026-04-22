import { motion } from "motion/react";
import { ArrowLeft, Search, Phone, Mail, Shield, Crown, Users, Star, ChevronRight, UserCircle } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { useState } from "react";

interface TeamDirectoryScreenProps {
  onNavigate: (screen: string) => void;
}

export default function TeamDirectoryScreen({ onNavigate }: TeamDirectoryScreenProps) {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const committees = [
    { id: "security", name: "Security", icon: Shield, color: "#3B82F6" },
    { id: "sponsorship", name: "Sponsorship", icon: Star, color: "#F59E0B" },
    { id: "marketing", name: "Marketing", icon: Users, color: "#EC4899" },
    { id: "hospitality", name: "Hospitality", icon: Users, color: "#10B981" },
    { id: "tech", name: "Tech", icon: Users, color: "#8B5CF6" },
    { id: "design", name: "Design", icon: Users, color: "#FE5A00" },
    { id: "pr", name: "PR", icon: Users, color: "#06B6D4" },
    { id: "logistics", name: "Logistics", icon: Users, color: "#EF4444" },
    { id: "finance", name: "Finance", icon: Users, color: "#84CC16" },
    { id: "cultural", name: "Cultural", icon: Users, color: "#A855F7" },
    { id: "sports", name: "Sports", icon: Users, color: "#F97316" },
    { id: "food", name: "Food", icon: Users, color: "#14B8A6" },
  ];

  const teamData: Record<string, {
    ccHeads: Array<{ name: string; email: string; phone: string; avatar: string }>;
    hods: Array<{ name: string; email: string; phone: string; avatar: string }>;
    coordinators: Array<{ name: string; email: string; phone: string; avatar: string }>;
    members: Array<{ name: string; email: string; phone: string; avatar: string }>;
  }> = {
    security: {
      ccHeads: [
        { name: "Rajesh Kumar", email: "rajesh.kumar@flame.edu.in", phone: "+91 98765 43213", avatar: "RK" },
      ],
      hods: [
        { name: "Priya Sharma", email: "priya.sharma@flame.edu.in", phone: "+91 98765 43212", avatar: "PS" },
      ],
      coordinators: [
        { name: "Vikram Singh", email: "vikram.singh@flame.edu.in", phone: "+91 98765 43230", avatar: "VS" },
        { name: "Kavya Reddy", email: "kavya.reddy@flame.edu.in", phone: "+91 98765 43231", avatar: "KR" },
      ],
      members: [
        { name: "Rohan Mehta", email: "rohan.mehta@flame.edu.in", phone: "+91 98765 43214", avatar: "RM" },
        { name: "Ananya Singh", email: "ananya.singh@flame.edu.in", phone: "+91 98765 43215", avatar: "AS" },
        { name: "Aditya Patel", email: "aditya.patel@flame.edu.in", phone: "+91 98765 43232", avatar: "AP" },
        { name: "Sneha Gupta", email: "sneha.gupta@flame.edu.in", phone: "+91 98765 43233", avatar: "SG" },
      ],
    },
    sponsorship: {
      ccHeads: [
        { name: "Neha Reddy", email: "neha.reddy@flame.edu.in", phone: "+91 98765 43217", avatar: "NR" },
      ],
      hods: [
        { name: "Karan Malhotra", email: "karan.malhotra@flame.edu.in", phone: "+91 98765 43216", avatar: "KM" },
      ],
      coordinators: [
        { name: "Ishaan Verma", email: "ishaan.verma@flame.edu.in", phone: "+91 98765 43234", avatar: "IV" },
      ],
      members: [
        { name: "Arjun Desai", email: "arjun.desai@flame.edu.in", phone: "+91 98765 43218", avatar: "AD" },
        { name: "Pooja Shah", email: "pooja.shah@flame.edu.in", phone: "+91 98765 43235", avatar: "PS" },
      ],
    },
    marketing: {
      ccHeads: [
        { name: "Vivek Chopra", email: "vivek.chopra@flame.edu.in", phone: "+91 98765 43220", avatar: "VC" },
      ],
      hods: [
        { name: "Simran Kapoor", email: "simran.kapoor@flame.edu.in", phone: "+91 98765 43219", avatar: "SK" },
      ],
      coordinators: [
        { name: "Meera Joshi", email: "meera.joshi@flame.edu.in", phone: "+91 98765 43236", avatar: "MJ" },
      ],
      members: [
        { name: "Rahul Nair", email: "rahul.nair@flame.edu.in", phone: "+91 98765 43237", avatar: "RN" },
        { name: "Priyanka Das", email: "priyanka.das@flame.edu.in", phone: "+91 98765 43238", avatar: "PD" },
      ],
    },
    hospitality: {
      ccHeads: [
        { name: "Ravi Nair", email: "ravi.nair@flame.edu.in", phone: "+91 98765 43222", avatar: "RN" },
      ],
      hods: [
        { name: "Aisha Khan", email: "aisha.khan@flame.edu.in", phone: "+91 98765 43221", avatar: "AK" },
      ],
      coordinators: [
        { name: "Tanvi Mehta", email: "tanvi.mehta@flame.edu.in", phone: "+91 98765 43239", avatar: "TM" },
      ],
      members: [
        { name: "Kunal Sharma", email: "kunal.sharma@flame.edu.in", phone: "+91 98765 43240", avatar: "KS" },
      ],
    },
    tech: {
      ccHeads: [
        { name: "Varun Iyer", email: "varun.iyer@flame.edu.in", phone: "+91 98765 43224", avatar: "VI" },
      ],
      hods: [
        { name: "Aditi Joshi", email: "aditi.joshi@flame.edu.in", phone: "+91 98765 43223", avatar: "AJ" },
      ],
      coordinators: [
        { name: "Aryan Kapoor", email: "aryan.kapoor@flame.edu.in", phone: "+91 98765 43241", avatar: "AK" },
      ],
      members: [
        { name: "Divya Rao", email: "divya.rao@flame.edu.in", phone: "+91 98765 43242", avatar: "DR" },
        { name: "Siddharth Agarwal", email: "siddharth.agarwal@flame.edu.in", phone: "+91 98765 43243", avatar: "SA" },
      ],
    },
    design: {
      ccHeads: [
        { name: "Lakshmi Iyer", email: "lakshmi.iyer@flame.edu.in", phone: "+91 98765 43244", avatar: "LI" },
      ],
      hods: [
        { name: "Meera Bose", email: "meera.bose@flame.edu.in", phone: "+91 98765 43225", avatar: "MB" },
      ],
      coordinators: [
        { name: "Aarav Singh", email: "aarav.singh@flame.edu.in", phone: "+91 98765 43245", avatar: "AS" },
      ],
      members: [
        { name: "Nisha Gupta", email: "nisha.gupta@flame.edu.in", phone: "+91 98765 43246", avatar: "NG" },
      ],
    },
    pr: {
      ccHeads: [
        { name: "Riya Verma", email: "riya.verma@flame.edu.in", phone: "+91 98765 43247", avatar: "RV" },
      ],
      hods: [
        { name: "Kabir Malhotra", email: "kabir.malhotra@flame.edu.in", phone: "+91 98765 43248", avatar: "KM" },
      ],
      coordinators: [],
      members: [
        { name: "Tanya Shah", email: "tanya.shah@flame.edu.in", phone: "+91 98765 43249", avatar: "TS" },
      ],
    },
    logistics: {
      ccHeads: [
        { name: "Dev Patel", email: "dev.patel@flame.edu.in", phone: "+91 98765 43250", avatar: "DP" },
      ],
      hods: [
        { name: "Shruti Nair", email: "shruti.nair@flame.edu.in", phone: "+91 98765 43251", avatar: "SN" },
      ],
      coordinators: [
        { name: "Akash Kumar", email: "akash.kumar@flame.edu.in", phone: "+91 98765 43252", avatar: "AK" },
      ],
      members: [
        { name: "Anjali Desai", email: "anjali.desai@flame.edu.in", phone: "+91 98765 43253", avatar: "AD" },
      ],
    },
    finance: {
      ccHeads: [
        { name: "Yash Chopra", email: "yash.chopra@flame.edu.in", phone: "+91 98765 43254", avatar: "YC" },
      ],
      hods: [
        { name: "Kritika Sharma", email: "kritika.sharma@flame.edu.in", phone: "+91 98765 43255", avatar: "KS" },
      ],
      coordinators: [],
      members: [
        { name: "Harsh Reddy", email: "harsh.reddy@flame.edu.in", phone: "+91 98765 43256", avatar: "HR" },
      ],
    },
    cultural: {
      ccHeads: [
        { name: "Sanya Kapoor", email: "sanya.kapoor@flame.edu.in", phone: "+91 98765 43257", avatar: "SK" },
      ],
      hods: [
        { name: "Rohan Joshi", email: "rohan.joshi@flame.edu.in", phone: "+91 98765 43258", avatar: "RJ" },
      ],
      coordinators: [
        { name: "Prachi Mehta", email: "prachi.mehta@flame.edu.in", phone: "+91 98765 43259", avatar: "PM" },
      ],
      members: [
        { name: "Karthik Iyer", email: "karthik.iyer@flame.edu.in", phone: "+91 98765 43260", avatar: "KI" },
      ],
    },
    sports: {
      ccHeads: [
        { name: "Arnav Singh", email: "arnav.singh@flame.edu.in", phone: "+91 98765 43261", avatar: "AS" },
      ],
      hods: [
        { name: "Diya Patel", email: "diya.patel@flame.edu.in", phone: "+91 98765 43262", avatar: "DP" },
      ],
      coordinators: [],
      members: [
        { name: "Nikhil Gupta", email: "nikhil.gupta@flame.edu.in", phone: "+91 98765 43263", avatar: "NG" },
      ],
    },
    food: {
      ccHeads: [
        { name: "Isha Verma", email: "isha.verma@flame.edu.in", phone: "+91 98765 43264", avatar: "IV" },
      ],
      hods: [
        { name: "Arjun Nair", email: "arjun.nair@flame.edu.in", phone: "+91 98765 43265", avatar: "AN" },
      ],
      coordinators: [
        { name: "Ritu Shah", email: "ritu.shah@flame.edu.in", phone: "+91 98765 43266", avatar: "RS" },
      ],
      members: [
        { name: "Vaibhav Desai", email: "vaibhav.desai@flame.edu.in", phone: "+91 98765 43267", avatar: "VD" },
      ],
    },
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
      <div className="bg-white px-4 py-4 border-b border-black/5 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => selectedDept ? setSelectedDept(null) : onNavigate("more")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold" style={{ fontSize: "22px" }}>
              {selectedDept ? committees.find(c => c.id === selectedDept)?.name : "Team Directory"}
            </h1>
          </div>
          <ProfileDropdown onNavigate={onNavigate} />
        </div>
      </div>

      {/* Committee Selection View */}
      {!selectedDept && (
        <motion.div variants={container} initial="hidden" animate="show" className="px-4 py-6">
          <div className="mb-6">
            <h2 className="font-semibold mb-2" style={{ fontSize: "18px" }}>
              Select Committee
            </h2>
            <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
              View team members organized by department
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {committees.map((committee) => {
              const Icon = committee.icon;
              const deptData = teamData[committee.id];
              const totalMembers = 
                deptData.ccHeads.length + 
                deptData.hods.length + 
                deptData.coordinators.length + 
                deptData.members.length;
              
              return (
                <motion.button
                  key={committee.id}
                  variants={item}
                  onClick={() => setSelectedDept(committee.id)}
                  className="bg-white rounded-2xl p-4 text-left border-2 border-transparent hover:border-[#FE5A00] transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${committee.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: committee.color }} />
                  </div>
                  <h3 className="font-semibold mb-1" style={{ fontSize: "15px" }}>
                    {committee.name}
                  </h3>
                  <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                    {totalMembers} members
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Individual Committee View */}
      {selectedDept && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-6 space-y-6"
        >
          {/* CC Heads Section */}
          {teamData[selectedDept]?.ccHeads.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-semibold" style={{ fontSize: "16px" }}>
                  CC Heads
                </h3>
                <span className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                  ({teamData[selectedDept].ccHeads.length})
                </span>
              </div>
              <div className="space-y-3">
                {teamData[selectedDept].ccHeads.map((member) => (
                  <motion.div
                    key={member.email}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-semibold"
                        style={{ backgroundColor: "#10B981", fontSize: "14px" }}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-2" style={{ fontSize: "15px" }}>
                          {member.name}
                        </h4>
                        <div className="space-y-1.5">
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#FE5A00] transition-colors"
                            style={{ fontSize: "12px" }}
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {member.phone}
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#FE5A00] transition-colors"
                            style={{ fontSize: "12px" }}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* HODs Section */}
          {teamData[selectedDept]?.hods.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-[#FE5A00]" />
                <h3 className="font-semibold" style={{ fontSize: "16px" }}>
                  HODs
                </h3>
                <span className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                  ({teamData[selectedDept].hods.length})
                </span>
              </div>
              <div className="space-y-3">
                {teamData[selectedDept].hods.map((member) => (
                  <motion.div
                    key={member.email}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-semibold"
                        style={{ backgroundColor: "#FE5A00", fontSize: "14px" }}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-2" style={{ fontSize: "15px" }}>
                          {member.name}
                        </h4>
                        <div className="space-y-1.5">
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#FE5A00] transition-colors"
                            style={{ fontSize: "12px" }}
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {member.phone}
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#FE5A00] transition-colors"
                            style={{ fontSize: "12px" }}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinators Section */}
          {teamData[selectedDept]?.coordinators.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <UserCircle className="w-5 h-5 text-[#8B5CF6]" />
                <h3 className="font-semibold" style={{ fontSize: "16px" }}>
                  Coordinators
                </h3>
                <span className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                  ({teamData[selectedDept].coordinators.length})
                </span>
              </div>
              <div className="space-y-3">
                {teamData[selectedDept].coordinators.map((member) => (
                  <motion.div
                    key={member.email}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-semibold"
                        style={{ backgroundColor: "#8B5CF6", fontSize: "14px" }}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-2" style={{ fontSize: "15px" }}>
                          {member.name}
                        </h4>
                        <div className="space-y-1.5">
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#FE5A00] transition-colors"
                            style={{ fontSize: "12px" }}
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {member.phone}
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#FE5A00] transition-colors"
                            style={{ fontSize: "12px" }}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Members Section */}
          {teamData[selectedDept]?.members.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#6B6B6B]" />
                <h3 className="font-semibold" style={{ fontSize: "16px" }}>
                  Members
                </h3>
                <span className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                  ({teamData[selectedDept].members.length})
                </span>
              </div>
              <div className="space-y-3">
                {teamData[selectedDept].members.map((member) => (
                  <motion.div
                    key={member.email}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-semibold"
                        style={{ backgroundColor: "#6B6B6B", fontSize: "14px" }}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-2" style={{ fontSize: "15px" }}>
                          {member.name}
                        </h4>
                        <div className="space-y-1.5">
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#FE5A00] transition-colors"
                            style={{ fontSize: "12px" }}
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {member.phone}
                          </a>
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#FE5A00] transition-colors"
                            style={{ fontSize: "12px" }}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}