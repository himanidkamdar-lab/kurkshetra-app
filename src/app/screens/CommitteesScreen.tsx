import { motion } from "motion/react";
import { Shield, DollarSign, Megaphone, Users, Palette, Utensils, Code, Package2, TrendingUp, ChevronRight, ArrowLeft } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { 
  StickFigureWithFlame, 
  StickFigureReading, 
  StickFigureWithClipboard, 
  StickFigureWalking, 
  StickFigureGroup 
} from "../components/StickIllustrations";

interface CommitteesScreenProps {
  onNavigate: (screen: string, committeeId?: string) => void;
}

export default function CommitteesScreen({ onNavigate }: CommitteesScreenProps) {
  const committees = [
    {
      id: "security",
      name: "Security",
      icon: Shield,
      illustration: StickFigureWithFlame,
      members: 45,
      description: "Safety & crowd control",
    },
    {
      id: "sponsorship",
      name: "Sponsorship",
      icon: DollarSign,
      illustration: StickFigureReading,
      members: 38,
      description: "Funding & partnerships",
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: TrendingUp,
      illustration: StickFigureWalking,
      members: 42,
      description: "Promotions & outreach",
    },
    {
      id: "pr",
      name: "Public Relations",
      icon: Megaphone,
      illustration: StickFigureWithClipboard,
      members: 35,
      description: "Media & communications",
    },
    {
      id: "hospitality",
      name: "Hospitality",
      icon: Users,
      illustration: StickFigureGroup,
      members: 50,
      description: "Guest management",
    },
    {
      id: "design",
      name: "Design",
      icon: Palette,
      illustration: StickFigureReading,
      members: 32,
      description: "Visual identity",
    },
    {
      id: "tech",
      name: "Tech",
      icon: Code,
      illustration: StickFigureWithClipboard,
      members: 28,
      description: "Platform support",
    },
    {
      id: "logistics",
      name: "Logistics",
      icon: Package2,
      illustration: StickFigureWalking,
      members: 48,
      description: "Equipment & operations",
    },
    {
      id: "food",
      name: "Food & Beverage",
      icon: Utensils,
      illustration: StickFigureGroup,
      members: 40,
      description: "Catering services",
    },
  ];

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
      <div className="bg-white px-4 md:px-6 py-4 border-b border-black/5">
        <div className="flex items-center gap-4 max-w-5xl mx-auto">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold mb-1" style={{ fontSize: "22px" }}>
              Committees
            </h1>
            <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
              Explore all 9 festival committees
            </p>
          </div>
          <ProfileDropdown onNavigate={(screen) => onNavigate(screen)} />
        </div>
      </div>

      {/* Committees Grid - 2 Columns */}
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="px-4 md:px-6 py-6"
      >
        <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-5xl mx-auto">
          {committees.map((committee) => {
            const Icon = committee.icon;
            const Illustration = committee.illustration;
            return (
              <motion.button
                key={committee.id}
                variants={item}
                onClick={() => onNavigate("committee-detail", committee.id)}
                className="bg-white rounded-2xl p-4 text-left hover:shadow-md transition-all border border-black/5"
              >
                {/* Illustration */}
                <div className="mb-3 flex justify-center">
                  <Illustration className="w-16 h-16 md:w-20 md:h-20 text-[#FE5A00]" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold" style={{ fontSize: "15px" }}>
                      {committee.name}
                    </h3>
                    <Icon className="w-4 h-4 text-[#6B6B6B] flex-shrink-0" />
                  </div>

                  <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
                    {committee.description}
                  </p>

                  {/* Members count */}
                  <div className="flex items-center justify-between pt-2 border-t border-black/5">
                    <span className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>
                      {committee.members} members
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#FE5A00]" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <BottomNav active="committees" onNavigate={onNavigate} />
    </div>
  );
}