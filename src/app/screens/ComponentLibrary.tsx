import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

export default function ComponentLibrary({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-black/5 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold" style={{ fontSize: "22px" }}>
            Component Library
          </h1>
        </div>
      </div>

      <div className="px-6 space-y-8">
        {/* Buttons */}
        <Section title="Buttons">
          <div className="space-y-3">
            <button
              className="w-full bg-[#FE5A00] text-white font-semibold rounded-xl"
              style={{ fontSize: "16px", height: "52px" }}
            >
              Primary Button
            </button>
            <button
              className="w-full border-2 border-[#FE5A00] text-[#FE5A00] font-semibold rounded-xl"
              style={{ fontSize: "16px", height: "52px" }}
            >
              Secondary Button
            </button>
            <button
              className="w-full bg-[#EF4444] text-white font-semibold rounded-xl"
              style={{ fontSize: "16px", height: "52px" }}
            >
              Destructive Button
            </button>
            <button
              className="w-full bg-[#E5E5E5] text-[#6B6B6B] font-semibold rounded-xl"
              style={{ fontSize: "16px", height: "52px" }}
              disabled
            >
              Disabled Button
            </button>
          </div>
        </Section>

        {/* Input Fields */}
        <Section title="Input Fields">
          <div className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Default"
                className="w-full border-b-2 border-black/10 pb-3 outline-none"
                style={{ fontSize: "16px" }}
              />
            </div>
            <div>
              <input
                type="text"
                value="Focused state"
                className="w-full border-b-2 border-[#FE5A00] pb-3 outline-none"
                style={{ fontSize: "16px" }}
                readOnly
              />
            </div>
            <div>
              <input
                type="text"
                value="Error state"
                className="w-full border-b-2 border-[#EF4444] pb-3 outline-none"
                style={{ fontSize: "16px" }}
                readOnly
              />
              <p className="text-[#EF4444] mt-2" style={{ fontSize: "13px" }}>
                This field is required
              </p>
            </div>
            <div>
              <input
                type="text"
                value="Filled"
                className="w-full border-b-2 border-black/10 pb-3 outline-none"
                style={{ fontSize: "16px" }}
                readOnly
              />
            </div>
          </div>
        </Section>

        {/* Task Cards */}
        <Section title="Task Cards">
          <div className="space-y-3">
            {/* Compact */}
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold flex-1" style={{ fontSize: "16px" }}>
                  Task title goes here
                </p>
                <span className="px-3 py-1 bg-[#FE5A00] text-white rounded-full text-[13px] font-semibold whitespace-nowrap">
                  In Progress
                </span>
              </div>
              <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                Due: Today, 5:00 PM
              </p>
            </div>

            {/* Expanded */}
            <div className="bg-white rounded-2xl p-4 border-l-4 border-[#EF4444]">
              <p className="font-semibold mb-3" style={{ fontSize: "16px" }}>
                Expanded task with metadata
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-semibold" style={{ fontSize: "11px" }}>
                    RV
                  </div>
                  <span className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                    Due: Apr 15
                  </span>
                </div>
                <span className="px-2 py-1 bg-[#EF4444] text-white rounded font-semibold" style={{ fontSize: "11px" }}>
                  HIGH
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* Announcement Pills */}
        <Section title="Announcement Pills">
          <div className="flex flex-wrap gap-2">
            <div className="px-4 py-2 bg-[#EF4444] text-white rounded-full font-semibold" style={{ fontSize: "13px" }}>
              URGENT
            </div>
            <div className="px-4 py-2 bg-[#6B6B6B]/10 text-[#6B6B6B] rounded-full font-semibold" style={{ fontSize: "13px" }}>
              INFO
            </div>
            <div className="px-4 py-2 border-2 border-[#FE5A00] text-[#FE5A00] rounded-full font-semibold" style={{ fontSize: "13px" }}>
              UPDATE
            </div>
          </div>
        </Section>

        {/* Avatars */}
        <Section title="Avatars">
          <div className="flex items-end gap-4">
            <div className="text-center">
              <div className="w-6 h-6 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-semibold mb-1" style={{ fontSize: "10px" }}>
                XS
              </div>
              <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>24px</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-semibold mb-1" style={{ fontSize: "11px" }}>
                S
              </div>
              <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>32px</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-semibold mb-1" style={{ fontSize: "13px" }}>
                M
              </div>
              <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>40px</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-semibold mb-1" style={{ fontSize: "16px" }}>
                L
              </div>
              <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>56px</p>
            </div>
          </div>
        </Section>

        {/* Status Chips */}
        <Section title="Status Chips">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#FFF5EE] text-[#FE5A00] rounded-full font-semibold" style={{ fontSize: "13px" }}>
              To Do
            </span>
            <span className="px-3 py-1 bg-[#FE5A00] text-white rounded-full font-semibold" style={{ fontSize: "13px" }}>
              In Progress
            </span>
            <span className="px-3 py-1 bg-[#10B981] text-white rounded-full font-semibold" style={{ fontSize: "13px" }}>
              Done
            </span>
            <span className="px-3 py-1 bg-[#EF4444]/10 text-[#EF4444] rounded-full font-semibold" style={{ fontSize: "13px" }}>
              Overdue
            </span>
            <span className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full font-semibold" style={{ fontSize: "13px" }}>
              Approved
            </span>
            <span className="px-3 py-1 bg-[#EF4444]/10 text-[#EF4444] rounded-full font-semibold" style={{ fontSize: "13px" }}>
              Rejected
            </span>
            <span className="px-3 py-1 bg-[#F59E0B]/10 text-[#F59E0B] rounded-full font-semibold" style={{ fontSize: "13px" }}>
              Pending
            </span>
          </div>
        </Section>

        {/* Department Tile */}
        <Section title="Department Tile">
          <div className="bg-[#F5F3F0] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-semibold" style={{ fontSize: "16px" }}>
                  C
                </div>
                <div>
                  <p className="font-semibold" style={{ fontSize: "16px" }}>
                    Cultural
                  </p>
                  <p className="text-[#6B6B6B]" style={{ fontSize: "13px" }}>
                    45 members
                  </p>
                </div>
              </div>
              <span className="text-[#FE5A00] font-bold" style={{ fontSize: "16px" }}>
                67%
              </span>
            </div>
            <div className="h-1.5 bg-white rounded-full overflow-hidden">
              <div className="h-full bg-[#FE5A00] rounded-full" style={{ width: "67%" }} />
            </div>
          </div>
        </Section>

        {/* Approval Stepper */}
        <Section title="Approval Status Stepper">
          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center justify-between">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center text-white font-semibold mb-2">
                  ✓
                </div>
                <span className="text-[#6B6B6B] text-center" style={{ fontSize: "11px" }}>
                  Submitted
                </span>
              </div>

              {/* Line */}
              <div className="flex-1 h-0.5 bg-[#FE5A00] mx-2" />

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#FE5A00] flex items-center justify-center text-white font-semibold mb-2">
                  2
                </div>
                <span className="text-[#FE5A00] text-center font-semibold" style={{ fontSize: "11px" }}>
                  HOD Review
                </span>
              </div>

              {/* Line */}
              <div className="flex-1 h-0.5 bg-black/10 mx-2" />

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-[#6B6B6B] font-semibold mb-2">
                  3
                </div>
                <span className="text-[#6B6B6B] text-center" style={{ fontSize: "11px" }}>
                  Approved
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* Notification Row */}
        <Section title="Notification Row">
          <div className="bg-white rounded-2xl p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FE5A00]/10 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#FE5A00]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-1" style={{ fontSize: "16px" }}>
                  New task assigned
                </p>
                <p className="text-[#6B6B6B] mb-2" style={{ fontSize: "13px" }}>
                  You have been assigned to "Setup main gate"
                </p>
                <p className="text-[#6B6B6B]" style={{ fontSize: "11px" }}>
                  2 hours ago
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <BottomNav active="more" onNavigate={onNavigate} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="font-semibold mb-4" style={{ fontSize: "22px" }}>
        {title}
      </h2>
      <div className="bg-white rounded-2xl p-5">{children}</div>
    </motion.div>
  );
}