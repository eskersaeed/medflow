import { Header } from "@/components/layout/Header";
import { useShifts } from "../hooks/useShifts";
import { SHIFT_CONFIG } from "../types/shift";
import type { Shift, ShiftType } from "../types/shift";
import { useMemo } from "react";

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SHIFT_ORDER: ShiftType[] = ["early", "late", "night"];

function ShiftSchedulePage() {
  const { data: shifts, isLoading, isError, error } = useShifts();

  const { dates, shiftsByDateAndType } = useMemo(() => {
    if (!shifts || shifts.length === 0) return { dates: [], shiftsByDateAndType: {} };

    const allDates = [...new Set(shifts.map((s) => s.date))].sort();
    const grouped: Record<string, Record<string, Shift[]>> = {};

    allDates.forEach((date) => {
      grouped[date] = {};
      SHIFT_ORDER.forEach((type) => {
        grouped[date][type] = shifts.filter((s) => s.date === date && s.type === type);
      });
    });

    return { dates: allDates, shiftsByDateAndType: grouped };
  }, [shifts]);

  if (isLoading) {
    return (
      <div>
        <Header title="Shift Schedule" />
        <div className="p-6">
          <p className="text-slate-500">Loading shifts...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Header title="Shift Schedule" />
        <div className="p-6">
          <p className="text-red-600">Error: {error?.message || "Failed to load shifts"}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Shift Schedule" subtitle="Weekly Overview — A&E Department" />
      <div className="p-6 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-px bg-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 p-3">
              <p className="text-xs font-medium text-slate-500 uppercase">Shift</p>
            </div>
            {dates.map((date, i) => {
              const d = new Date(date + "T00:00:00");
              const dayName = DAY_NAMES[i] || d.toLocaleDateString("en-GB", { weekday: "short" });
              const dayNum = d.getDate();
              const isToday = date === new Date().toISOString().split("T")[0];
              return (
                <div
                  key={date}
                  className={`p-3 text-center ${isToday ? "bg-blue-50" : "bg-slate-50"}`}
                >
                  <p
                    className={`text-xs font-medium uppercase ${isToday ? "text-blue-600" : "text-slate-500"}`}
                  >
                    {dayName}
                  </p>
                  <p
                    className={`text-lg font-bold ${isToday ? "text-blue-600" : "text-slate-900"}`}
                  >
                    {dayNum}
                  </p>
                </div>
              );
            })}

            {SHIFT_ORDER.map((shiftType) => {
              const config = SHIFT_CONFIG[shiftType];
              return (
                <>
                  <div
                    key={`label-${shiftType}`}
                    className="bg-white p-3 flex flex-col justify-center"
                  >
                    <p className="text-sm font-semibold text-slate-900">{config.label}</p>
                    <p className="text-xs text-slate-400">{config.hours}</p>
                  </div>
                  {dates.map((date) => {
                    const dayShifts = shiftsByDateAndType[date]?.[shiftType] || [];
                    const isToday = date === new Date().toISOString().split("T")[0];
                    return (
                      <div
                        key={`${date}-${shiftType}`}
                        className={`p-2 min-h-[70px] ${isToday ? "bg-blue-50/50" : "bg-white"}`}
                      >
                        <div className="space-y-1">
                          {dayShifts.map((shift) => (
                            <div
                              key={shift.id}
                              className={`text-xs px-2 py-1 rounded border ${config.colour}`}
                            >
                              {shift.nurse}
                            </div>
                          ))}
                          {dayShifts.length === 0 && (
                            <p className="text-xs text-slate-300 italic">No cover</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>

          <div className="mt-4 flex gap-4">
            {SHIFT_ORDER.map((type) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${SHIFT_CONFIG[type].colour.split(" ")[0]}`} />
                <span className="text-xs text-slate-500">
                  {SHIFT_CONFIG[type].label} ({SHIFT_CONFIG[type].hours})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ShiftSchedulePage };
