import { Home, CheckSquare, MessageCircle, ClipboardCheck, Users } from "lucide-react";

interface BottomNavProps {
  active: "home" | "tasks" | "channels" | "requests" | "committees" | "more" | "approvals";
  onNavigate: (screen: string) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const items = [
    { id: "home", label: "Home", icon: Home, screen: "dashboard" },
    { id: "tasks", label: "Tasks", icon: CheckSquare, screen: "tasks" },
    { id: "channels", label: "Channels", icon: MessageCircle, screen: "channels" },
    { id: "requests", label: "Requests", icon: ClipboardCheck, screen: "equipment-request" },
    { id: "committees", label: "Repository", icon: Users, screen: "committees" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-4 pb-6 pt-3" style={{ width: 375 }}>
      <div className="flex items-center justify-between">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              className="flex flex-col items-center gap-1 min-w-[60px]"
            >
              <Icon
                className={`w-6 h-6 ${isActive ? "text-[#FE5A00]" : "text-[#6B6B6B]"}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`${isActive ? "text-[#FE5A00] font-semibold" : "text-[#6B6B6B]"}`}
                style={{ fontSize: "11px" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}