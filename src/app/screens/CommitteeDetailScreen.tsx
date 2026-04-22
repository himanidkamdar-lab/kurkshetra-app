import { motion } from "motion/react";
import {
  ArrowLeft,
  Shield,
  DollarSign,
  Megaphone,
  Users,
  Palette,
  Utensils,
  Code,
  Package2,
  TrendingUp,
  FileText,
  Download,
  ExternalLink,
  Clock,
  MapPin,
  Building2,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { ProfileDropdown } from "../components/ProfileDropdown";

interface CommitteeDetailScreenProps {
  committeeId: string;
  onNavigate: (screen: string) => void;
}

export default function CommitteeDetailScreen({ committeeId, onNavigate }: CommitteeDetailScreenProps) {
  const committeeData: Record<string, any> = {
    security: {
      name: "Security",
      icon: Shield,
      color: "#FE5A00",
      gradient: "from-[#FE5A00] to-[#FF7A2F]",
      description: "Campus safety & crowd management",
      resources: [
        {
          title: "Security Shift Schedule",
          description: "Complete roster for all security shifts during the festival",
          type: "PDF",
          size: "2.3 MB",
          icon: Clock,
        },
        {
          title: "Participating Colleges List",
          description: "List of all colleges attending Kurukshetra 2027",
          type: "Excel",
          size: "156 KB",
          icon: Building2,
        },
        {
          title: "Emergency Protocols",
          description: "Standard operating procedures for emergencies",
          type: "PDF",
          size: "1.8 MB",
          icon: FileText,
        },
        {
          title: "Venue Map & Checkpoints",
          description: "Campus map with all security checkpoints marked",
          type: "PDF",
          size: "3.2 MB",
          icon: MapPin,
        },
      ],
      quickInfo: [
        { label: "Total Shifts", value: "48" },
        { label: "Checkpoints", value: "12" },
        { label: "Expected Visitors", value: "5000+" },
      ],
    },
    sponsorship: {
      name: "Sponsorship",
      icon: DollarSign,
      color: "#10B981",
      gradient: "from-[#10B981] to-[#34D399]",
      description: "Funding & partnerships",
      resources: [
        {
          title: "Past Sponsors Database",
          description: "Complete list of sponsors from previous editions",
          type: "Excel",
          size: "245 KB",
          icon: Building2,
        },
        {
          title: "Sponsorship Pitch Deck",
          description: "Official presentation for potential sponsors",
          type: "PDF",
          size: "4.5 MB",
          icon: FileText,
        },
        {
          title: "Sponsorship Tiers & Packages",
          description: "Different sponsorship levels and benefits",
          type: "PDF",
          size: "1.2 MB",
          icon: DollarSign,
        },
        {
          title: "Contact Templates",
          description: "Email templates for sponsor outreach",
          type: "Word",
          size: "98 KB",
          icon: FileText,
        },
      ],
      quickInfo: [
        { label: "Target Amount", value: "₹25L" },
        { label: "Past Sponsors", value: "42" },
        { label: "Active Leads", value: "28" },
      ],
    },
    pr: {
      name: "Public Relations",
      icon: Megaphone,
      color: "#8B5CF6",
      gradient: "from-[#8B5CF6] to-[#A78BFA]",
      description: "Media & communications",
      resources: [
        {
          title: "Brand Guidelines",
          description: "Official Kurukshetra brand identity guidelines",
          type: "PDF",
          size: "5.6 MB",
          icon: Palette,
        },
        {
          title: "Social Media Content Calendar",
          description: "Planned posts and content schedule",
          type: "Excel",
          size: "178 KB",
          icon: FileText,
        },
        {
          title: "Social Media Rules & Guidelines",
          description: "Dos and don'ts for all social media platforms",
          type: "PDF",
          size: "890 KB",
          icon: FileText,
        },
        {
          title: "Press Release Templates",
          description: "Ready-to-use press release formats",
          type: "Word",
          size: "124 KB",
          icon: FileText,
        },
        {
          title: "Media Contact List",
          description: "Journalists and media outlet contacts",
          type: "Excel",
          size: "67 KB",
          icon: Building2,
        },
      ],
      socialMedia: [
        { platform: "Instagram", handle: "@kurukshetra.flame", icon: Instagram, color: "#E4405F" },
        { platform: "Facebook", handle: "Kurukshetra FLAME", icon: Facebook, color: "#1877F2" },
        { platform: "Twitter", handle: "@KurukshetraFest", icon: Twitter, color: "#1DA1F2" },
        { platform: "LinkedIn", handle: "Kurukshetra Festival", icon: Linkedin, color: "#0A66C2" },
      ],
      quickInfo: [
        { label: "Total Reach", value: "50K+" },
        { label: "Media Partners", value: "15" },
        { label: "Press Coverage", value: "8" },
      ],
    },
    design: {
      name: "Design",
      icon: Palette,
      color: "#3B82F6",
      gradient: "from-[#3B82F6] to-[#60A5FA]",
      description: "Visual identity & creatives",
      resources: [
        {
          title: "Color Palette Guide",
          description: "Official Kurukshetra color palette with hex codes",
          type: "PDF",
          size: "1.1 MB",
          icon: Palette,
        },
        {
          title: "Logo Pack (All Formats)",
          description: "SVG, PNG, AI files of official logos",
          type: "ZIP",
          size: "8.4 MB",
          icon: FileText,
        },
        {
          title: "Typography Guidelines",
          description: "Font usage and hierarchy rules",
          type: "PDF",
          size: "2.3 MB",
          icon: FileText,
        },
        {
          title: "Social Media Templates",
          description: "Ready-to-use Instagram, Facebook post templates",
          type: "PSD",
          size: "12.5 MB",
          icon: FileText,
        },
        {
          title: "Poster Design Assets",
          description: "Stock photos, illustrations, and design elements",
          type: "ZIP",
          size: "45.2 MB",
          icon: FileText,
        },
      ],
      colorPalette: [
        { name: "Flame Orange", hex: "#FE5A00" },
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#FFFFFF" },
        { name: "Accent Purple", hex: "#8B5CF6" },
        { name: "Accent Green", hex: "#10B981" },
      ],
      quickInfo: [
        { label: "Design Requests", value: "156" },
        { label: "Completed", value: "142" },
        { label: "In Progress", value: "14" },
      ],
    },
    hospitality: {
      name: "Hospitality",
      icon: Users,
      color: "#EC4899",
      gradient: "from-[#EC4899] to-[#F472B6]",
      description: "Guest management & comfort",
      resources: [
        {
          title: "Guest List & Contact Info",
          description: "VIP guests, judges, and performers list",
          type: "Excel",
          size: "234 KB",
          icon: Users,
        },
        {
          title: "Accommodation Details",
          description: "Hotel bookings and room assignments",
          type: "PDF",
          size: "1.5 MB",
          icon: Building2,
        },
        {
          title: "Travel Itinerary",
          description: "Pickup schedules and travel arrangements",
          type: "Excel",
          size: "189 KB",
          icon: MapPin,
        },
        {
          title: "Welcome Kit Checklist",
          description: "Items to be included in guest welcome kits",
          type: "PDF",
          size: "567 KB",
          icon: FileText,
        },
      ],
      quickInfo: [
        { label: "VIP Guests", value: "45" },
        { label: "Rooms Booked", value: "32" },
        { label: "Transport Arranged", value: "18" },
      ],
    },
    tech: {
      name: "Tech",
      icon: Code,
      color: "#6366F1",
      gradient: "from-[#6366F1] to-[#818CF8]",
      description: "Platform & technical support",
      resources: [
        {
          title: "Platform User Guide",
          description: "Complete guide to using Kurukshetra platform",
          type: "PDF",
          size: "3.4 MB",
          icon: FileText,
        },
        {
          title: "Technical Specifications",
          description: "Hardware and software requirements",
          type: "PDF",
          size: "1.2 MB",
          icon: Code,
        },
        {
          title: "API Documentation",
          description: "For external integrations and custom tools",
          type: "PDF",
          size: "2.8 MB",
          icon: FileText,
        },
        {
          title: "Troubleshooting Guide",
          description: "Common issues and their solutions",
          type: "PDF",
          size: "1.9 MB",
          icon: FileText,
        },
      ],
      quickInfo: [
        { label: "Active Users", value: "580" },
        { label: "Uptime", value: "99.8%" },
        { label: "Support Tickets", value: "12" },
      ],
    },
    marketing: {
      name: "Marketing",
      icon: TrendingUp,
      color: "#F59E0B",
      gradient: "from-[#F59E0B] to-[#FBBF24]",
      description: "Promotions & outreach",
      resources: [
        {
          title: "Marketing Strategy Document",
          description: "Overall marketing plan and timeline",
          type: "PDF",
          size: "4.2 MB",
          icon: TrendingUp,
        },
        {
          title: "Campus Ambassador List",
          description: "Contact details of ambassadors from other colleges",
          type: "Excel",
          size: "145 KB",
          icon: Users,
        },
        {
          title: "Promotional Material",
          description: "Brochures, flyers, and handout templates",
          type: "ZIP",
          size: "15.3 MB",
          icon: FileText,
        },
        {
          title: "Email Campaign Templates",
          description: "Pre-designed email templates for campaigns",
          type: "HTML",
          size: "456 KB",
          icon: FileText,
        },
      ],
      quickInfo: [
        { label: "Campus Reach", value: "85" },
        { label: "Registrations", value: "3.2K" },
        { label: "Social Reach", value: "50K+" },
      ],
    },
    logistics: {
      name: "Logistics",
      icon: Package2,
      color: "#14B8A6",
      gradient: "from-[#14B8A6] to-[#2DD4BF]",
      description: "Equipment & operations",
      resources: [
        {
          title: "Equipment Inventory",
          description: "Complete list of available equipment",
          type: "Excel",
          size: "298 KB",
          icon: Package2,
        },
        {
          title: "Vendor Contact List",
          description: "Suppliers and rental service providers",
          type: "Excel",
          size: "167 KB",
          icon: Building2,
        },
        {
          title: "Setup & Teardown Schedule",
          description: "Timeline for venue setup and breakdown",
          type: "PDF",
          size: "1.7 MB",
          icon: Clock,
        },
        {
          title: "Transportation Plan",
          description: "Vehicle assignments and route maps",
          type: "PDF",
          size: "2.4 MB",
          icon: MapPin,
        },
      ],
      quickInfo: [
        { label: "Total Equipment", value: "450+" },
        { label: "Vendors", value: "24" },
        { label: "Vehicles", value: "12" },
      ],
    },
    food: {
      name: "Food & Beverage",
      icon: Utensils,
      color: "#EF4444",
      gradient: "from-[#EF4444] to-[#F87171]",
      description: "Catering & refreshments",
      resources: [
        {
          title: "Menu & Catering Options",
          description: "Food options for different events and times",
          type: "PDF",
          size: "2.1 MB",
          icon: Utensils,
        },
        {
          title: "Vendor & Caterer Contracts",
          description: "Agreements with food service providers",
          type: "PDF",
          size: "3.5 MB",
          icon: Building2,
        },
        {
          title: "Dietary Requirements List",
          description: "Special dietary needs and allergies",
          type: "Excel",
          size: "78 KB",
          icon: FileText,
        },
        {
          title: "Food Safety Guidelines",
          description: "Health and safety protocols for food handling",
          type: "PDF",
          size: "1.4 MB",
          icon: FileText,
        },
      ],
      quickInfo: [
        { label: "Meals/Day", value: "2000+" },
        { label: "Caterers", value: "8" },
        { label: "Food Stalls", value: "15" },
      ],
    },
  };

  const committee = committeeData[committeeId];
  const Icon = committee.icon;

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
      {/* Header with Gradient */}
      <div className={`bg-gradient-to-br ${committee.gradient} text-white px-6 py-6 relative`}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => onNavigate("committees")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="relative z-50">
            <ProfileDropdown onNavigate={onNavigate} />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center border-2 border-white/30">
            <Icon className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h1 className="font-semibold mb-1" style={{ fontSize: "24px" }}>
              {committee.name}
            </h1>
            <p className="opacity-90" style={{ fontSize: "14px" }}>
              {committee.description}
            </p>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-3 gap-3">
          {committee.quickInfo.map((info: any, index: number) => (
            <div key={index} className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
              <p className="font-bold mb-1" style={{ fontSize: "18px" }}>
                {info.value}
              </p>
              <p className="opacity-90" style={{ fontSize: "11px" }}>
                {info.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette (Design Committee Only) */}
      {committeeId === "design" && committee.colorPalette && (
        <div className="px-6 py-6 bg-white border-b border-black/5">
          <h2 className="font-semibold mb-3" style={{ fontSize: "18px" }}>
            Official Color Palette
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {committee.colorPalette.map((color: any, index: number) => (
              <div key={index} className="flex-shrink-0">
                <div
                  className="w-20 h-20 rounded-xl mb-2 border-2 border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="font-semibold text-center" style={{ fontSize: "12px" }}>
                  {color.name}
                </p>
                <p className="text-[#6B6B6B] text-center" style={{ fontSize: "11px" }}>
                  {color.hex}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Media Links (PR Committee Only) */}
      {committeeId === "pr" && committee.socialMedia && (
        <div className="px-6 py-6 bg-white border-b border-black/5">
          <h2 className="font-semibold mb-3" style={{ fontSize: "18px" }}>
            Official Social Media
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {committee.socialMedia.map((social: any, index: number) => {
              const SocialIcon = social.icon;
              return (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-3 p-4 bg-[#F5F3F0] rounded-xl hover:bg-[#E5E3E0] transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: social.color }}
                  >
                    <SocialIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold" style={{ fontSize: "13px" }}>
                      {social.platform}
                    </p>
                    <p className="text-[#6B6B6B] truncate" style={{ fontSize: "12px" }}>
                      {social.handle}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#6B6B6B]" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Resources Section */}
      <motion.div variants={container} initial="hidden" animate="show" className="px-6 py-6">
        <h2 className="font-semibold mb-4" style={{ fontSize: "18px" }}>
          Resources & Documents
        </h2>

        <div className="space-y-3">
          {committee.resources.map((resource: any, index: number) => {
            const ResourceIcon = resource.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="w-full bg-white rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${committee.color}15` }}
                  >
                    <ResourceIcon className="w-6 h-6" style={{ color: committee.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold" style={{ fontSize: "15px" }}>
                        {resource.title}
                      </h3>
                      <span
                        className="px-2 py-1 rounded-md bg-[#F5F3F0] text-[#6B6B6B] font-semibold flex-shrink-0"
                        style={{ fontSize: "10px" }}
                      >
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                        {resource.size}
                      </p>
                      <button
                        className="flex items-center gap-1.5 text-[#FE5A00] font-semibold hover:gap-2 transition-all"
                        style={{ fontSize: "13px" }}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Need Help Section */}
        <motion.div
          variants={item}
          className="mt-6 bg-gradient-to-br from-[#6B6B6B] to-[#4B4B4B] rounded-2xl p-6 text-white"
        >
          <h3 className="font-semibold mb-2" style={{ fontSize: "16px" }}>
            Need More Resources?
          </h3>
          <p className="opacity-90 mb-4" style={{ fontSize: "14px" }}>
            Contact your HOD or CC Head for additional documents and support.
          </p>
          <button
            onClick={() => onNavigate("team-directory")}
            className="w-full bg-white text-[#6B6B6B] font-semibold rounded-xl flex items-center justify-center gap-2"
            style={{ fontSize: "14px", height: "44px" }}
          >
            <Users className="w-4 h-4" />
            View Team Directory
          </button>
        </motion.div>
      </motion.div>

      <BottomNav active="committees" onNavigate={onNavigate} />
    </div>
  );
}