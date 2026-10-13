import {  Routes, Route } from "react-router-dom";
import JobDetails from "../pages/public/JobDetails";
import Home from "../pages/public/Home";
import Jobs from "../pages/public/Jobs";
import Register from "../pages/public/Register";
import Login from "../pages/public/Login";
import Companies from "../pages/public/Companies";
import About from "../pages/public/About";
import Profile from "../pages/candidate/Profile";
import CompanyDetails from "../pages/public/CompanyDetails";


function PublicRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies/:id" element={<CompanyDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/companies" element={<Companies/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/about" element={<About/>}/>

      </Routes>
  );
}

export default PublicRoutes;