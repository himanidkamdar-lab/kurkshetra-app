import { motion, AnimatePresence } from "motion/react";
import { Search, ArrowLeft, MessageSquare, PenSquare, X } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import type { Contact, ChatMessage } from "../App";

interface ChatListScreenProps {
  onNavigate: (screen: string) => void;
  onOpenChat: (contactId: string) => void;
  contacts: Contact[];
  chatMessages: Record<string, ChatMessage[]>;
}

export default function ChatListScreen({ onNavigate, onOpenChat, contacts, chatMessages }: ChatListScreenProps) {
  const [search, setSearch] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  // Build chat list from contacts that have messages, sorted by last message time
  const existingChats = contacts.filter((c) => chatMessages[c.id]?.length > 0);

  const getLastMessage = (contactId: string) => {
    const msgs = chatMessages[contactId];
    if (!msgs || msgs.length === 0) return { text: "No messages yet", time: "" };
    const last = msgs[msgs.length - 1];
    return { text: last.sender === "me" ? `You: ${last.text}` : last.text, time: last.time };
  };

  const getUnread = (contactId: string) => {
    const msgs = chatMessages[contactId] || [];
    return msgs.filter((m) => m.sender === "other" && !m.read).length;
  };

  const filteredChats = existingChats.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase())
  );

  // Contacts not yet in a chat — available for new chats
  const newChatContacts = contacts.filter((c) => !chatMessages[c.id]?.length);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="px-6 py-4 border-b border-black/5 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold flex-1" style={{ fontSize: "22px" }}>
            Messages
          </h1>
          <button
            onClick={() => setShowCompose(true)}
            className="w-10 h-10 rounded-full bg-[#FE5A00]/10 flex items-center justify-center"
          >
            <PenSquare className="w-5 h-5 text-[#FE5A00]" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F5F3F0] rounded-xl pl-12 pr-4 py-3 outline-none"
            style={{ fontSize: "16px" }}
          />
        </div>
      </div>

      {/* Chat list */}
      {filteredChats.length > 0 ? (
        <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}>
          {filteredChats.map((contact) => {
            const last = getLastMessage(contact.id);
            const unread = getUnread(contact.id);
            return (
              <motion.button
                key={contact.id}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
                onClick={() => onOpenChat(contact.id)}
                className="w-full px-6 py-4 border-b border-black/5 hover:bg-[#F5F3F0]/50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden" style={{ backgroundColor: `${contact.color}20` }}>
                      <img src={contact.avatarSrc} alt={contact.name} className="w-full h-full object-contain" style={{ mixBlendMode: "multiply" }} />
                    </div>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-semibold" style={{ fontSize: "16px" }}>{contact.name}</h3>
                        <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>{contact.role}</p>
                      </div>
                      <span className="text-[#6B6B6B] flex-shrink-0 ml-2" style={{ fontSize: "13px" }}>{last.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className={`truncate ${unread > 0 ? "text-black font-medium" : "text-[#6B6B6B]"}`} style={{ fontSize: "14px" }}>
                        {last.text}
                      </p>
                      {unread > 0 && (
                        <div className="w-6 h-6 rounded-full bg-[#FE5A00] flex items-center justify-center flex-shrink-0 ml-2">
                          <span className="text-white font-semibold" style={{ fontSize: "11px" }}>{unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      ) : (
        <div className="px-6 py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F3F0] rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-[#6B6B6B]" />
          </div>
          <p className="text-[#6B6B6B] font-semibold mb-1" style={{ fontSize: "16px" }}>No messages yet</p>
          <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>Tap the pencil icon to start a new chat</p>
        </div>
      )}

      {/* New Chat Modal */}
      <AnimatePresence>
        {showCompose && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompose(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 pb-8"
              style={{ maxHeight: "70vh" }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
                <h2 className="font-semibold" style={{ fontSize: "18px" }}>New Message</h2>
                <button onClick={() => setShowCompose(false)} className="w-8 h-8 rounded-full bg-[#F5F3F0] flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="px-6 pt-4 pb-2 text-[#6B6B6B] font-semibold uppercase" style={{ fontSize: "12px" }}>Select a contact</p>

              <div className="overflow-y-auto" style={{ maxHeight: "50vh" }}>
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => { setShowCompose(false); onOpenChat(contact.id); }}
                    className="w-full flex items-center gap-4 px-6 py-3 hover:bg-[#F5F3F0] transition-colors"
                  >
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0" style={{ backgroundColor: `${contact.color}20` }}>
                      <img src={contact.avatarSrc} alt={contact.name} className="w-full h-full object-contain" style={{ mixBlendMode: "multiply" }} />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold" style={{ fontSize: "15px" }}>{contact.name}</p>
                      <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>{contact.role}</p>
                    </div>
                    {contact.online && <div className="ml-auto w-2 h-2 rounded-full bg-[#10B981]" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav active="channels" onNavigate={onNavigate} />
    </div>
  );
}
