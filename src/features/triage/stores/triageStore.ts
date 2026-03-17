import { create } from "zustand";

const PATIENT_STATUS = {
  Waiting: "waiting",
  InProgress: "in-progress",
  Discharged: "discharged",
  Escalated: "escalated",
} as const;

type PatientStatus = (typeof PATIENT_STATUS)[keyof typeof PATIENT_STATUS];

const TRIAGE_LEVEL = {
  Resuscitation: 1,
  Emergency: 2,
  Urgent: 3,
  SemiUrgent: 4,
  NonUrgent: 5,
} as const;

type TriageLevel = (typeof TRIAGE_LEVEL)[keyof typeof TRIAGE_LEVEL];

interface TriageFilters {
  searchTerm: string;
  statusFilter: PatientStatus | "all";
  triageLevelFilter: TriageLevel | "all";
  sortBy: "triageLevel" | "waitTime" | "name";
}

interface TriageState {
  filters: TriageFilters;
  selectedPatientId: string | null;
  isDetailPanelOpen: boolean;

  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: PatientStatus | "all") => void;
  setTriageLevelFilter: (level: TriageLevel | "all") => void;
  setSortBy: (sort: "triageLevel" | "waitTime" | "name") => void;
  selectPatient: (id: string) => void;
  closeDetailPanel: () => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: TriageFilters = {
  searchTerm: "",
  statusFilter: "all",
  triageLevelFilter: "all",
  sortBy: "triageLevel",
};

const useTriageStore = create<TriageState>((set) => ({
  filters: DEFAULT_FILTERS,
  selectedPatientId: null,
  isDetailPanelOpen: false,

  setSearchTerm: (term) =>
    set((state) => ({
      filters: { ...state.filters, searchTerm: term },
    })),

  setStatusFilter: (status) =>
    set((state) => ({
      filters: { ...state.filters, statusFilter: status },
    })),

  setTriageLevelFilter: (level) =>
    set((state) => ({
      filters: { ...state.filters, triageLevelFilter: level },
    })),

  setSortBy: (sort) =>
    set((state) => ({
      filters: { ...state.filters, sortBy: sort },
    })),

  selectPatient: (id) =>
    set({
      selectedPatientId: id,
      isDetailPanelOpen: true,
    }),

  closeDetailPanel: () =>
    set({
      selectedPatientId: null,
      isDetailPanelOpen: false,
    }),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
}));

export { useTriageStore, PATIENT_STATUS, TRIAGE_LEVEL, DEFAULT_FILTERS };
export type { TriageState, TriageFilters, PatientStatus, TriageLevel };
