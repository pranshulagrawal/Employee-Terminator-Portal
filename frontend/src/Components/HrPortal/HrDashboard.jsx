import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpocDetails from "./Component/SpocDetails";
import Sidebar from "./Component/SideBar";
import Navbar from "./Component/Navbar";
import Dashboard from "./Component/Dashboard";
import InActive from "./Component/InActive";
import Profile from "./Component/Profile";
import HResignation from "./Component/HResignation";
import Clearance from "./Component/clearance";

const HrDashboard = () => {
  return (
      <div className="container-fluid row ">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10 bg-body-tertiary">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="empinactive" element={<InActive/>}/>
            <Route path="spocdata" element={<SpocDetails/>}/>
            <Route path="userprofile" element={<Profile/>}/>
            <Route path="clearance" element={<Clearance/>}/>
            <Route path="resignation" element={<HResignation/>}/>
            <Route path="userprofile" element={<Profile/>}/>
          </Routes>
        </div>
      </div>
  );
};

export default HrDashboard;
