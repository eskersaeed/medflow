import type { Shift } from "@/features/scheduling/types/shift";

function getWeekDates(): string[] {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

const dates = getWeekDates();

const MOCK_SHIFTS: Shift[] = [
  { id: "S-001", nurse: "Saeed", type: "early", date: dates[0], department: "A&E" },
  { id: "S-002", nurse: "Fatima", type: "early", date: dates[0], department: "A&E" },
  { id: "S-003", nurse: "Grace", type: "late", date: dates[0], department: "A&E" },
  { id: "S-004", nurse: "Saeed", type: "late", date: dates[1], department: "A&E" },
  { id: "S-005", nurse: "Fatima", type: "night", date: dates[1], department: "A&E" },
  { id: "S-006", nurse: "Grace", type: "early", date: dates[1], department: "A&E" },
  { id: "S-007", nurse: "Saeed", type: "early", date: dates[2], department: "A&E" },
  { id: "S-008", nurse: "Fatima", type: "late", date: dates[2], department: "A&E" },
  { id: "S-009", nurse: "Grace", type: "night", date: dates[2], department: "A&E" },
  { id: "S-010", nurse: "Saeed", type: "night", date: dates[3], department: "A&E" },
  { id: "S-011", nurse: "Fatima", type: "early", date: dates[3], department: "A&E" },
  { id: "S-012", nurse: "Grace", type: "late", date: dates[3], department: "A&E" },
  { id: "S-013", nurse: "Saeed", type: "early", date: dates[4], department: "A&E" },
  { id: "S-014", nurse: "Fatima", type: "late", date: dates[4], department: "A&E" },
  { id: "S-015", nurse: "Grace", type: "early", date: dates[4], department: "A&E" },
  { id: "S-016", nurse: "Saeed", type: "late", date: dates[5], department: "A&E" },
  { id: "S-017", nurse: "Fatima", type: "early", date: dates[5], department: "A&E" },
  { id: "S-018", nurse: "Saeed", type: "early", date: dates[6], department: "A&E" },
  { id: "S-019", nurse: "Grace", type: "night", date: dates[6], department: "A&E" },
];

export { MOCK_SHIFTS, getWeekDates };
