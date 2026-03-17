import { Header } from "@/components/layout/Header";
import { PatientCard } from "./PatientCard";
import { TriageFilterBar } from "./TriageFilterBar";
import { useTriageStore } from "../stores/triageStore";
import { usePatients } from "../hooks/usePatients";
import { useMemo } from "react";

function TriageQueuePage() {
  const { data: patients, isLoading, isError, error } = usePatients();
  const filters = useTriageStore((state) => state.filters);
  const selectPatient = useTriageStore((state) => state.selectPatient);

  const filteredPatients = useMemo(() => {
    if (!patients) return [];

    return patients
      .filter((patient) => {
        if (filters.statusFilter !== "all" && patient.status !== filters.statusFilter) {
          return false;
        }
        if (
          filters.triageLevelFilter !== "all" &&
          patient.triageLevel !== filters.triageLevelFilter
        ) {
          return false;
        }
        if (filters.searchTerm) {
          const search = filters.searchTerm.toLowerCase();
          if (
            !patient.name.toLowerCase().includes(search) &&
            !patient.chiefComplaint.toLowerCase().includes(search)
          ) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "triageLevel":
            return a.triageLevel - b.triageLevel;
          case "waitTime":
            return b.waitMinutes - a.waitMinutes;
          case "name":
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [patients, filters]);

  if (isLoading) {
    return (
      <div>
        <Header title="Triage Queue" />
        <div className="p-6">
          <p className="text-slate-500">Loading patients...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Header title="Triage Queue" />
        <div className="p-6">
          <p className="text-red-600">Error: {error?.message || "Failed to load patients"}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="Triage Queue"
        subtitle={`${filteredPatients.length} patient${filteredPatients.length !== 1 ? "s" : ""} showing`}
      />
      <TriageFilterBar />
      <div className="p-6 max-w-3xl space-y-4">
        {filteredPatients.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No patients match your filters</p>
        ) : (
          filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              name={patient.name}
              age={patient.age}
              chiefComplaint={patient.chiefComplaint}
              triageLevel={patient.triageLevel}
              waitMinutes={patient.waitMinutes}
              nurse={patient.nurse}
              onAssign={() => console.log(`Assign ${patient.name}`)}
              onViewDetails={() => selectPatient(patient.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export { TriageQueuePage };
