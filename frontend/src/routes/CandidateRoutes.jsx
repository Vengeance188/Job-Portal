import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/candidate/Dashboard";
import Applicants from "../pages/candidate/Applicants";
import Profile from "../pages/candidate/Profile";
import EditProfile from "../pages/candidate/EditProfile";
import SavedJobs from "../pages/candidate/SavedJobs";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/candidate/Home";

function CandidateRoutes() {
  return (
      <Routes>

   <Route element={<ProtectedRoute />}>


    <Route
  path="/"
  element={<Home />}/>
        <Route
  path="/dashboard"
  element={<Dashboard />}/>
  <Route
  path="/applications"
  element={<Applicants />}/>
  <Route
  path="/profile"
  element={<Profile />}
/>
<Route
  path="/edit-profile"
  element={<EditProfile />}
/>
<Route
  path="/saved-jobs"
  element={<SavedJobs />}
/>

</Route>

</Routes>
  


  );
}

export default CandidateRoutes;