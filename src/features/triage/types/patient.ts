const TRIAGE_LEVEL = {
  Resuscitation: 1,
  Emergency: 2,
  Urgent: 3,
  SemiUrgent: 4,
  NonUrgent: 5,
} as const;

type TriageLevel = (typeof TRIAGE_LEVEL)[keyof typeof TRIAGE_LEVEL];

const PATIENT_STATUS = {
  Waiting: "waiting",
  InProgress: "in-progress",
  Discharged: "discharged",
  Escalated: "escalated",
} as const;

type PatientStatus = (typeof PATIENT_STATUS)[keyof typeof PATIENT_STATUS];

interface Patient {
  id: string;
  name: string;
  age: number;
  chiefComplaint: string;
  triageLevel: TriageLevel;
  status: PatientStatus;
  nurse: string | null;
  arrivalTime: string;
  waitMinutes: number;
  bedNumber: number | null;
}

export { TRIAGE_LEVEL, PATIENT_STATUS };
export type { Patient, TriageLevel, PatientStatus };
