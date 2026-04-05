import { setupWorker } from "msw/browser";
import { patientHandlers } from "./handlers/patientHandlers";
import { shiftHandlers } from "./handlers/shiftHandlers";

const worker = setupWorker(...patientHandlers, ...shiftHandlers);

export { worker };
