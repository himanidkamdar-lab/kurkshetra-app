import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus, ArrowLeft, AlertCircle, Clock, CheckCircle2,
  X, Calendar, User, ChevronDown, ChevronUp, Edit2, Trash2
} from "lucide-react";
import { BottomNav } from "../components/BottomNav";

type TaskStatus = "upcoming" | "inProgress" | "completed";

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  appointedBy: string;
  status: TaskStatus;
}

const STATUS_CONFIG = {
  upcoming:   { label: "Upcoming",    color: "#EF4444", bg: "#EF444415", icon: AlertCircle },
  inProgress: { label: "In Progress", color: "#F59E0B", bg: "#F59E0B15", icon: Clock },
  completed:  { label: "Completed",   color: "#10B981", bg: "#10B98115", icon: CheckCircle2 },
};

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Setup main entrance checkpoint",  description: "Install barriers, signage, and verify volunteer positions at all three entry gates.", deadline: "Today 5PM",   appointedBy: "Rajesh Kumar",  status: "upcoming"   },
  { id: "2", title: "Verify volunteer credentials",    description: "Cross-check all volunteer ID cards against the approved list. Flag any discrepancies.", deadline: "Today 7PM",   appointedBy: "Priya Sharma",  status: "upcoming"   },
  { id: "3", title: "Emergency protocol briefing",     description: "Brief all security staff on emergency exits, crowd control, and escalation paths.", deadline: "Tomorrow 9AM", appointedBy: "Rajesh Kumar",  status: "upcoming"   },
  { id: "4", title: "Coordinate with event team",      description: "Align on stage security requirements, backstage access, and performer escort duties.", deadline: "Apr 18",      appointedBy: "Ananya Verma",  status: "inProgress" },
  { id: "5", title: "Update duty roster",              description: "Assign weekend shifts, confirm availability with all members, and publish final roster.", deadline: "Apr 19",      appointedBy: "Rajesh Kumar",  status: "inProgress" },
  { id: "6", title: "Equipment inventory check",       description: "Count and test all walkie-talkies, batons, and vests. Log any missing or damaged items.", deadline: "Apr 20",      appointedBy: "Amit Patel",    status: "inProgress" },
  { id: "7", title: "Complete security audit",         description: "Full campus perimeter walk-through. Document all vulnerabilities and corrective actions taken.", deadline: "Apr 10",      appointedBy: "Rajesh Kumar",  status: "completed"  },
  { id: "8", title: "New volunteer orientation",       description: "Conducted onboarding session for 12 new volunteers. Distributed handbooks and access cards.", deadline: "Apr 12",      appointedBy: "Priya Sharma",  status: "completed"  },
];

export default function TaskBoard({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [collapsed, setCollapsed] = useState<Record<TaskStatus, boolean>>({ upcoming: false, inProgress: false, completed: false });

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [formAppointedBy, setFormAppointedBy] = useState("");
  const [formStatus, setFormStatus] = useState<TaskStatus>("upcoming");

  const openNewForm = () => {
    setEditingTask(null);
    setFormTitle(""); setFormDesc(""); setFormDeadline(""); setFormAppointedBy(""); setFormStatus("upcoming");
    setShowForm(true);
  };

  const openEditForm = (task: Task) => {
    setSelectedTask(null);
    setEditingTask(task);
    setFormTitle(task.title); setFormDesc(task.description); setFormDeadline(task.deadline);
    setFormAppointedBy(task.appointedBy); setFormStatus(task.status);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formTitle.trim() || !formDeadline.trim()) return;
    if (editingTask) {
      setTasks(tasks.map((t) => t.id === editingTask.id
        ? { ...t, title: formTitle, description: formDesc, deadline: formDeadline, appointedBy: formAppointedBy, status: formStatus }
        : t
      ));
    } else {
      setTasks([...tasks, {
        id: Date.now().toString(), title: formTitle, description: formDesc,
        deadline: formDeadline, appointedBy: formAppointedBy, status: formStatus,
      }]);
    }
    setShowForm(false); setEditingTask(null);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
    setSelectedTask(null);
  };

  const groupedTasks = (status: TaskStatus) => tasks.filter((t) => t.status === status);

  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24">
      {/* Header */}
      <div className="bg-white px-5 py-4 border-b border-black/5 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold flex-1" style={{ fontSize: "20px" }}>My Tasks</h1>
          <button onClick={openNewForm} className="flex items-center gap-1.5 bg-[#FE5A00] text-white px-4 py-2 rounded-xl font-semibold" style={{ fontSize: "13px" }}>
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>

        {/* Summary pills */}
        <div className="flex gap-2">
          {(["upcoming", "inProgress", "completed"] as TaskStatus[]).map((s) => {
            const cfg = STATUS_CONFIG[s];
            return (
              <div key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: cfg.bg }}>
                <span className="font-bold" style={{ fontSize: "13px", color: cfg.color }}>{groupedTasks(s).length}</span>
                <span style={{ fontSize: "12px", color: cfg.color }}>{cfg.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sections */}
      <div className="px-4 py-4 space-y-4">
        {(["upcoming", "inProgress", "completed"] as TaskStatus[]).map((status) => {
          const cfg = STATUS_CONFIG[status];
          const Icon = cfg.icon;
          const group = groupedTasks(status);
          const isCollapsed = collapsed[status];

          return (
            <div key={status}>
              {/* Section header */}
              <button
                className="w-full flex items-center gap-2 mb-2"
                onClick={() => setCollapsed((prev) => ({ ...prev, [status]: !prev[status] }))}
              >
                <Icon className="w-5 h-5" style={{ color: cfg.color }} />
                <span className="font-semibold flex-1 text-left" style={{ fontSize: "16px" }}>{cfg.label}</span>
                <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold" style={{ fontSize: "12px", backgroundColor: cfg.bg, color: cfg.color }}>
                  {group.length}
                </span>
                {isCollapsed ? <ChevronDown className="w-4 h-4 text-[#6B6B6B]" /> : <ChevronUp className="w-4 h-4 text-[#6B6B6B]" />}
              </button>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    {group.length === 0 && (
                      <p className="text-[#6B6B6B] text-center py-4" style={{ fontSize: "14px" }}>No tasks here</p>
                    )}
                    {group.map((task) => (
                      <motion.button
                        key={task.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setSelectedTask(task)}
                        className="w-full bg-white rounded-2xl p-4 text-left border-l-4 shadow-sm active:scale-[0.98] transition-transform"
                        style={{ borderLeftColor: cfg.color }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold leading-snug" style={{ fontSize: "15px" }}>{task.title}</h4>
                          <span className="px-2 py-0.5 rounded-full text-white flex-shrink-0 font-semibold" style={{ fontSize: "10px", backgroundColor: cfg.color }}>
                            {cfg.label}
                          </span>
                        </div>

                        <p className="text-[#6B6B6B] mb-3 line-clamp-2" style={{ fontSize: "13px" }}>{task.description}</p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-[#6B6B6B]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span style={{ fontSize: "12px" }}>{task.deadline}</span>
                          </div>
                          {task.appointedBy && (
                            <div className="flex items-center gap-1.5 text-[#6B6B6B]">
                              <User className="w-3.5 h-3.5" />
                              <span style={{ fontSize: "12px" }}>By {task.appointedBy}</span>
                            </div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Task Detail Sheet */}
      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedTask(null)} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 pb-8"
            >
              {/* Handle */}
              <div className="w-10 h-1 bg-black/10 rounded-full mx-auto mt-3 mb-4" />

              <div className="px-6">
                {/* Status badge */}
                {(() => {
                  const cfg = STATUS_CONFIG[selectedTask.status];
                  const Icon = cfg.icon;
                  return (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: cfg.bg }}>
                        <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                        <span className="font-semibold" style={{ fontSize: "13px", color: cfg.color }}>{cfg.label}</span>
                      </div>
                    </div>
                  );
                })()}

                <h2 className="font-bold mb-3" style={{ fontSize: "20px" }}>{selectedTask.title}</h2>

                <p className="text-[#6B6B6B] mb-5 leading-relaxed" style={{ fontSize: "15px" }}>{selectedTask.description || "No description provided."}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 bg-[#F5F3F0] rounded-xl p-3">
                    <Calendar className="w-5 h-5 text-[#FE5A00]" />
                    <div>
                      <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>DEADLINE</p>
                      <p className="font-semibold" style={{ fontSize: "14px" }}>{selectedTask.deadline}</p>
                    </div>
                  </div>
                  {selectedTask.appointedBy && (
                    <div className="flex items-center gap-3 bg-[#F5F3F0] rounded-xl p-3">
                      <User className="w-5 h-5 text-[#FE5A00]" />
                      <div>
                        <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>APPOINTED BY</p>
                        <p className="font-semibold" style={{ fontSize: "14px" }}>{selectedTask.appointedBy}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => openEditForm(selectedTask)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F5F3F0] rounded-xl font-semibold" style={{ fontSize: "14px" }}>
                    <Edit2 className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => handleDelete(selectedTask.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#EF4444]/10 text-[#EF4444] rounded-xl font-semibold" style={{ fontSize: "14px" }}>
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                  <button onClick={() => setSelectedTask(null)}
                    className="w-12 h-12 flex items-center justify-center bg-[#F5F3F0] rounded-xl">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add/Edit Task Form */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowForm(false)} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 pb-8 overflow-y-auto"
              style={{ maxHeight: "90vh" }}
            >
              <div className="w-10 h-1 bg-black/10 rounded-full mx-auto mt-3 mb-4" />
              <div className="px-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold" style={{ fontSize: "20px" }}>{editingTask ? "Edit Task" : "New Task"}</h2>
                  <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-[#F5F3F0] flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1.5" style={{ fontSize: "13px" }}>Task Title *</label>
                    <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g., Setup security checkpoint"
                      className="w-full px-4 py-3 bg-[#F5F3F0] rounded-xl outline-none focus:ring-2 focus:ring-[#FE5A00]"
                      style={{ fontSize: "15px" }} />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1.5" style={{ fontSize: "13px" }}>Description</label>
                    <textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="What needs to be done..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[#F5F3F0] rounded-xl outline-none resize-none focus:ring-2 focus:ring-[#FE5A00]"
                      style={{ fontSize: "14px" }} />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1.5" style={{ fontSize: "13px" }}>Deadline *</label>
                    <input value={formDeadline} onChange={(e) => setFormDeadline(e.target.value)}
                      placeholder="e.g., Today 5PM, Apr 20"
                      className="w-full px-4 py-3 bg-[#F5F3F0] rounded-xl outline-none focus:ring-2 focus:ring-[#FE5A00]"
                      style={{ fontSize: "15px" }} />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1.5" style={{ fontSize: "13px" }}>Appointed By</label>
                    <input value={formAppointedBy} onChange={(e) => setFormAppointedBy(e.target.value)}
                      placeholder="e.g., Rajesh Kumar"
                      className="w-full px-4 py-3 bg-[#F5F3F0] rounded-xl outline-none focus:ring-2 focus:ring-[#FE5A00]"
                      style={{ fontSize: "15px" }} />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2" style={{ fontSize: "13px" }}>Status</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["upcoming", "inProgress", "completed"] as TaskStatus[]).map((s) => {
                        const cfg = STATUS_CONFIG[s];
                        const Icon = cfg.icon;
                        const active = formStatus === s;
                        return (
                          <button key={s} onClick={() => setFormStatus(s)}
                            className="py-3 px-2 rounded-xl border-2 transition-all text-center"
                            style={{ borderColor: active ? cfg.color : "#E5E3E0", backgroundColor: active ? cfg.bg : "white" }}>
                            <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: active ? cfg.color : "#6B6B6B" }} />
                            <p className="font-semibold" style={{ fontSize: "11px", color: active ? cfg.color : "#6B6B6B" }}>{cfg.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowForm(false)}
                    className="flex-1 py-3 bg-[#F5F3F0] font-semibold rounded-xl" style={{ fontSize: "15px" }}>
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={!formTitle.trim() || !formDeadline.trim()}
                    className="flex-1 py-3 bg-[#FE5A00] text-white font-semibold rounded-xl disabled:opacity-50" style={{ fontSize: "15px" }}>
                    {editingTask ? "Save Changes" : "Add Task"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav active="tasks" onNavigate={onNavigate} />
    </div>
  );
}
