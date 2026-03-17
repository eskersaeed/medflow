import { useQuery } from "@tanstack/react-query";
import { MOCK_PATIENTS } from "@/mocks/data/patients";
import type { Patient } from "../types/patient";

function fetchPatients(): Promise<Patient[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PATIENTS);
    }, 800);
  });
}

function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });
}

export { usePatients };
