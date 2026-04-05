import { useQuery } from "@tanstack/react-query";
import type { Shift } from "../types/shift";

async function fetchShifts(): Promise<Shift[]> {
  const response = await fetch("/api/shifts");
  if (!response.ok) {
    throw new Error("Failed to fetch shifts");
  }
  return response.json();
}

function useShifts() {
  return useQuery({
    queryKey: ["shifts"],
    queryFn: fetchShifts,
  });
}

export { useShifts };
