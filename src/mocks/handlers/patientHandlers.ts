import { http, HttpResponse, delay } from "msw";
import type { Patient } from "@/features/triage/types/patient";

const patients: Patient[] = [
  {
    id: "P-001",
    name: "Kwabena Darko",
    age: 51,
    chiefComplaint: "Unresponsive, found collapsed at home",
    triageLevel: 1,
    status: "waiting",
    nurse: "Fatima",
    arrivalTime: new Date(Date.now() - 2 * 60000).toISOString(),
    waitMinutes: 2,
    bedNumber: null,
  },
  {
    id: "P-002",
    name: "Ama Mensah",
    age: 34,
    chiefComplaint: "Severe chest pain, shortness of breath",
    triageLevel: 2,
    status: "in-progress",
    nurse: "Saeed",
    arrivalTime: new Date(Date.now() - 12 * 60000).toISOString(),
    waitMinutes: 12,
    bedNumber: 7,
  },
  {
    id: "P-003",
    name: "Kofi Asante",
    age: 67,
    chiefComplaint: "Persistent headache, dizziness for 3 days",
    triageLevel: 3,
    status: "waiting",
    nurse: null,
    arrivalTime: new Date(Date.now() - 45 * 60000).toISOString(),
    waitMinutes: 45,
    bedNumber: null,
  },
  {
    id: "P-004",
    name: "Efua Owusu",
    age: 8,
    chiefComplaint: "Minor laceration on forearm, no bleeding",
    triageLevel: 5,
    status: "waiting",
    nurse: null,
    arrivalTime: new Date(Date.now() - 22 * 60000).toISOString(),
    waitMinutes: 22,
    bedNumber: null,
  },
  {
    id: "P-005",
    name: "Yaa Boateng",
    age: 29,
    chiefComplaint: "Severe allergic reaction, facial swelling",
    triageLevel: 2,
    status: "waiting",
    nurse: null,
    arrivalTime: new Date(Date.now() - 8 * 60000).toISOString(),
    waitMinutes: 8,
    bedNumber: null,
  },
  {
    id: "P-006",
    name: "Kweku Mensah",
    age: 42,
    chiefComplaint: "Lower back pain after lifting, unable to stand",
    triageLevel: 4,
    status: "in-progress",
    nurse: "Saeed",
    arrivalTime: new Date(Date.now() - 35 * 60000).toISOString(),
    waitMinutes: 35,
    bedNumber: 12,
  },
  {
    id: "P-007",
    name: "Adwoa Poku",
    age: 73,
    chiefComplaint: "Confusion, fever 39.2C, productive cough",
    triageLevel: 2,
    status: "escalated",
    nurse: "Fatima",
    arrivalTime: new Date(Date.now() - 18 * 60000).toISOString(),
    waitMinutes: 18,
    bedNumber: 3,
  },
  {
    id: "P-008",
    name: "Kojo Annan",
    age: 15,
    chiefComplaint: "Sprained ankle during football, moderate swelling",
    triageLevel: 4,
    status: "waiting",
    nurse: null,
    arrivalTime: new Date(Date.now() - 28 * 60000).toISOString(),
    waitMinutes: 28,
    bedNumber: null,
  },
];

const patientHandlers = [
  http.get("/api/patients", async () => {
    await delay(500);
    return HttpResponse.json(patients);
  }),

  http.get("/api/patients/:id", async ({ params }) => {
    await delay(300);
    const patient = patients.find((p) => p.id === params.id);
    if (!patient) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(patient);
  }),

  http.patch("/api/patients/:id", async ({ params, request }) => {
    await delay(300);
    const updates = (await request.json()) as Partial<Patient>;
    const index = patients.findIndex((p) => p.id === params.id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    patients[index] = { ...patients[index], ...updates };
    return HttpResponse.json(patients[index]);
  }),
];

export { patientHandlers };
