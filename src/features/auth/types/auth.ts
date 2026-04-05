const STAFF_ROLE = {
  Nurse: "nurse",
  ChargeNurse: "charge-nurse",
  Admin: "admin",
} as const;

type StaffRole = (typeof STAFF_ROLE)[keyof typeof STAFF_ROLE];

interface User {
  id: string;
  name: string;
  role: StaffRole;
  department: string;
}

const PERMISSIONS = {
  viewPatients: ["nurse", "charge-nurse", "admin"],
  assignPatients: ["nurse", "charge-nurse", "admin"],
  escalatePatients: ["nurse", "charge-nurse", "admin"],
  dischargePatients: ["charge-nurse", "admin"],
  overrideTriage: ["charge-nurse", "admin"],
  manageShifts: ["charge-nurse", "admin"],
  viewDashboard: ["charge-nurse", "admin"],
  manageUsers: ["admin"],
} as const;

type Permission = keyof typeof PERMISSIONS;

function hasPermission(role: StaffRole, permission: Permission): boolean {
  return (PERMISSIONS[permission] as readonly string[]).includes(role);
}

export { STAFF_ROLE, PERMISSIONS, hasPermission };
export type { User, StaffRole, Permission };
