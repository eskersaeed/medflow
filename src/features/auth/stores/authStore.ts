import { create } from "zustand";
import type { User, StaffRole } from "../types/auth";

const MOCK_USERS: Record<string, User> = {
  nurse: {
    id: "U-001",
    name: "Saeed",
    role: "nurse",
    department: "A&E",
  },
  "charge-nurse": {
    id: "U-002",
    name: "Fatima",
    role: "charge-nurse",
    department: "A&E",
  },
  admin: {
    id: "U-003",
    name: "Dr. Mensah",
    role: "admin",
    department: "A&E",
  },
};

interface AuthState {
  user: User;
  switchRole: (role: StaffRole) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_USERS["nurse"],
  switchRole: (role) => set({ user: MOCK_USERS[role] }),
}));

export { useAuthStore };
