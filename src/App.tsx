import { Badge, BADGE_VARIANT } from "@/components/ui/Badge";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <h1 className="text-2xl font-bold text-white mb-6">MedFlow Badge Component</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">Triage Levels</h2>
          <div className="flex gap-2">
            <Badge label="Resuscitation" variant={BADGE_VARIANT.Resuscitation} />
            <Badge label="Emergency" variant={BADGE_VARIANT.Emergency} />
            <Badge label="Urgent" variant={BADGE_VARIANT.Urgent} />
            <Badge label="Semi-Urgent" variant={BADGE_VARIANT.SemiUrgent} />
            <Badge label="Non-Urgent" variant={BADGE_VARIANT.NonUrgent} />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">Status Badges</h2>
          <div className="flex gap-2">
            <Badge label="Admitted" variant={BADGE_VARIANT.Success} />
            <Badge label="Pending Review" variant={BADGE_VARIANT.Warning} />
            <Badge label="Critical" variant={BADGE_VARIANT.Danger} />
            <Badge label="Default" />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">Sizes</h2>
          <div className="flex items-center gap-2">
            <Badge label="Small" variant={BADGE_VARIANT.Emergency} size="small" />
            <Badge label="Medium" variant={BADGE_VARIANT.Emergency} size="medium" />
            <Badge label="Large" variant={BADGE_VARIANT.Emergency} size="large" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
