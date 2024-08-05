import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EResignation from "./Component/EResignation";
import ETimeline from "./Component/ETimeline";
import ESidebar from "./Component/ESidebar";
import ENavbar from "./Component/ENavbar";
import ESpocDetails from "./Component/ESpocDetails";
import EClearance from "./Component/EClearance";
import EProfile from "./Component/EProfile";

const EmpDashboard = () => {
  return (
      <div className="container-fluid row ">
        <div className="col-md-2 p-0">
          <ESidebar />
        </div>
        <div className="col-md-10 bg-body-tertiary">
          <ENavbar />
          <Routes>
            <Route path="/resignation" element={<EResignation />}/>
            <Route path="spocdata" element={<ESpocDetails />}/>
            <Route path="clearance" element={<EClearance />}/>
            <Route path="/" element={<ETimeline />}/>
            <Route path="userprofile" element={<EProfile />}/>
          </Routes>
        </div>
      </div>
  );
};

export default EmpDashboard;
