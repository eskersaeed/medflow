import { Badge, BADGE_VARIANT } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <h1 className="text-2xl font-bold text-white mb-8">MedFlow Components</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">Triage Badges</h2>
          <div className="flex gap-2">
            <Badge label="Resuscitation" variant={BADGE_VARIANT.Resuscitation} />
            <Badge label="Emergency" variant={BADGE_VARIANT.Emergency} />
            <Badge label="Urgent" variant={BADGE_VARIANT.Urgent} />
            <Badge label="Semi-Urgent" variant={BADGE_VARIANT.SemiUrgent} />
            <Badge label="Non-Urgent" variant={BADGE_VARIANT.NonUrgent} />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">Button Variants</h2>
          <div className="flex gap-3">
            <Button label="Assign Patient" variant="primary" />
            <Button label="View Details" variant="secondary" />
            <Button label="Escalate" variant="danger" />
            <Button label="Cancel" variant="ghost" />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">Button Sizes</h2>
          <div className="flex items-center gap-3">
            <Button label="Small" size="small" />
            <Button label="Medium" size="medium" />
            <Button label="Large" size="large" />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">Disabled State</h2>
          <div className="flex gap-3">
            <Button label="Assign Patient" variant="primary" disabled />
            <Button label="Escalate" variant="danger" disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
