const SHIFT_TYPE = {
  Early: "early",
  Late: "late",
  Night: "night",
} as const;

type ShiftType = (typeof SHIFT_TYPE)[keyof typeof SHIFT_TYPE];

interface Shift {
  id: string;
  nurse: string;
  type: ShiftType;
  date: string;
  department: string;
}

const SHIFT_CONFIG: Record<ShiftType, { label: string; hours: string; colour: string }> = {
  early: {
    label: "Early",
    hours: "07:00 – 15:00",
    colour: "bg-amber-100 text-amber-800 border-amber-300",
  },
  late: {
    label: "Late",
    hours: "15:00 – 23:00",
    colour: "bg-blue-100 text-blue-800 border-blue-300",
  },
  night: {
    label: "Night",
    hours: "23:00 – 07:00",
    colour: "bg-indigo-100 text-indigo-800 border-indigo-300",
  },
};

export { SHIFT_TYPE, SHIFT_CONFIG };
export type { Shift, ShiftType };
