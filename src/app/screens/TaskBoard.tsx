import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter, Plus, ArrowLeft, AlertCircle, Clock, CheckCircle2, X, Edit2, Trash2 } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface Task {
  title: string;
  assignee: string;
  deadline: string;
  description: string;
}

export default function TaskBoard({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<{ task: Task; columnType: "urgent" | "inProgress" | "completed"; index: number } | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskStatus, setTaskStatus] = useState<"urgent" | "inProgress" | "completed">("urgent");

  const [urgentTasks, setUrgentTasks] = useState<Task[]>([
    {
      title: "Setup main entrance checkpoint",
      assignee: "RM",
      deadline: "Today 5PM",
      description: "Install barriers and signage",
    },
    {
      title: "Verify volunteer credentials",
      assignee: "RM",
      deadline: "Today 7PM",
      description: "Check IDs and access cards",
    },
    {
      title: "Emergency protocol briefing",
      assignee: "RM",
      deadline: "Tomorrow 9AM",
      description: "Brief all security staff",
    },
  ]);

  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([
    {
      title: "Coordinate with event team",
      assignee: "RM",
      deadline: "Apr 18",
      description: "Align on stage security",
    },
    {
      title: "Update duty roster",
      assignee: "RM",
      deadline: "Apr 19",
      description: "Assign shifts for weekend",
    },
    {
      title: "Equipment inventory check",
      assignee: "RM",
      deadline: "Apr 20",
      description: "Verify walkie talkies stock",
    },
  ]);

  const [completedTasks, setCompletedTasks] = useState<Task[]>([
    {
      title: "Complete security audit",
      assignee: "RM",
      deadline: "Apr 10",
      description: "Campus perimeter check",
    },
    {
      title: "Training session conducted",
      assignee: "RM",
      deadline: "Apr 12",
      description: "New volunteer orientation",
    },
  ]);

  const handleAddTask = () => {
    if (!taskTitle.trim() || !taskDeadline.trim()) return;

    const newTask: Task = {
      title: taskTitle,
      assignee: "RM", // Current user
      deadline: taskDeadline,
      description: taskDescription,
    };

    // Add to appropriate column based on status
    if (taskStatus === "urgent") {
      setUrgentTasks([...urgentTasks, newTask]);
    } else if (taskStatus === "inProgress") {
      setInProgressTasks([...inProgressTasks, newTask]);
    } else if (taskStatus === "completed") {
      setCompletedTasks([...completedTasks, newTask]);
    }

    // Reset form and close modal
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline("");
    setTaskStatus("urgent");
    setShowNewTaskModal(false);
  };

  const handleEditTask = () => {
    if (!taskTitle.trim() || !taskDeadline.trim() || !editingTask) return;

    const updatedTask: Task = {
      title: taskTitle,
      assignee: "RM",
      deadline: taskDeadline,
      description: taskDescription,
    };

    // Remove from old column
    if (editingTask.columnType === "urgent") {
      const newUrgentTasks = urgentTasks.filter((_, i) => i !== editingTask.index);
      setUrgentTasks(newUrgentTasks);
    } else if (editingTask.columnType === "inProgress") {
      const newInProgressTasks = inProgressTasks.filter((_, i) => i !== editingTask.index);
      setInProgressTasks(newInProgressTasks);
    } else if (editingTask.columnType === "completed") {
      const newCompletedTasks = completedTasks.filter((_, i) => i !== editingTask.index);
      setCompletedTasks(newCompletedTasks);
    }

    // Add to new column based on status
    if (taskStatus === "urgent") {
      setUrgentTasks([...urgentTasks.filter((_, i) => editingTask.columnType !== "urgent" || i !== editingTask.index), updatedTask]);
    } else if (taskStatus === "inProgress") {
      setInProgressTasks([...inProgressTasks.filter((_, i) => editingTask.columnType !== "inProgress" || i !== editingTask.index), updatedTask]);
    } else if (taskStatus === "completed") {
      setCompletedTasks([...completedTasks.filter((_, i) => editingTask.columnType !== "completed" || i !== editingTask.index), updatedTask]);
    }

    // Reset form and close modal
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline("");
    setTaskStatus("urgent");
    setShowNewTaskModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (columnType: "urgent" | "inProgress" | "completed", index: number) => {
    if (columnType === "urgent") {
      const newUrgentTasks = [...urgentTasks];
      newUrgentTasks.splice(index, 1);
      setUrgentTasks(newUrgentTasks);
    } else if (columnType === "inProgress") {
      const newInProgressTasks = [...inProgressTasks];
      newInProgressTasks.splice(index, 1);
      setInProgressTasks(newInProgressTasks);
    } else if (columnType === "completed") {
      const newCompletedTasks = [...completedTasks];
      newCompletedTasks.splice(index, 1);
      setCompletedTasks(newCompletedTasks);
    }
  };

  const renderTaskCard = (task: Task, color: string, columnType: "urgent" | "inProgress" | "completed", index: number) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 border-l-4 mb-3"
      style={{ borderLeftColor: color }}
    >
      <h4 className="font-semibold mb-2" style={{ fontSize: "15px" }}>
        {task.title}
      </h4>
      <p className="text-[#6B6B6B] mb-3" style={{ fontSize: "12px" }}>
        {task.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="w-7 h-7 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-semibold" 
            style={{ fontSize: "11px" }}
          >
            {task.assignee}
          </div>
          <span className="text-[#6B6B6B]" style={{ fontSize: "12px" }}>
            {task.deadline}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditingTask({ task, columnType, index });
              setTaskTitle(task.title);
              setTaskDescription(task.description);
              setTaskDeadline(task.deadline);
              setTaskStatus(columnType);
              setShowNewTaskModal(true);
            }}
            className="w-5 h-5 text-[#6B6B6B] hover:text-[#FE5A00] transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteTask(columnType, index)}
            className="w-5 h-5 text-[#6B6B6B] hover:text-[#EF4444] transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24">
      {/* Header */}
      <div className="bg-white px-4 md:px-6 py-4 border-b border-black/5">
        <div className="flex items-center gap-4 mb-4 max-w-6xl mx-auto">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold flex-1" style={{ fontSize: "22px" }}>
            Security Tasks
          </h1>
          <button>
            <Filter className="w-6 h-6 text-[#6B6B6B]" />
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => setShowNewTaskModal(true)}
            className="w-full bg-[#FE5A00] text-white font-semibold rounded-xl flex items-center justify-center gap-2 py-3 hover:bg-[#FE5A00]/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span style={{ fontSize: "15px" }}>New Task</span>
          </button>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          
          {/* Column 1: Urgent Tasks (Red/Orange) */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-[#EF4444]" />
              <h3 className="font-semibold" style={{ fontSize: "16px" }}>
                Upcoming Tasks
              </h3>
              <span className="ml-auto w-6 h-6 rounded-full bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center font-semibold" style={{ fontSize: "12px" }}>
                {urgentTasks.length}
              </span>
            </div>
            <div>
              {urgentTasks.map((task, index) => (
                <div key={index}>
                  {renderTaskCard(task, "#EF4444", "urgent", index)}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: In Progress Tasks (Yellow) */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="font-semibold" style={{ fontSize: "16px" }}>
                In Progress
              </h3>
              <span className="ml-auto w-6 h-6 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center font-semibold" style={{ fontSize: "12px" }}>
                {inProgressTasks.length}
              </span>
            </div>
            <div>
              {inProgressTasks.map((task, index) => (
                <div key={index}>
                  {renderTaskCard(task, "#F59E0B", "inProgress", index)}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Completed Tasks (Green) */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
              <h3 className="font-semibold" style={{ fontSize: "16px" }}>
                Completed
              </h3>
              <span className="ml-auto w-6 h-6 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center font-semibold" style={{ fontSize: "12px" }}>
                {completedTasks.length}
              </span>
            </div>
            <div>
              {completedTasks.map((task, index) => (
                <div key={index}>
                  {renderTaskCard(task, "#10B981", "completed", index)}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* New Task Modal */}
      <AnimatePresence>
        {showNewTaskModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowNewTaskModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-2xl p-6 z-50 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold" style={{ fontSize: "20px" }}>
                  {editingTask ? "Edit Task" : "Create New Task"}
                </h2>
                <button
                  onClick={() => {
                    setShowNewTaskModal(false);
                    setEditingTask(null);
                    setTaskTitle("");
                    setTaskDescription("");
                    setTaskDeadline("");
                    setTaskStatus("urgent");
                  }}
                  className="w-8 h-8 rounded-full bg-[#F5F3F0] flex items-center justify-center hover:bg-[#E5E3E0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Task Title */}
                <div>
                  <label className="block font-semibold mb-2" style={{ fontSize: "14px" }}>
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="e.g., Setup security checkpoint"
                    className="w-full px-4 py-3 bg-[#F5F3F0] rounded-xl border-2 border-transparent focus:border-[#FE5A00] focus:outline-none transition-colors"
                    style={{ fontSize: "15px" }}
                  />
                </div>

                {/* Task Description */}
                <div>
                  <label className="block font-semibold mb-2" style={{ fontSize: "14px" }}>
                    Description
                  </label>
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Add task details..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#F5F3F0] rounded-xl border-2 border-transparent focus:border-[#FE5A00] focus:outline-none resize-none transition-colors"
                    style={{ fontSize: "14px" }}
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block font-semibold mb-2" style={{ fontSize: "14px" }}>
                    Deadline *
                  </label>
                  <input
                    type="text"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                    placeholder="e.g., Today 5PM, Apr 20, Tomorrow"
                    className="w-full px-4 py-3 bg-[#F5F3F0] rounded-xl border-2 border-transparent focus:border-[#FE5A00] focus:outline-none transition-colors"
                    style={{ fontSize: "15px" }}
                  />
                </div>

                {/* Status Selection */}
                <div>
                  <label className="block font-semibold mb-3" style={{ fontSize: "14px" }}>
                    Status
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTaskStatus("urgent")}
                      className={
                        taskStatus === "urgent"
                          ? "py-3 px-4 rounded-xl border-2 transition-all border-[#EF4444] bg-[#EF4444]/10"
                          : "py-3 px-4 rounded-xl border-2 transition-all border-[#E5E3E0] bg-white hover:border-[#EF4444]/50"
                      }
                    >
                      <AlertCircle className={taskStatus === "urgent" ? "w-5 h-5 mx-auto mb-1 text-[#EF4444]" : "w-5 h-5 mx-auto mb-1 text-[#6B6B6B]"} />
                      <p className={taskStatus === "urgent" ? "font-semibold text-[#EF4444]" : "font-semibold text-[#6B6B6B]"} style={{ fontSize: "12px" }}>
                        Urgent
                      </p>
                    </button>

                    <button
                      onClick={() => setTaskStatus("inProgress")}
                      className={
                        taskStatus === "inProgress"
                          ? "py-3 px-4 rounded-xl border-2 transition-all border-[#F59E0B] bg-[#F59E0B]/10"
                          : "py-3 px-4 rounded-xl border-2 transition-all border-[#E5E3E0] bg-white hover:border-[#F59E0B]/50"
                      }
                    >
                      <Clock className={taskStatus === "inProgress" ? "w-5 h-5 mx-auto mb-1 text-[#F59E0B]" : "w-5 h-5 mx-auto mb-1 text-[#6B6B6B]"} />
                      <p className={taskStatus === "inProgress" ? "font-semibold text-[#F59E0B]" : "font-semibold text-[#6B6B6B]"} style={{ fontSize: "12px" }}>
                        In Progress
                      </p>
                    </button>

                    <button
                      onClick={() => setTaskStatus("completed")}
                      className={
                        taskStatus === "completed"
                          ? "py-3 px-4 rounded-xl border-2 transition-all border-[#10B981] bg-[#10B981]/10"
                          : "py-3 px-4 rounded-xl border-2 transition-all border-[#E5E3E0] bg-white hover:border-[#10B981]/50"
                      }
                    >
                      <CheckCircle2 className={taskStatus === "completed" ? "w-5 h-5 mx-auto mb-1 text-[#10B981]" : "w-5 h-5 mx-auto mb-1 text-[#6B6B6B]"} />
                      <p className={taskStatus === "completed" ? "font-semibold text-[#10B981]" : "font-semibold text-[#6B6B6B]"} style={{ fontSize: "12px" }}>
                        Completed
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNewTaskModal(false)}
                  className="flex-1 py-3 bg-[#F5F3F0] text-black font-semibold rounded-xl hover:bg-[#E5E3E0] transition-colors"
                  style={{ fontSize: "15px" }}
                >
                  Cancel
                </button>
                <button
                  onClick={editingTask ? handleEditTask : handleAddTask}
                  disabled={!taskTitle.trim() || !taskDeadline.trim()}
                  className="flex-1 py-3 bg-[#FE5A00] text-white font-semibold rounded-xl hover:bg-[#FE5A00]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: "15px" }}
                >
                  {editingTask ? "Save Changes" : "Add Task"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav active="tasks" onNavigate={onNavigate} />
    </div>
  );
}