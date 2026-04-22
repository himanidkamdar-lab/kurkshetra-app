import { motion } from "motion/react";
import { ArrowLeft, Phone, Mail, Shield, Crown, Users, Star, ChevronRight, UserCircle, DollarSign, TrendingUp, Megaphone, Palette, Code, Package2, Utensils, Music, Trophy, Mic, Calendar } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { useState } from "react";

interface TeamDirectoryScreenProps {
  onNavigate: (screen: string) => void;
}

interface Member {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  avatar: string;
}

interface CommitteeData {
  ccHeads: Member[];
  hods: Member[];
  coordinators: Member[];
  members: Member[];
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function TeamDirectoryScreen({ onNavigate }: TeamDirectoryScreenProps) {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const committees = [
    { id: "security",      name: "Security",           icon: Shield,    color: "#3B82F6" },
    { id: "sponsorship",   name: "Sponsorship",        icon: DollarSign,color: "#F59E0B" },
    { id: "pr",            name: "PR",                 icon: Megaphone, color: "#06B6D4" },
    { id: "hospitality",   name: "Hospitality",        icon: Users,     color: "#10B981" },
    { id: "logistics",     name: "Logistics",          icon: Package2,  color: "#EF4444" },
    { id: "finance",       name: "Finance",            icon: Crown,     color: "#84CC16" },
    { id: "cultural",      name: "Cultural",           icon: Music,     color: "#A855F7" },
    { id: "sports",        name: "Sports",             icon: Trophy,    color: "#F97316" },
    { id: "tech",          name: "IT",                 icon: Code,      color: "#8B5CF6" },
    { id: "registrations", name: "Registrations",      icon: UserCircle,color: "#14B8A6" },
    { id: "management",    name: "Management Events",  icon: Calendar,  color: "#EC4899" },
    { id: "occc",          name: "OC/CC Committee",    icon: Star,      color: "#FE5A00" },
    { id: "anchors",       name: "Anchors",            icon: Mic,       color: "#6366F1" },
  ];

  const teamData: Record<string, CommitteeData> = {
    sponsorship: {
      ccHeads: [],
      hods: [
        { name: "Dhatri", role: "HOD", avatar: initials("Dhatri") },
      ],
      coordinators: [
        { name: "Parthsarthi", role: "Legal Coordinator",   avatar: initials("Parthsarthi") },
        { name: "Prem",        role: "Outreach Coordinator",avatar: initials("Prem") },
        { name: "Sulek",       role: "Secretary",           avatar: initials("Sulek") },
      ],
      members: [],
    },
    anchors: {
      ccHeads: [],
      hods: [],
      coordinators: [],
      members: [
        { name: "Samaira Waraich",  role: "Anchor", avatar: initials("Samaira Waraich") },
        { name: "Pratyush Mittal",  role: "Anchor", avatar: initials("Pratyush Mittal") },
        { name: "Yashasvi Nagrale", role: "Anchor", avatar: initials("Yashasvi Nagrale") },
        { name: "Yojit Rathi",      role: "Anchor", avatar: initials("Yojit Rathi") },
        { name: "Tuvyah Koyande",   role: "Anchor", avatar: initials("Tuvyah Koyande") },
        { name: "Darsh Parekh",     role: "Anchor", avatar: initials("Darsh Parekh") },
        { name: "Tamanna Handa",    role: "Anchor", avatar: initials("Tamanna Handa") },
        { name: "Viraj Ajmera",     role: "Anchor", avatar: initials("Viraj Ajmera") },
        { name: "Jainam S Jain",    role: "Anchor", avatar: initials("Jainam Jain") },
        { name: "Manav Jain",       role: "Anchor", avatar: initials("Manav Jain") },
        { name: "Isha Rajput",      role: "Anchor", avatar: initials("Isha Rajput") },
        { name: "Kritika Agarwal",  role: "Anchor", avatar: initials("Kritika Agarwal") },
        { name: "Govind Naynar",    role: "Anchor", avatar: initials("Govind Naynar") },
        { name: "Adya Shigehalli",  role: "Anchor", avatar: initials("Adya Shigehalli") },
      ],
    },
    occc: {
      ccHeads: [],
      hods: [
        { name: "Sneh",    role: "HOD - Events",      avatar: initials("Sneh") },
        { name: "Shalini", role: "HOD - Awards",      avatar: initials("Shalini") },
        { name: "Pranjal", role: "HOD - Artist",      avatar: initials("Pranjal") },
        { name: "Bhoomi",  role: "HOD - Performance", avatar: initials("Bhoomi") },
        { name: "Sukruti", role: "HOD - Vendors",     avatar: initials("Sukruti") },
      ],
      coordinators: [
        { name: "Parv",    role: "Coordinator - Events",   avatar: initials("Parv") },
        { name: "Satyam",  role: "Coordinator - Awards",   avatar: initials("Satyam") },
        { name: "Mahathi", role: "Coordinator - Planning", avatar: initials("Mahathi") },
      ],
      members: [],
    },
    security: {
      ccHeads: [],
      hods: [
        { name: "Aditya Suri",      role: "HOD - Security Arjuna",               avatar: initials("Aditya Suri") },
        { name: "Niharika Chauhan", role: "HOD - Security Arjuna",               avatar: initials("Niharika Chauhan") },
        { name: "Nirbbhhay Singh",  role: "HOD - Security Gate",                 avatar: initials("Nirbbhhay Singh") },
        { name: "Yuga Chopada",     role: "HOD - Security Gate",                 avatar: initials("Yuga Chopada") },
        { name: "Priyanshi Agrawal",role: "HOD - Security Plaza",                avatar: initials("Priyanshi Agrawal") },
        { name: "Adity Sharma",     role: "HOD - Security Plaza",                avatar: initials("Adity Sharma") },
        { name: "Yash Keyal",       role: "HOD - Security Plaza",                avatar: initials("Yash Keyal") },
        { name: "Tuhina Bawa",      role: "HOD - Arjuna (Cricket/Football)",     avatar: initials("Tuhina Bawa") },
        { name: "Devam Gadia",      role: "HOD - Arjuna (Cricket/Football)",     avatar: initials("Devam Gadia") },
      ],
      coordinators: [
        { name: "Tanveer Singh Sethi", role: "Coordinator - Security Arjuna",            avatar: initials("Tanveer Sethi") },
        { name: "Kyra Tully",          role: "Coordinator - Security Gate",              avatar: initials("Kyra Tully") },
        { name: "George Leapaul",      role: "Coordinator - Security Plaza",             avatar: initials("George Leapaul") },
        { name: "Arnav Chandan",       role: "Coordinator - Arjuna (Cricket/Football)",  avatar: initials("Arnav Chandan") },
      ],
      members: [],
    },
    sports: {
      ccHeads: [],
      hods: [],
      coordinators: [
        { name: "Ayush Kumar",   role: "Coordinator", avatar: initials("Ayush Kumar") },
        { name: "Krishn Alagiya",role: "Coordinator", avatar: initials("Krishn Alagiya") },
      ],
      members: [],
    },
    finance: {
      ccHeads: [],
      hods: [
        { name: "Aryan Jasoliya",    role: "HOD - Reimbursement", avatar: initials("Aryan Jasoliya") },
        { name: "Soham Sayyaparaju", role: "HOD - Audit",         avatar: initials("Soham Sayyaparaju") },
        { name: "Alisha Dhoot",      role: "HOD - Expenses",      avatar: initials("Alisha Dhoot") },
      ],
      coordinators: [
        { name: "Ishika Jhaver", role: "Internal Coordinator", avatar: initials("Ishika Jhaver") },
        { name: "Sayali Karver", role: "External Coordinator", avatar: initials("Sayali Karver") },
      ],
      members: [],
    },
    cultural: {
      ccHeads: [],
      hods: [],
      coordinators: [
        { name: "Aishani",       role: "Coordinator", avatar: initials("Aishani") },
        { name: "Shraddha Jain", role: "Coordinator", avatar: initials("Shraddha Jain") },
      ],
      members: [],
    },
    management: {
      ccHeads: [],
      hods: [
        { name: "Aditya", role: "HOD", avatar: initials("Aditya") },
        { name: "Esha",   role: "HOD", avatar: initials("Esha") },
        { name: "Shriya", role: "HOD", avatar: initials("Shriya") },
        { name: "Sheryyn",role: "HOD", avatar: initials("Sheryyn") },
        { name: "Prachi", role: "HOD", avatar: initials("Prachi") },
      ],
      coordinators: [
        { name: "Stuti",   role: "Coordinator", avatar: initials("Stuti") },
        { name: "Yashvi",  role: "Coordinator", avatar: initials("Yashvi") },
        { name: "Akansha", role: "Coordinator", avatar: initials("Akansha") },
      ],
      members: [],
    },
    registrations: {
      ccHeads: [
        { name: "Ragini Arora",      role: "Deputy Head", avatar: initials("Ragini Arora") },
        { name: "Janhavi Ajgaonkar", role: "Deputy Head", avatar: initials("Janhavi Ajgaonkar") },
      ],
      hods: [
        { name: "Moksha Awasthi",     role: "Communications HOD",        avatar: initials("Moksha Awasthi") },
        { name: "Prisha Kumar",       role: "WhatsApp / Instagram HOD",  avatar: initials("Prisha Kumar") },
        { name: "Samiksha Saravanan", role: "Email / LinkedIn HOD",      avatar: initials("Samiksha Saravanan") },
      ],
      coordinators: [
        { name: "Aryan Madhogaria",  role: "Participant Coordinator",                   avatar: initials("Aryan Madhogaria") },
        { name: "Sanyam Kanthaliya", role: "Members & Registration Desk Coordinator",   avatar: initials("Sanyam Kanthaliya") },
        { name: "Arushi Rastogi",    role: "Database Coordinator",                      avatar: initials("Arushi Rastogi") },
      ],
      members: [],
    },
    pr: {
      ccHeads: [
        { name: "Vedant",        role: "Co-Head - Documentation", avatar: initials("Vedant") },
        { name: "Shreeya",       role: "Co-Head - Documentation", avatar: initials("Shreeya") },
        { name: "Tanisha",       role: "Co-Head - Outreach",      avatar: initials("Tanisha") },
        { name: "Nikita",        role: "Co-Head - Outreach",      avatar: initials("Nikita") },
        { name: "Rashika",       role: "Co-Head - Social Media",  avatar: initials("Rashika") },
        { name: "Aryaki",        role: "Co-Head - Social Media",  avatar: initials("Aryaki") },
        { name: "Nidhi Shah",    role: "Co-Head - Design",        avatar: initials("Nidhi Shah") },
        { name: "Kashvi Toprani",role: "Co-Head - Design",        avatar: initials("Kashvi Toprani") },
        { name: "Vidhi Kedia",   role: "Head of Content",         avatar: initials("Vidhi Kedia") },
      ],
      hods: [],
      coordinators: [
        { name: "Mishti",              role: "Co-Coordinator - Documentation",    avatar: initials("Mishti") },
        { name: "Deeksha",             role: "Co-Coordinator - Documentation",    avatar: initials("Deeksha") },
        { name: "Kanishka",            role: "Coordinator - Outreach",            avatar: initials("Kanishka") },
        { name: "Akshit",              role: "Co-Coordinator - Social Media",     avatar: initials("Akshit") },
        { name: "Anushka",             role: "Co-Coordinator - Social Media",     avatar: initials("Anushka") },
        { name: "Sai Avanthika Manyam",role: "Co-Coordinator - Design",          avatar: initials("Sai Manyam") },
        { name: "Khushii Mehta",       role: "Co-Coordinator - Design",          avatar: initials("Khushii Mehta") },
      ],
      members: [],
    },
    tech: {
      ccHeads: [],
      hods: [
        { name: "Meherika Upadhyay", role: "HOD of Design",        avatar: initials("Meherika Upadhyay") },
        { name: "Suryansh Kathuria", role: "HOD of Organisation",  avatar: initials("Suryansh Kathuria") },
      ],
      coordinators: [
        { name: "Nischal Jogani",   role: "Data Coordinator",    avatar: initials("Nischal Jogani") },
        { name: "Krisha Agarwal",   role: "Website Coordinator", avatar: initials("Krisha Agarwal") },
      ],
      members: [],
    },
    hospitality: {
      ccHeads: [],
      hods: [
        { name: "Prasoon Joshi",         role: "HOD - Officials & Artists",              avatar: initials("Prasoon Joshi") },
        { name: "Tia Chopra",            role: "HOD - Officials & Artists",              avatar: initials("Tia Chopra") },
        { name: "Khushali Golwala",      role: "HOD - Food Inventory",                  avatar: initials("Khushali Golwala") },
        { name: "Deeptha Sanjay",        role: "HOD - Food Participants",               avatar: initials("Deeptha Sanjay") },
        { name: "Niharika Gursahani",    role: "HOD - Food Officials",                  avatar: initials("Niharika Gursahani") },
        { name: "Varshita Pinnamaneni",  role: "HOD - Sports Participants",             avatar: initials("Varshita Pinnamaneni") },
        { name: "Siddarth Salunkhe",     role: "HOD - Culturals Participants",          avatar: initials("Siddarth Salunkhe") },
        { name: "Adrija Chakravorty",    role: "HOD - Management Events Participants",  avatar: initials("Adrija Chakravorty") },
        { name: "Sumeet Kataria",        role: "HOD - Shuttle",                         avatar: initials("Sumeet Kataria") },
      ],
      coordinators: [
        { name: "Shivani HR",       role: "Coordinator - Officials, Artists, Referees & Judges", avatar: initials("Shivani HR") },
        { name: "Mrunmayi Deshpande",role: "Coordinator - Food",                               avatar: initials("Mrunmayi Deshpande") },
        { name: "Juvana Jolly",     role: "Coordinator - Participants",                         avatar: initials("Juvana Jolly") },
        { name: "Aryan Goyal",      role: "Coordinator - Transport & Accommodation",            avatar: initials("Aryan Goyal") },
      ],
      members: [],
    },
    logistics: {
      ccHeads: [
        { name: "Aditya Mehta",    role: "CC Head",                avatar: initials("Aditya Mehta") },
        { name: "Suhani Aggarwal", role: "Deputy Head",            avatar: initials("Suhani Aggarwal") },
        { name: "Devanshi Arora",  role: "Deputy Head",            avatar: initials("Devanshi Arora") },
      ],
      hods: [
        { name: "Hiya Jain",          role: "Co-HoD Organising",      avatar: initials("Hiya Jain") },
        { name: "Dhritee Bhardwaj",   role: "Co-HoD Organising",      avatar: initials("Dhritee Bhardwaj") },
        { name: "Abhishek Samak",     role: "HoD Ceremonies",         avatar: initials("Abhishek Samak") },
        { name: "Arni Damani",        role: "HoD Sponsorship Support",avatar: initials("Arni Damani") },
        { name: "Divyanshri Munot",   role: "HoD Small-cap",          avatar: initials("Divyanshri Munot") },
        { name: "Nishi Shah",         role: "HoD Large-cap",          avatar: initials("Nishi Shah") },
        { name: "Niyati Joesph",      role: "HoD Tech",               avatar: initials("Niyati Joesph") },
        { name: "Aleina Kumar",       role: "HoD Inventory",          avatar: initials("Aleina Kumar") },
        { name: "Navya Shree Vardan", role: "HoD Volunteers",         avatar: initials("Navya Vardan") },
      ],
      coordinators: [
        { name: "Ishaan Upadhyay",  role: "Coordinator Logistics",   avatar: initials("Ishaan Upadhyay") },
        { name: "Muhamed Kassam",   role: "Coordinator Technology",  avatar: initials("Muhamed Kassam") },
        { name: "Anushka Doshi",    role: "Coordinator Decor",       avatar: initials("Anushka Doshi") },
        { name: "Shriyans Chaudhari",role: "Coordinator Scheduling", avatar: initials("Shriyans Chaudhari") },
      ],
      members: [],
    },
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

  const MemberCard = ({ member, color }: { member: Member; color: string }) => (
    <motion.div
      key={member.name}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-semibold"
          style={{ backgroundColor: color, fontSize: "13px" }}
        >
          {member.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold" style={{ fontSize: "15px" }}>{member.name}</h4>
          <p className="text-[#FE5A00] mt-0.5" style={{ fontSize: "12px" }}>{member.role}</p>
          {(member.phone || member.email) && (
            <div className="space-y-1 mt-2">
              {member.phone && (
                <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                  <Phone className="w-3.5 h-3.5" />{member.phone}
                </a>
              )}
              {member.email && (
                <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                  <Mail className="w-3.5 h-3.5" />{member.email}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const selectedCommittee = committees.find(c => c.id === selectedDept);
  const deptColor = selectedCommittee?.color ?? "#FE5A00";

  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-black/5 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => selectedDept ? setSelectedDept(null) : onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold" style={{ fontSize: "22px" }}>
              {selectedDept ? selectedCommittee?.name : "Team Directory"}
            </h1>
          </div>
          <ProfileDropdown onNavigate={onNavigate} />
        </div>
      </div>

      {/* Committee Selection */}
      {!selectedDept && (
        <motion.div variants={container} initial="hidden" animate="show" className="px-4 py-6">
          <div className="mb-6">
            <h2 className="font-semibold mb-1" style={{ fontSize: "18px" }}>Select Committee</h2>
            <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>View team members by department</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {committees.map((committee) => {
              const Icon = committee.icon;
              const deptData = teamData[committee.id];
              const totalMembers = deptData
                ? deptData.ccHeads.length + deptData.hods.length + deptData.coordinators.length + deptData.members.length
                : 0;
              return (
                <motion.button
                  key={committee.id}
                  variants={item}
                  onClick={() => setSelectedDept(committee.id)}
                  className="bg-white rounded-2xl p-4 text-left border-2 border-transparent hover:border-[#FE5A00] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${committee.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: committee.color }} />
                  </div>
                  <h3 className="font-semibold mb-1" style={{ fontSize: "15px" }}>{committee.name}</h3>
                  <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>{totalMembers} members</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Committee Detail */}
      {selectedDept && teamData[selectedDept] && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 py-6 space-y-6">

          {teamData[selectedDept].ccHeads.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5" style={{ color: deptColor }} />
                <h3 className="font-semibold" style={{ fontSize: "16px" }}>Leadership</h3>
                <span className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>({teamData[selectedDept].ccHeads.length})</span>
              </div>
              <div className="space-y-3">
                {teamData[selectedDept].ccHeads.map((m) => <MemberCard key={m.name} member={m} color={deptColor} />)}
              </div>
            </div>
          )}

          {teamData[selectedDept].hods.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-[#FE5A00]" />
                <h3 className="font-semibold" style={{ fontSize: "16px" }}>HODs</h3>
                <span className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>({teamData[selectedDept].hods.length})</span>
              </div>
              <div className="space-y-3">
                {teamData[selectedDept].hods.map((m) => <MemberCard key={m.name} member={m} color="#FE5A00" />)}
              </div>
            </div>
          )}

          {teamData[selectedDept].coordinators.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <UserCircle className="w-5 h-5 text-[#8B5CF6]" />
                <h3 className="font-semibold" style={{ fontSize: "16px" }}>Coordinators</h3>
                <span className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>({teamData[selectedDept].coordinators.length})</span>
              </div>
              <div className="space-y-3">
                {teamData[selectedDept].coordinators.map((m) => <MemberCard key={m.name} member={m} color="#8B5CF6" />)}
              </div>
            </div>
          )}

          {teamData[selectedDept].members.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#6B6B6B]" />
                <h3 className="font-semibold" style={{ fontSize: "16px" }}>Members</h3>
                <span className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>({teamData[selectedDept].members.length})</span>
              </div>
              <div className="space-y-3">
                {teamData[selectedDept].members.map((m) => <MemberCard key={m.name} member={m} color="#6B6B6B" />)}
              </div>
            </div>
          )}

        </motion.div>
      )}

      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}
