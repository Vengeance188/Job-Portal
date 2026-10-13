import {  Routes, Route } from "react-router-dom";
import RecruiterDashboard from "../pages/recruiter/Dashboard";
import CompanyProfile from "../pages/recruiter/CompanyProfile";
import ManageJobs from "../pages/recruiter/ManageJobs";
import Applicants from "../pages/recruiter/Applicants";
import EditCompanyProfile from "../pages/recruiter/EditCompanyProfile";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/recruiter/Home";
import About from "../pages/recruiter/About";
import EditJob from "../pages/recruiter/EditJob";
import PostJob from "../pages/recruiter/PostJob";

function RecruiterRoutes() {
  return (
      <Routes>


<Route element={<ProtectedRoute />}>

        <Route
  path="/dashboard"
  element={<RecruiterDashboard />}
/>
<Route
  path="/company-profile"
  element={<CompanyProfile />}
/>
<Route
  path="/manage-jobs"
  element={<ManageJobs />}
/>
<Route
  path="/applicants"
  element={<Applicants />}
/>
<Route
  path="/edit-company-profile"
  element={<EditCompanyProfile />}
/>
<Route
  path="/"
  element={<Home />}
/>
<Route
  path="/about"
  element={<About />}
/>
<Route
  path="edit-job/:id"
  element={<EditJob/>}
/>
<Route path="post-job" element={<PostJob />} />

</Route>

      </Routes>
  );
}

export default RecruiterRoutes;