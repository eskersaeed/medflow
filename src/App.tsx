import { PatientCard } from "@/features/triage/components/PatientCard";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">MedFlow Triage Queue</h1>

      <div className="max-w-2xl space-y-4">
        <PatientCard
          name="Ama Mensah"
          age={34}
          chiefComplaint="Severe chest pain, shortness of breath"
          triageLevel={2}
          waitMinutes={12}
          nurse="Saeed"
          onAssign={() => console.log("Assign Ama")}
          onViewDetails={() => console.log("View Ama details")}
        />

        <PatientCard
          name="Kofi Asante"
          age={67}
          chiefComplaint="Persistent headache, dizziness for 3 days"
          triageLevel={3}
          waitMinutes={45}
          nurse={null}
          onAssign={() => console.log("Assign Kofi")}
          onViewDetails={() => console.log("View Kofi details")}
        />

        <PatientCard
          name="Efua Owusu"
          age={8}
          chiefComplaint="Minor laceration on forearm, no bleeding"
          triageLevel={5}
          waitMinutes={22}
          nurse={null}
          onAssign={() => console.log("Assign Efua")}
          onViewDetails={() => console.log("View Efua details")}
        />

        <PatientCard
          name="Kwabena Darko"
          age={51}
          chiefComplaint="Unresponsive, found collapsed at home"
          triageLevel={1}
          waitMinutes={2}
          nurse="Fatima"
          onAssign={() => console.log("Assign Kwabena")}
          onViewDetails={() => console.log("View Kwabena details")}
        />
      </div>
    </div>
  );
}

export default App;
