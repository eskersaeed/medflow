import { http, HttpResponse, delay } from "msw";
import { MOCK_SHIFTS } from "../data/shifts";

const shiftHandlers = [
  http.get("/api/shifts", async () => {
    await delay(500);
    return HttpResponse.json(MOCK_SHIFTS);
  }),
];

export { shiftHandlers };
