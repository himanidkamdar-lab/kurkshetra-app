import { useState } from "react";
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
      {currentScreen === "messages" && <ChatListScreen onNavigate={handleNavigate} onOpenChat={handleOpenChat} />}
      {currentScreen === "chat-detail" && <ChatDetailScreen onNavigate={handleNavigate} headId={selectedHeadId} />}
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