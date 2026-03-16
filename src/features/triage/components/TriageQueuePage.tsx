import { Header } from "@/components/layout/Header";
import { PatientCard } from "./PatientCard";

function TriageQueuePage() {
  return (
    <div>
      <Header title="Triage Queue" subtitle="4 patients waiting" />
      <div className="p-6 max-w-3xl space-y-4">
        <PatientCard
          name="Kwabena Darko"
          age={51}
          chiefComplaint="Unresponsive, found collapsed at home"
          triageLevel={1}
          waitMinutes={2}
          nurse="Fatima"
          onAssign={() => console.log("Assign")}
          onViewDetails={() => console.log("Details")}
        />
        <PatientCard
          name="Ama Mensah"
          age={34}
          chiefComplaint="Severe chest pain, shortness of breath"
          triageLevel={2}
          waitMinutes={12}
          nurse="Saeed"
          onAssign={() => console.log("Assign")}
          onViewDetails={() => console.log("Details")}
        />
        <PatientCard
          name="Kofi Asante"
          age={67}
          chiefComplaint="Persistent headache, dizziness for 3 days"
          triageLevel={3}
          waitMinutes={45}
          nurse={null}
          onAssign={() => console.log("Assign")}
          onViewDetails={() => console.log("Details")}
        />
        <PatientCard
          name="Efua Owusu"
          age={8}
          chiefComplaint="Minor laceration on forearm, no bleeding"
          triageLevel={5}
          waitMinutes={22}
          nurse={null}
          onAssign={() => console.log("Assign")}
          onViewDetails={() => console.log("Details")}
        />
      </div>
    </div>
  );
}

export { TriageQueuePage };
