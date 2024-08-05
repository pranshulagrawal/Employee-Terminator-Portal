import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MSidebar from "./Components/MSidebar";
import MNavbar from "./Components/MNavbar";
import MDashboard from "./Components/MDashboard";
import MInActive from "./Components/MInActive";
import MProfile from "./Components/MProfile";
import MResignation from "./Components/MSelfResignation";
import ESpocDetails from "../EmployeePortal/Component/ESpocDetails";
import EClearance from "../EmployeePortal/Component/EClearance";
import ETimeline from "../EmployeePortal/Component/ETimeline";

const ManagerDashboard= () => {
  return (
      <div className="container-fluid row ">
        <div className="col-md-2 p-0">
          <MSidebar />
        </div>
        <div className="col-md-10 bg-body-tertiary">
          <MNavbar/>
          <Routes>
            <Route path="/" element={<MDashboard />}/>
            <Route path="empinactive" element={<MInActive/>}/>
            <Route path="resignation" element={<MResignation/>}/>
            <Route path="userprofile" element={<MProfile/>}/>
            <Route path="spocdata" element={<ESpocDetails />}/>
            <Route path="clearance" element={<EClearance />}/>
            <Route path="timeline" element={<ETimeline />}/>
          </Routes>
        </div>
      </div>
  );
};

export default ManagerDashboard;
