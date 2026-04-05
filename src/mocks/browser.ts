import { setupWorker } from "msw/browser";
import { patientHandlers } from "./handlers/patientHandlers";

const worker = setupWorker(...patientHandlers);

export { worker };
