import { useQuery } from "@tanstack/react-query";
import type { Patient } from "../types/patient";

async function fetchPatients(): Promise<Patient[]> {
  const response = await fetch("/api/patients");
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
}

function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });
}

export { usePatients };
