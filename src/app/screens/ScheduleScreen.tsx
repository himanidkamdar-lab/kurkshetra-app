import { motion } from "motion/react";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { useState } from "react";

interface ScheduleScreenProps {
  onNavigate: (screen: string) => void;
}

export default function ScheduleScreen({ onNavigate }: ScheduleScreenProps) {
  const [currentWeek, setCurrentWeek] = useState("April 14-20, 2026");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0); // 0=Apr, 1=May, etc.

  const months = [
    { name: 'Apr', fullName: 'April', weeks: ['April 7-13', 'April 14-20', 'April 21-27', 'April 28-30'] },
    { name: 'May', fullName: 'May', weeks: ['May 1-7', 'May 8-14', 'May 15-21', 'May 22-28'] },
    { name: 'Jun', fullName: 'June', weeks: ['June 1-7', 'June 8-14', 'June 15-21', 'June 22-28'] },
    { name: 'Jul', fullName: 'July', weeks: ['July 1-7', 'July 8-14', 'July 15-21', 'July 22-28'] },
    { name: 'Aug', fullName: 'August', weeks: ['August 1-7', 'August 8-14', 'August 15-21', 'August 22-28'] },
    { name: 'Sep', fullName: 'September', weeks: ['Sep 1-7', 'Sep 8-14', 'Sep 15-21', 'Sep 22-28'] },
    { name: 'Oct', fullName: 'October', weeks: ['Oct 1-7', 'Oct 8-14', 'Oct 15-21', 'Oct 22-28'] },
    { name: 'Nov', fullName: 'November', weeks: ['Nov 1-7', 'Nov 8-14', 'Nov 15-21', 'Nov 22-28'] },
  ];

  const handleMonthChange = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setWeekOffset(0);
    setCurrentWeek(`${months[monthIndex].weeks[0]}, 2026`);
  };

  const goToPreviousWeek = () => {
    const currentMonthData = months[selectedMonth];
    const currentWeekIndex = currentMonthData.weeks.findIndex(w => currentWeek.includes(w));
    
    if (currentWeekIndex > 0) {
      // Go to previous week in same month
      setCurrentWeek(`${currentMonthData.weeks[currentWeekIndex - 1]}, 2026`);
      setWeekOffset(weekOffset - 1);
    } else if (selectedMonth > 0) {
      // Go to last week of previous month
      const prevMonth = months[selectedMonth - 1];
      setSelectedMonth(selectedMonth - 1);
      setCurrentWeek(`${prevMonth.weeks[prevMonth.weeks.length - 1]}, 2026`);
      setWeekOffset(weekOffset - 1);
    }
  };

  const goToNextWeek = () => {
    const currentMonthData = months[selectedMonth];
    const currentWeekIndex = currentMonthData.weeks.findIndex(w => currentWeek.includes(w));
    
    if (currentWeekIndex < currentMonthData.weeks.length - 1) {
      // Go to next week in same month
      setCurrentWeek(`${currentMonthData.weeks[currentWeekIndex + 1]}, 2026`);
      setWeekOffset(weekOffset + 1);
    } else if (selectedMonth < months.length - 1) {
      // Go to first week of next month
      const nextMonth = months[selectedMonth + 1];
      setSelectedMonth(selectedMonth + 1);
      setCurrentWeek(`${nextMonth.weeks[0]}, 2026`);
      setWeekOffset(weekOffset + 1);
    }
  };

  // Get events based on selected month
  const getEventsForMonth = (monthIndex: number) => {
    const monthEvents: { [key: number]: { [key: string]: { title: string; time: string; color: string; duration?: number } } } = {
      0: { // April - Security focused
        "1-1": { title: "Team meeting", time: "10:00 AM", color: "bg-[#3B82F6]" },
        "5-2": { title: "Security briefing", time: "2:00 PM", color: "bg-[#10B981]", duration: 1 },
        "7-2": { title: "Team sync", time: "4:00 PM", color: "bg-[#FE5A00]" },
        "2-3": { title: "Equipment check", time: "11:00 AM", color: "bg-[#F59E0B]" },
        "5-3": { title: "HOD Meeting", time: "2:00 PM", color: "bg-[#3B82F6]" },
        "1-4": { title: "Venue check", time: "10:00 AM", color: "bg-[#10B981]" },
        "6-4": { title: "Training", time: "3:00 PM", color: "bg-[#FE5A00]" },
        "3-5": { title: "Lunch brief", time: "12:00 PM", color: "bg-[#8B5CF6]" },
        "7-5": { title: "Planning", time: "4:00 PM", color: "bg-[#3B82F6]" },
        "0-6": { title: "Weekend prep", time: "9:00 AM", color: "bg-[#F59E0B]" },
        "4-6": { title: "Review", time: "1:00 PM", color: "bg-[#EC4899]" },
      },
      1: { // May - Planning phase
        "2-1": { title: "Budget review", time: "11:00 AM", color: "bg-[#3B82F6]", duration: 1 },
        "4-2": { title: "Sponsor meeting", time: "1:00 PM", color: "bg-[#10B981]" },
        "6-2": { title: "Design review", time: "3:00 PM", color: "bg-[#8B5CF6]" },
        "1-3": { title: "Marketing sync", time: "10:00 AM", color: "bg-[#EC4899]" },
        "5-3": { title: "Team workshop", time: "2:00 PM", color: "bg-[#F59E0B]", duration: 1 },
        "3-4": { title: "Venue booking", time: "12:00 PM", color: "bg-[#3B82F6]" },
        "7-4": { title: "Logistics plan", time: "4:00 PM", color: "bg-[#10B981]" },
        "2-5": { title: "Cultural prep", time: "11:00 AM", color: "bg-[#FE5A00]" },
        "0-6": { title: "Weekend review", time: "9:00 AM", color: "bg-[#8B5CF6]" },
      },
      2: { // June - Preparation
        "1-0": { title: "Stage design", time: "10:00 AM", color: "bg-[#8B5CF6]", duration: 1 },
        "4-1": { title: "Tech rehearsal", time: "1:00 PM", color: "bg-[#EC4899]" },
        "6-2": { title: "Sound check", time: "3:00 PM", color: "bg-[#3B82F6]" },
        "2-3": { title: "Lighting setup", time: "11:00 AM", color: "bg-[#F59E0B]" },
        "5-3": { title: "Artist briefing", time: "2:00 PM", color: "bg-[#10B981]", duration: 1 },
        "3-4": { title: "Rehearsal", time: "12:00 PM", color: "bg-[#FE5A00]" },
        "7-5": { title: "Final checks", time: "4:00 PM", color: "bg-[#8B5CF6]" },
        "1-6": { title: "Team meeting", time: "10:00 AM", color: "bg-[#3B82F6]" },
      },
      3: { // July - Execution
        "0-0": { title: "Morning setup", time: "9:00 AM", color: "bg-[#FE5A00]" },
        "3-1": { title: "Volunteer brief", time: "12:00 PM", color: "bg-[#3B82F6]", duration: 1 },
        "5-2": { title: "Event kickoff", time: "2:00 PM", color: "bg-[#10B981]", duration: 1 },
        "7-2": { title: "Evening show", time: "4:00 PM", color: "bg-[#8B5CF6]" },
        "2-3": { title: "Cultural event", time: "11:00 AM", color: "bg-[#EC4899]" },
        "6-4": { title: "Stage performance", time: "3:00 PM", color: "bg-[#F59E0B]", duration: 1 },
        "4-5": { title: "Award ceremony", time: "1:00 PM", color: "bg-[#FE5A00]" },
        "1-6": { title: "Closing event", time: "10:00 AM", color: "bg-[#3B82F6]" },
      },
      4: { // August - Post-event
        "1-1": { title: "Debrief", time: "10:00 AM", color: "bg-[#3B82F6]", duration: 1 },
        "4-2": { title: "Feedback review", time: "1:00 PM", color: "bg-[#10B981]" },
        "6-3": { title: "Financial audit", time: "3:00 PM", color: "bg-[#F59E0B]" },
        "2-4": { title: "Thank you meet", time: "11:00 AM", color: "bg-[#EC4899]" },
        "5-5": { title: "Report writing", time: "2:00 PM", color: "bg-[#8B5CF6]" },
      },
      5: { // September - Analysis
        "3-1": { title: "Data analysis", time: "12:00 PM", color: "bg-[#3B82F6]", duration: 1 },
        "5-2": { title: "Team retrospective", time: "2:00 PM", color: "bg-[#10B981]" },
        "1-3": { title: "Improvement plan", time: "10:00 AM", color: "bg-[#FE5A00]" },
        "7-4": { title: "Next year prep", time: "4:00 PM", color: "bg-[#8B5CF6]" },
      },
      6: { // October - Planning next year
        "2-2": { title: "Concept meeting", time: "11:00 AM", color: "bg-[#EC4899]", duration: 1 },
        "4-3": { title: "Theme discussion", time: "1:00 PM", color: "bg-[#3B82F6]" },
        "6-4": { title: "Budget planning", time: "3:00 PM", color: "bg-[#10B981]" },
        "1-5": { title: "Team formation", time: "10:00 AM", color: "bg-[#F59E0B]" },
      },
      7: { // November - Recruitment
        "3-1": { title: "Recruitment drive", time: "12:00 PM", color: "bg-[#FE5A00]", duration: 1 },
        "5-3": { title: "Interviews", time: "2:00 PM", color: "bg-[#3B82F6]", duration: 1 },
        "7-4": { title: "Orientation", time: "4:00 PM", color: "bg-[#10B981]" },
        "2-5": { title: "Training begins", time: "11:00 AM", color: "bg-[#8B5CF6]" },
      },
    };
    return monthEvents[monthIndex] || {};
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] pb-24 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-black/5 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => onNavigate("dashboard")}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold" style={{ fontSize: "20px" }}>
              Schedule
            </h1>
          </div>
          <ProfileDropdown onNavigate={onNavigate} />
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between bg-[#F5F3F0] rounded-xl p-2.5">
          <button
            onClick={goToPreviousWeek}
            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-[#FE5A00] hover:text-white transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#FE5A00]" />
            <span className="font-semibold" style={{ fontSize: "13px" }}>
              {currentWeek}
            </span>
          </div>
          <button
            onClick={goToNextWeek}
            className="w-8 h-8 rounded-lg bg-white flex items-center justify-center hover:bg-[#FE5A00] hover:text-white transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Google Calendar Week View - Compact */}
      <div className="px-3 py-4">
        <div className="bg-white rounded-2xl p-3 shadow-sm">
          {/* Week View Calendar - 7 Days */}
          <div className="overflow-x-auto -mx-3 px-3">
            <div className="min-w-[700px]">
              {/* Day Headers */}
              <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-0 mb-2">
                <div></div>
                {[
                  { day: "Mon", date: "14", isToday: false },
                  { day: "Tue", date: "15", isToday: false },
                  { day: "Wed", date: "16", isToday: true },
                  { day: "Thu", date: "17", isToday: false },
                  { day: "Fri", date: "18", isToday: false },
                  { day: "Sat", date: "19", isToday: false },
                  { day: "Sun", date: "20", isToday: false },
                ].map((dayInfo, idx) => (
                  <div key={idx} className="text-center py-1.5">
                    <div className="text-[#6B6B6B] font-semibold mb-1" style={{ fontSize: "9px" }}>
                      {dayInfo.day.toUpperCase()}
                    </div>
                    <div
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold ${
                        dayInfo.isToday ? "bg-[#FE5A00] text-white" : "text-black"
                      }`}
                      style={{ fontSize: "12px" }}
                    >
                      {dayInfo.date}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Grid - Compact */}
              <div className="grid grid-cols-[50px_repeat(7,1fr)] gap-0 border-l border-black/10">
                {/* Time slots from 9 AM to 6 PM (more compact) */}
                {[
                  "9 AM",
                  "10 AM",
                  "11 AM",
                  "12 PM",
                  "1 PM",
                  "2 PM",
                  "3 PM",
                  "4 PM",
                  "5 PM",
                  "6 PM",
                ].map((time, timeIdx) => (
                  <div key={timeIdx} className="contents">
                    {/* Time Label */}
                    <div className="text-right pr-2 py-2 border-t border-black/5">
                      <span className="text-[#6B6B6B] font-medium" style={{ fontSize: "9px" }}>
                        {time}
                      </span>
                    </div>

                    {/* Day columns - 7 days */}
                    {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => {
                      // Define events for specific time slots and days
                      const events = getEventsForMonth(selectedMonth);

                      const eventKey = `${timeIdx}-${dayIdx}`;
                      const event = events[eventKey];

                      return (
                        <div
                          key={dayIdx}
                          className="border-t border-r border-black/5 py-0.5 px-0.5 min-h-[45px] relative"
                        >
                          {event && (
                            <div
                              className={`${event.color} text-white rounded p-1.5 text-left h-full ${
                                event.duration === 1 ? "absolute inset-0.5 bottom-auto h-[88px]" : ""
                              }`}
                            >
                              <p className="font-semibold leading-tight" style={{ fontSize: "9px" }}>
                                {event.title}
                              </p>
                              <p className="opacity-90 mt-0.5" style={{ fontSize: "8px" }}>
                                {event.time}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Month Navigation */}
        <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold mb-3" style={{ fontSize: "14px" }}>
            Jump to Month
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {months.map((month, idx) => (
              <button
                key={month.name}
                className={`py-2.5 rounded-xl font-semibold transition-all ${
                  idx === selectedMonth
                    ? "bg-[#FE5A00] text-white"
                    : "bg-[#F5F3F0] text-black hover:bg-[#FE5A00] hover:text-white"
                }`}
                style={{ fontSize: "13px" }}
                onClick={() => handleMonthChange(idx)}
              >
                {month.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}