import { BrowserRouter, Routes, Route } from "react-router";
import { MainLayout } from "@/components/layout/MainLayout";
import { TriageQueuePage } from "@/features/triage/components/TriageQueuePage";
import { ShiftSchedulePage } from "@/features/scheduling/components/ShiftSchedulePage";
import { DashboardPage } from "@/features/dashboard/components/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<TriageQueuePage />} />
          <Route path="/shifts" element={<ShiftSchedulePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
