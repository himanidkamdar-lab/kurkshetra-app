import { motion, AnimatePresence } from "motion/react";
import { Shield, DollarSign, Megaphone, Users, Palette, Utensils, Code, Package2, TrendingUp, ChevronRight, ArrowLeft, Upload, FileText, File, Trash2, Download, X } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { useState, useRef, useCallback, useEffect } from "react";
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

interface DocFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  blobUrl?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function fileIcon(type: string) {
  if (type.includes("pdf")) return <FileText className="w-5 h-5 text-red-500" />;
  if (type.includes("image")) return <File className="w-5 h-5 text-blue-500" />;
  if (type.includes("word") || type.includes("document")) return <FileText className="w-5 h-5 text-blue-700" />;
  if (type.includes("sheet") || type.includes("excel")) return <FileText className="w-5 h-5 text-green-600" />;
  return <File className="w-5 h-5 text-[#6B6B6B]" />;
}

export default function CommitteesScreen({ onNavigate }: CommitteesScreenProps) {
  const [tab, setTab] = useState<"committees" | "documents">("committees");
  const [docs, setDocs] = useState<DocFile[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("repo-docs") ?? "[]");
    } catch { return []; }
  });
  const [dragging, setDragging] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const blobUrls = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    const meta = docs.map(({ blobUrl: _b, ...rest }) => rest);
    localStorage.setItem("repo-docs", JSON.stringify(meta));
  }, [docs]);

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files);
    const newDocs: DocFile[] = arr.map((f) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const url = URL.createObjectURL(f);
      blobUrls.current.set(id, url);
      return { id, name: f.name, size: f.size, type: f.type, uploadedAt: new Date().toISOString(), blobUrl: url };
    });
    setDocs((prev) => [...newDocs, ...prev]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleDelete = (id: string) => {
    const url = blobUrls.current.get(id);
    if (url) URL.revokeObjectURL(url);
    blobUrls.current.delete(id);
    setDocs((prev) => prev.filter((d) => d.id !== id));
    setDeleteId(null);
  };

  const committees = [
    { id: "security",     name: "Security",        icon: Shield,     illustration: StickFigureWithFlame,    members: 45, description: "Safety & crowd control" },
    { id: "sponsorship",  name: "Sponsorship",     icon: DollarSign, illustration: StickFigureReading,      members: 38, description: "Funding & partnerships" },
    { id: "marketing",    name: "Marketing",       icon: TrendingUp, illustration: StickFigureWalking,      members: 42, description: "Promotions & outreach" },
    { id: "pr",           name: "Public Relations",icon: Megaphone,  illustration: StickFigureWithClipboard,members: 35, description: "Media & communications" },
    { id: "hospitality",  name: "Hospitality",     icon: Users,      illustration: StickFigureGroup,        members: 50, description: "Guest management" },
    { id: "design",       name: "Design",          icon: Palette,    illustration: StickFigureReading,      members: 32, description: "Visual identity" },
    { id: "tech",         name: "Tech",            icon: Code,       illustration: StickFigureWithClipboard,members: 28, description: "Platform support" },
    { id: "logistics",    name: "Logistics",       icon: Package2,   illustration: StickFigureWalking,      members: 48, description: "Equipment & operations" },
    { id: "food",         name: "Food & Beverage", icon: Utensils,   illustration: StickFigureGroup,        members: 40, description: "Catering services" },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-black/5">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold mb-1" style={{ fontSize: "22px" }}>Repository</h1>
            <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>Committees & shared documents</p>
          </div>
          <ProfileDropdown onNavigate={(screen) => onNavigate(screen)} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 bg-[#F5F3F0] rounded-xl p-1">
          {(["committees", "documents"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all capitalize`}
              style={{
                fontSize: "14px",
                background: tab === t ? "white" : "transparent",
                color: tab === t ? "#FE5A00" : "#6B6B6B",
                boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Committees Tab */}
      {tab === "committees" && (
        <motion.div variants={container} initial="hidden" animate="show" className="px-4 py-6">
          <div className="grid grid-cols-2 gap-3">
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
                  <div className="mb-3 flex justify-center">
                    <Illustration className="w-16 h-16 text-[#FE5A00]" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold" style={{ fontSize: "15px" }}>{committee.name}</h3>
                      <Icon className="w-4 h-4 text-[#6B6B6B] flex-shrink-0" />
                    </div>
                    <p className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>{committee.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-black/5">
                      <span className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>{committee.members} members</span>
                      <ChevronRight className="w-4 h-4 text-[#FE5A00]" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Documents Tab */}
      {tab === "documents" && (
        <div className="px-4 py-6 space-y-4">
          {/* Upload area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 py-8 cursor-pointer transition-all"
            style={{
              borderColor: dragging ? "#FE5A00" : "#D1D1D1",
              background: dragging ? "#FFF3EC" : "white",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-[#FE5A00]/10 flex items-center justify-center">
              <Upload className="w-6 h-6 text-[#FE5A00]" />
            </div>
            <div className="text-center">
              <p className="font-semibold" style={{ fontSize: "15px" }}>
                {dragging ? "Drop files here" : "Tap to upload files"}
              </p>
              <p className="text-[#6B6B6B] mt-1" style={{ fontSize: "12px" }}>
                Or drag & drop · PDF, Word, Excel, Images
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && addFiles(e.target.files)}
            />
          </div>

          {/* File list */}
          {docs.length === 0 ? (
            <div className="text-center py-10 text-[#6B6B6B]" style={{ fontSize: "14px" }}>
              No documents yet. Upload one above.
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[#6B6B6B] font-medium" style={{ fontSize: "12px" }}>
                {docs.length} document{docs.length !== 1 ? "s" : ""}
              </p>
              {docs.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 border border-black/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F5F3F0] flex items-center justify-center flex-shrink-0">
                    {fileIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate" style={{ fontSize: "14px" }}>{doc.name}</p>
                    <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>
                      {formatBytes(doc.size)} · {formatDate(doc.uploadedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {doc.blobUrl && (
                      <a href={doc.blobUrl} download={doc.name} onClick={(e) => e.stopPropagation()}>
                        <Download className="w-4 h-4 text-[#6B6B6B]" />
                      </a>
                    )}
                    <button onClick={() => setDeleteId(doc.id)}>
                      <Trash2 className="w-4 h-4 text-[#6B6B6B]" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete confirm sheet */}
      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              style={{ width: 375 }}
              onClick={() => setDeleteId(null)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 z-50 bg-white rounded-t-3xl px-6 py-6 space-y-4"
              style={{ width: 375 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold" style={{ fontSize: "18px" }}>Delete document?</h3>
                <button onClick={() => setDeleteId(null)}><X className="w-5 h-5 text-[#6B6B6B]" /></button>
              </div>
              <p className="text-[#6B6B6B]" style={{ fontSize: "14px" }}>
                "{docs.find(d => d.id === deleteId)?.name}" will be removed from the repository.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 rounded-xl border border-black/10 font-medium"
                  style={{ fontSize: "15px" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium"
                  style={{ fontSize: "15px" }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav active="committees" onNavigate={onNavigate} />
    </div>
  );
}
