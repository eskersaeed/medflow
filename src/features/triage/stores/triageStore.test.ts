import { describe, it, expect, beforeEach } from "vitest";
import { useTriageStore } from "./triageStore";

describe("triageStore", () => {
  beforeEach(() => {
    useTriageStore.getState().resetFilters();
    useTriageStore.getState().closeDetailPanel();
  });

  it("has correct default filter values", () => {
    const state = useTriageStore.getState();
    expect(state.filters.searchTerm).toBe("");
    expect(state.filters.statusFilter).toBe("all");
    expect(state.filters.triageLevelFilter).toBe("all");
    expect(state.filters.sortBy).toBe("triageLevel");
  });

  it("updates search term", () => {
    useTriageStore.getState().setSearchTerm("chest pain");
    expect(useTriageStore.getState().filters.searchTerm).toBe("chest pain");
  });

  it("updates status filter", () => {
    useTriageStore.getState().setStatusFilter("waiting");
    expect(useTriageStore.getState().filters.statusFilter).toBe("waiting");
  });

  it("updates triage level filter", () => {
    useTriageStore.getState().setTriageLevelFilter(2);
    expect(useTriageStore.getState().filters.triageLevelFilter).toBe(2);
  });

  it("updates sort by", () => {
    useTriageStore.getState().setSortBy("waitTime");
    expect(useTriageStore.getState().filters.sortBy).toBe("waitTime");
  });

  it("selects a patient and opens the detail panel", () => {
    useTriageStore.getState().selectPatient("P-001");
    const state = useTriageStore.getState();
    expect(state.selectedPatientId).toBe("P-001");
    expect(state.isDetailPanelOpen).toBe(true);
  });

  it("closes the detail panel and clears selection", () => {
    useTriageStore.getState().selectPatient("P-001");
    useTriageStore.getState().closeDetailPanel();
    const state = useTriageStore.getState();
    expect(state.selectedPatientId).toBeNull();
    expect(state.isDetailPanelOpen).toBe(false);
  });

  it("resets all filters to defaults", () => {
    useTriageStore.getState().setSearchTerm("test");
    useTriageStore.getState().setStatusFilter("waiting");
    useTriageStore.getState().setSortBy("name");
    useTriageStore.getState().resetFilters();
    const state = useTriageStore.getState();
    expect(state.filters.searchTerm).toBe("");
    expect(state.filters.statusFilter).toBe("all");
    expect(state.filters.sortBy).toBe("triageLevel");
  });
});
