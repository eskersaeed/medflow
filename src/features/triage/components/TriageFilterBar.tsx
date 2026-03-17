import { useTriageStore, PATIENT_STATUS, TRIAGE_LEVEL } from "../stores/triageStore";
import type { PatientStatus, TriageLevel } from "../types/patient";

function TriageFilterBar() {
  const filters = useTriageStore((state) => state.filters);
  const setSearchTerm = useTriageStore((state) => state.setSearchTerm);
  const setStatusFilter = useTriageStore((state) => state.setStatusFilter);
  const setTriageLevelFilter = useTriageStore((state) => state.setTriageLevelFilter);
  const setSortBy = useTriageStore((state) => state.setSortBy);
  const resetFilters = useTriageStore((state) => state.resetFilters);

  return (
    <div className="bg-white border-b border-slate-200 p-4">
      <div className="flex items-center gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search patients..."
          value={filters.searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <select
          value={filters.statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as PatientStatus | "all")}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value={PATIENT_STATUS.Waiting}>Waiting</option>
          <option value={PATIENT_STATUS.InProgress}>In Progress</option>
          <option value={PATIENT_STATUS.Discharged}>Discharged</option>
          <option value={PATIENT_STATUS.Escalated}>Escalated</option>
        </select>

        <select
          value={filters.triageLevelFilter}
          onChange={(e) => {
            const value = e.target.value;
            setTriageLevelFilter(value === "all" ? "all" : (Number(value) as TriageLevel));
          }}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Triage Levels</option>
          <option value={TRIAGE_LEVEL.Resuscitation}>1 - Resuscitation</option>
          <option value={TRIAGE_LEVEL.Emergency}>2 - Emergency</option>
          <option value={TRIAGE_LEVEL.Urgent}>3 - Urgent</option>
          <option value={TRIAGE_LEVEL.SemiUrgent}>4 - Semi-Urgent</option>
          <option value={TRIAGE_LEVEL.NonUrgent}>5 - Non-Urgent</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value as "triageLevel" | "waitTime" | "name")}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="triageLevel">Sort by Priority</option>
          <option value="waitTime">Sort by Wait Time</option>
          <option value="name">Sort by Name</option>
        </select>

        <button
          onClick={resetFilters}
          className="text-sm text-slate-500 hover:text-slate-700 underline"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}

export { TriageFilterBar };
