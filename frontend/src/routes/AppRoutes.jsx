import { Routes, Route } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import CandidateRoutes from "./CandidateRoutes";
import RecruiterRoutes from "./RecruiterRoutes";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/*" element={<PublicRoutes />} />

      <Route
        path="/candidate/*"
        element={<CandidateRoutes />}
      />

      <Route
        path="/recruiter/*"
        element={<RecruiterRoutes />}
      />

    </Routes>
  );
}

export default AppRoutes;