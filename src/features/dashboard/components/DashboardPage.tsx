import { Header } from "@/components/layout/Header";
import { usePatients } from "@/features/triage/hooks/usePatients";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TRIAGE_COLOURS: Record<number, string> = {
  1: "#DC2626",
  2: "#F97316",
  3: "#EAB308",
  4: "#22C55E",
  5: "#3B82F6",
};

const TRIAGE_LABELS: Record<number, string> = {
  1: "Resuscitation",
  2: "Emergency",
  3: "Urgent",
  4: "Semi-Urgent",
  5: "Non-Urgent",
};

function DashboardPage() {
  const { data: patients, isLoading } = usePatients();

  const stats = useMemo(() => {
    if (!patients) return null;

    const total = patients.length;
    const waiting = patients.filter((p) => p.status === "waiting").length;
    const inProgress = patients.filter((p) => p.status === "in-progress").length;
    const escalated = patients.filter((p) => p.status === "escalated").length;
    const discharged = patients.filter((p) => p.status === "discharged").length;

    const avgWait =
      patients.length > 0
        ? Math.round(patients.reduce((sum, p) => sum + p.waitMinutes, 0) / patients.length)
        : 0;

    const assignedNurses = new Set(patients.filter((p) => p.nurse).map((p) => p.nurse)).size;

    const triageDistribution = [1, 2, 3, 4, 5].map((level) => ({
      name: TRIAGE_LABELS[level],
      value: patients.filter((p) => p.triageLevel === level).length,
      colour: TRIAGE_COLOURS[level],
    }));

    const statusDistribution = [
      { name: "Waiting", value: waiting, colour: "#F59E0B" },
      { name: "In Progress", value: inProgress, colour: "#3B82F6" },
      { name: "Escalated", value: escalated, colour: "#EF4444" },
      { name: "Discharged", value: discharged, colour: "#10B981" },
    ].filter((s) => s.value > 0);

    const waitTimeByTriage = [1, 2, 3, 4, 5].map((level) => {
      const levelPatients = patients.filter((p) => p.triageLevel === level);
      const avg =
        levelPatients.length > 0
          ? Math.round(
              levelPatients.reduce((sum, p) => sum + p.waitMinutes, 0) / levelPatients.length,
            )
          : 0;
      return {
        name: `T${level}`,
        avgWait: avg,
        fill: TRIAGE_COLOURS[level],
      };
    });

    return {
      total,
      waiting,
      inProgress,
      escalated,
      avgWait,
      assignedNurses,
      triageDistribution,
      statusDistribution,
      waitTimeByTriage,
    };
  }, [patients]);

  if (isLoading || !stats) {
    return (
      <div>
        <Header title="Dashboard" />
        <div className="p-6">
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Dashboard" subtitle="Real-time A&E Overview" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Total Patients" value={stats.total} colour="text-slate-900" />
          <MetricCard label="Waiting" value={stats.waiting} colour="text-amber-600" />
          <MetricCard
            label="Avg Wait Time"
            value={`${stats.avgWait} min`}
            colour={stats.avgWait > 30 ? "text-red-600" : "text-slate-900"}
          />
          <MetricCard label="Escalated" value={stats.escalated} colour="text-red-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Triage Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.triageDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {stats.triageDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.colour} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">
              Avg Wait Time by Triage Level
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.waitTimeByTriage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit=" min" />
                <Tooltip />
                <Bar dataKey="avgWait" name="Avg Wait (min)">
                  {stats.waitTimeByTriage.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Patient Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.statusDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {stats.statusDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.colour} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Nurses on duty</span>
                <span className="text-sm font-semibold text-slate-900">{stats.assignedNurses}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">In progress</span>
                <span className="text-sm font-semibold text-blue-600">{stats.inProgress}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Waiting</span>
                <span className="text-sm font-semibold text-amber-600">{stats.waiting}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-600">Longest wait</span>
                <span className="text-sm font-semibold text-red-600">
                  {patients ? Math.max(...patients.map((p) => p.waitMinutes)) : 0} min
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  colour,
}: {
  label: string;
  value: string | number;
  colour: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${colour}`}>{value}</p>
    </div>
  );
}

export { DashboardPage };
