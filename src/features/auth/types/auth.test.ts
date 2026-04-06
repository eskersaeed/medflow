import { describe, it, expect } from "vitest";
import { hasPermission } from "./auth";

describe("hasPermission", () => {
  it("allows nurse to view patients", () => {
    expect(hasPermission("nurse", "viewPatients")).toBe(true);
  });

  it("allows nurse to assign patients", () => {
    expect(hasPermission("nurse", "assignPatients")).toBe(true);
  });

  it("prevents nurse from discharging patients", () => {
    expect(hasPermission("nurse", "dischargePatients")).toBe(false);
  });

  it("prevents nurse from managing shifts", () => {
    expect(hasPermission("nurse", "manageShifts")).toBe(false);
  });

  it("allows charge nurse to discharge patients", () => {
    expect(hasPermission("charge-nurse", "dischargePatients")).toBe(true);
  });

  it("allows charge nurse to manage shifts", () => {
    expect(hasPermission("charge-nurse", "manageShifts")).toBe(true);
  });

  it("prevents charge nurse from managing users", () => {
    expect(hasPermission("charge-nurse", "manageUsers")).toBe(false);
  });

  it("allows admin to manage users", () => {
    expect(hasPermission("admin", "manageUsers")).toBe(true);
  });

  it("allows admin to do everything", () => {
    expect(hasPermission("admin", "viewPatients")).toBe(true);
    expect(hasPermission("admin", "dischargePatients")).toBe(true);
    expect(hasPermission("admin", "manageShifts")).toBe(true);
    expect(hasPermission("admin", "manageUsers")).toBe(true);
  });
});
