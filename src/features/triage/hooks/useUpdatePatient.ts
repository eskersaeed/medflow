import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Patient } from "../types/patient";

async function updatePatient({
  id,
  updates,
}: {
  id: string;
  updates: Partial<Patient>;
}): Promise<Patient> {
  const response = await fetch(`/api/patients/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error("Failed to update patient");
  }
  return response.json();
}

function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePatient,
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["patients"] });
      const previousPatients = queryClient.getQueryData<Patient[]>(["patients"]);

      queryClient.setQueryData<Patient[]>(["patients"], (old) =>
        old?.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      );

      return { previousPatients };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousPatients) {
        queryClient.setQueryData(["patients"], context.previousPatients);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}

export { useUpdatePatient };
