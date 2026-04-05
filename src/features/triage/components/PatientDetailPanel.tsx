import { Badge, BADGE_VARIANT } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Can } from "@/features/auth/components/Can";
import { useAuthStore } from "@/features/auth/stores/authStore";
import { useTriageStore } from "../stores/triageStore";
import { usePatients } from "../hooks/usePatients";
import { useUpdatePatient } from "../hooks/useUpdatePatient";
import type { TriageLevel } from "../types/patient";

const triageBadgeConfig: Record<TriageLevel, { label: string; variant: string }> = {
  1: { label: "Resuscitation", variant: BADGE_VARIANT.Resuscitation },
  2: { label: "Emergency", variant: BADGE_VARIANT.Emergency },
  3: { label: "Urgent", variant: BADGE_VARIANT.Urgent },
  4: { label: "Semi-Urgent", variant: BADGE_VARIANT.SemiUrgent },
  5: { label: "Non-Urgent", variant: BADGE_VARIANT.NonUrgent },
};

function PatientDetailPanel() {
  const selectedPatientId = useTriageStore((state) => state.selectedPatientId);
  const isOpen = useTriageStore((state) => state.isDetailPanelOpen);
  const closePanel = useTriageStore((state) => state.closeDetailPanel);
  const { data: patients } = usePatients();
  const updatePatient = useUpdatePatient();
  const userName = useAuthStore((state) => state.user.name);

  const patient = patients?.find((p) => p.id === selectedPatientId);

  if (!isOpen || !patient) return null;

  const triage = triageBadgeConfig[patient.triageLevel];

  const handleAssign = () => {
    updatePatient.mutate({
      id: patient.id,
      updates: { nurse: userName, status: "in-progress" },
    });
  };

  const handleBeginTreatment = () => {
    updatePatient.mutate({
      id: patient.id,
      updates: { status: "in-progress" },
    });
  };

  const handleEscalate = () => {
    updatePatient.mutate({
      id: patient.id,
      updates: { status: "escalated" },
    });
  };

  const handleDischarge = () => {
    updatePatient.mutate({
      id: patient.id,
      updates: { status: "discharged", nurse: null, bedNumber: null },
    });
    closePanel();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={closePanel} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Patient Details</h2>
          <button
            onClick={closePanel}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{patient.name}</h3>
              <p className="text-sm text-slate-500 mt-1">ID: {patient.id}</p>
            </div>
            <Badge label={triage.label} variant={triage.variant} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Age</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">{patient.age}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Wait Time</p>
              <p
                className={`text-lg font-semibold mt-1 ${patient.waitMinutes > 30 ? "text-red-600" : "text-slate-900"}`}
              >
                {patient.waitMinutes} min
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Status</p>
              <p className="text-lg font-semibold text-slate-900 mt-1 capitalize">
                {patient.status}
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Bed</p>
              <p className="text-lg font-semibold text-slate-900 mt-1">
                {patient.bedNumber ?? "Unassigned"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Chief Complaint</p>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">
              {patient.chiefComplaint}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Assigned Nurse</p>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">
              {patient.nurse ?? "Not assigned"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Arrival Time</p>
            <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">
              {new Date(patient.arrivalTime).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-3">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Actions</p>
            {!patient.nurse && (
              <Can permission="assignPatients">
                <Button
                  label={`Assign to ${userName}`}
                  variant="primary"
                  size="large"
                  fullWidth
                  onClick={handleAssign}
                />
              </Can>
            )}
            {patient.status === "waiting" && (
              <Button
                label="Begin Treatment"
                variant="secondary"
                size="large"
                fullWidth
                onClick={handleBeginTreatment}
              />
            )}
            {patient.status !== "escalated" && patient.status !== "discharged" && (
              <Can permission="escalatePatients">
                <Button
                  label="Escalate"
                  variant="danger"
                  size="large"
                  fullWidth
                  onClick={handleEscalate}
                />
              </Can>
            )}
            {patient.status === "in-progress" && (
              <Can permission="dischargePatients">
                <Button
                  label="Discharge"
                  variant="ghost"
                  size="large"
                  fullWidth
                  onClick={handleDischarge}
                />
              </Can>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { PatientDetailPanel };
