import { Badge, BADGE_VARIANT } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const TRIAGE_LEVEL = {
  Resuscitation: 1,
  Emergency: 2,
  Urgent: 3,
  SemiUrgent: 4,
  NonUrgent: 5,
} as const;

type TriageLevel = (typeof TRIAGE_LEVEL)[keyof typeof TRIAGE_LEVEL];

interface PatientCardProps {
  name: string;
  age: number;
  chiefComplaint: string;
  triageLevel: TriageLevel;
  waitMinutes: number;
  nurse: string | null;
  onAssign: () => void;
  onViewDetails: () => void;
}

const triageBadgeConfig: Record<TriageLevel, { label: string; variant: string }> = {
  1: { label: "Resuscitation", variant: BADGE_VARIANT.Resuscitation },
  2: { label: "Emergency", variant: BADGE_VARIANT.Emergency },
  3: { label: "Urgent", variant: BADGE_VARIANT.Urgent },
  4: { label: "Semi-Urgent", variant: BADGE_VARIANT.SemiUrgent },
  5: { label: "Non-Urgent", variant: BADGE_VARIANT.NonUrgent },
};

function PatientCard({
  name,
  age,
  chiefComplaint,
  triageLevel,
  waitMinutes,
  nurse,
  onAssign,
  onViewDetails,
}: PatientCardProps) {
  const triage = triageBadgeConfig[triageLevel];

  return (
    <Card hover>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">Age: {age}</p>
        </div>
        <Badge label={triage.label} variant={triage.variant} size="small" />
      </div>

      <p className="text-sm text-slate-700 mb-3">{chiefComplaint}</p>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">
          <span className={waitMinutes > 30 ? "text-red-600 font-medium" : ""}>
            {waitMinutes} min waiting
          </span>
          {nurse && <span className="ml-3">Nurse: {nurse}</span>}
        </div>

        <div className="flex gap-2">
          {!nurse && <Button label="Assign" size="small" onClick={onAssign} />}
          <Button label="Details" variant="secondary" size="small" onClick={onViewDetails} />
        </div>
      </div>
    </Card>
  );
}

export { PatientCard, TRIAGE_LEVEL };
export type { PatientCardProps, TriageLevel };
