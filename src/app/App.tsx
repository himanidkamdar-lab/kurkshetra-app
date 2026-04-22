import { useState, useEffect } from "react";
import avatar1 from "../imports/image-3.png";
import avatar2 from "../imports/image-4.png";
import avatar3 from "../imports/image-5.png";
import avatar4 from "../imports/image-6.png";
import avatar5 from "../imports/image-7.png";
import avatar6 from "../imports/image-8.png";

export type ChatMessage = {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
  read: boolean;
};

export type Contact = {
  id: string;
  name: string;
  role: string;
  avatarSrc: string;
  color: string;
  online: boolean;
};

export const ALL_CONTACTS: Contact[] = [
  { id: "head-cultural",    name: "Priya Sharma",   role: "Cultural HOD",       avatarSrc: avatar1, color: "#8B5CF6", online: true  },
  { id: "head-security",    name: "Rajesh Kumar",   role: "Security CC Head",   avatarSrc: avatar2, color: "#10B981", online: true  },
  { id: "head-hospitality", name: "Ananya Verma",   role: "Hospitality HOD",    avatarSrc: avatar3, color: "#F59E0B", online: false },
  { id: "head-tech",        name: "Vikram Singh",   role: "IT & Tech HOD",      avatarSrc: avatar4, color: "#EC4899", online: false },
  { id: "head-finance",     name: "Amit Patel",     role: "Finance HOD",        avatarSrc: avatar5, color: "#3B82F6", online: true  },
  { id: "head-sports",      name: "Sneha Iyer",     role: "Sports HOD",         avatarSrc: avatar6, color: "#EF4444", online: false },
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  "head-cultural": [
    { id: "1", text: "Hey! How's the stage decoration coming along?", sender: "other", time: "2:15 PM", read: true },
    { id: "2", text: "Hi! We've completed 70% of the work. The main stage backdrop is done!", sender: "me", time: "2:18 PM", read: true },
    { id: "3", text: "That's great progress! Do you need any additional materials?", sender: "other", time: "2:20 PM", read: true },
    { id: "4", text: "Yes, we might need some extra fairy lights for the side panels.", sender: "me", time: "2:25 PM", read: true },
    { id: "5", text: "Absolutely! I'll approve the purchase request. Great work! 🎉", sender: "other", time: "2:30 PM", read: true },
  ],
  "head-security": [
    { id: "1", text: "Please check the gate assignments for tomorrow.", sender: "other", time: "1:15 PM", read: true },
  ],
};
import LoginScreen from "./screens/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import AvatarSelectionScreen from "./screens/AvatarSelectionScreen";
import DashboardMember from "./screens/DashboardMember";
import DashboardHead from "./screens/DashboardHead";
import TaskBoard from "./screens/TaskBoard";
import ChannelsScreen from "./screens/ChannelsScreen";
import ChannelChatScreen from "./screens/ChannelChatScreen";
import ApprovalForm from "./screens/ApprovalForm";
import ComponentLibrary from "./screens/ComponentLibrary";
import ChatListScreen from "./screens/ChatListScreen";
import ChatDetailScreen from "./screens/ChatDetailScreen";
import EquipmentRequestScreen from "./screens/EquipmentRequestScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MoreMenuScreen from "./screens/MoreMenuScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import TeamDirectoryScreen from "./screens/TeamDirectoryScreen";
import CommitteesScreen from "./screens/CommitteesScreen";
import CommitteeDetailScreen from "./screens/CommitteeDetailScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import RequestHistoryScreen from "./screens/RequestHistoryScreen";

type Screen =
  | "login"
  | "onboarding"
  | "avatar-selection"
  | "dashboard"
  | "dashboard-head"
  | "tasks"
  | "channels"
  | "channel-chat"
  | "approvals"
  | "components"
  | "messages"
  | "chat-detail"
  | "equipment-request"
  | "history"
  | "settings"
  | "more"
  | "notifications"
  | "team-directory"
  | "committees"
  | "committee-detail"
  | "schedule"
  | "request-history";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [userRole, setUserRole] = useState<"member" | "head">("member");
  const [selectedHeadId, setSelectedHeadId] = useState<string>("");
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>("security");
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const stored = localStorage.getItem("kuru_chat_messages");
      return stored ? JSON.parse(stored) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  useEffect(() => {
    localStorage.setItem("kuru_chat_messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleSendMessage = (contactId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: "me",
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      read: false,
    };
    setChatMessages((prev) => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMsg],
    }));
  };

  const handleLogin = (role: "member" | "head") => {
    setUserRole(role);
    setCurrentScreen("onboarding");
  };

  const handleLogout = () => {
    setCurrentScreen("login");
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen("avatar-selection");
  };

  const handleAvatarComplete = () => {
    setCurrentScreen(userRole === "head" ? "dashboard-head" : "dashboard");
  };

  const handleNavigate = (screen: string, committeeId?: string, channelId?: string) => {
    // If a committeeId is provided, save it
    if (committeeId) {
      setSelectedCommitteeId(committeeId);
    }

    // If a channelId is provided, save it
    if (channelId) {
      setSelectedChannelId(channelId);
    }

    // Map navigation strings to screen types
    const screenMap: Record<string, Screen> = {
      login: "login",
      dashboard: "dashboard",
      "dashboard-head": "dashboard-head",
      tasks: "tasks",
      channels: "channels",
      "channel-chat": "channel-chat",
      approvals: "approvals",
      components: "components",
      messages: "messages",
      "equipment-request": "equipment-request",
      history: "history",
      settings: "settings",
      more: "more",
      notifications: "notifications",
      "team-directory": "team-directory",
      committees: "committees",
      "committee-detail": "committee-detail",
      schedule: "schedule",
      "request-history": "request-history",
    };

    setCurrentScreen((screenMap[screen] as Screen) || "dashboard");
  };

  const handleOpenChat = (headId: string) => {
    setSelectedHeadId(headId);
    setCurrentScreen("chat-detail");
  };

  return (
    <div className="size-full relative bg-[#F5F3F0]">
      {/* Screen Routing */}
      {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}
      {currentScreen === "onboarding" && <OnboardingScreen onComplete={handleOnboardingComplete} />}
      {currentScreen === "avatar-selection" && <AvatarSelectionScreen onComplete={handleAvatarComplete} />}
      {currentScreen === "dashboard" && <DashboardMember onNavigate={handleNavigate} />}
      {currentScreen === "dashboard-head" && <DashboardHead onNavigate={handleNavigate} />}
      {currentScreen === "tasks" && <TaskBoard onNavigate={handleNavigate} />}
      {currentScreen === "channels" && <ChannelsScreen onNavigate={handleNavigate} />}
      {currentScreen === "channel-chat" && <ChannelChatScreen onNavigate={handleNavigate} channelId={selectedChannelId} />}
      {currentScreen === "approvals" && <ApprovalForm onNavigate={handleNavigate} />}
      {currentScreen === "components" && <ComponentLibrary onNavigate={handleNavigate} />}
      {currentScreen === "messages" && <ChatListScreen onNavigate={handleNavigate} onOpenChat={handleOpenChat} contacts={ALL_CONTACTS} chatMessages={chatMessages} />}
      {currentScreen === "chat-detail" && <ChatDetailScreen onNavigate={handleNavigate} contactId={selectedHeadId} contacts={ALL_CONTACTS} messages={chatMessages[selectedHeadId] || []} onSendMessage={handleSendMessage} />}
      {currentScreen === "equipment-request" && <EquipmentRequestScreen onNavigate={handleNavigate} />}
      {currentScreen === "history" && <HistoryScreen onNavigate={handleNavigate} />}
      {currentScreen === "settings" && <SettingsScreen onNavigate={handleNavigate} />}
      {currentScreen === "more" && <MoreMenuScreen onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentScreen === "notifications" && <NotificationsScreen onNavigate={handleNavigate} />}
      {currentScreen === "team-directory" && <TeamDirectoryScreen onNavigate={handleNavigate} />}
      {currentScreen === "committees" && <CommitteesScreen onNavigate={handleNavigate} />}
      {currentScreen === "committee-detail" && <CommitteeDetailScreen committeeId={selectedCommitteeId} onNavigate={handleNavigate} />}
      {currentScreen === "schedule" && <ScheduleScreen onNavigate={handleNavigate} />}
      {currentScreen === "request-history" && <RequestHistoryScreen onNavigate={handleNavigate} />}
    </div>
  );
}