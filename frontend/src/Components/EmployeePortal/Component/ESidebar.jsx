import React, { useState } from "react";
import { Link } from "react-router-dom";

const ESidebar = () => {
  const [activeLink, setActiveLink] = useState("/empdash/");

  const handleLinkClick = (to) => {
    setActiveLink(to);
  };
  const status = JSON.parse(sessionStorage.getItem('active'));
  return (
    <div className="d-flex flex-column bg-white" style={{ height: "100vh" }}>
      <Link
        to="/empdash/"
        className="d-flex align-items-center mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <span className="fs-4 pt-3 m-3 ps-5">ET Portal</span>
      </Link>
      <ul className="nav nav-pills flex-column mb-auto p-3 border-top">
        {status && (
          <li className="nav-item d-flex align-items-center">
            <span
              className={`dot-added ${
                activeLink === "/empdash/resignation" ? "bullet-dot" : ""
              } me-2`}
            ></span>
            <Link
              to="/empdash/resignation"
              onClick={() => handleLinkClick("/empdash/resignation")}
              className={`nav-link w-100 ${
                activeLink === "/empdash/resignation"
                  ? "page-active"
                  : "link-body-emphasis"
              }`}
            >
              <i className="fa-solid fa-pen-nib me-2"></i>
              Self Resignation
            </Link>
          </li>
        )}
        {!status && (
          <li className="nav-item d-flex align-items-center">
            <span
              className={`dot-added ${
                activeLink === "/empdash/" ? "bullet-dot" : ""
              } me-2`}
            ></span>
            <Link
              to="/empdash/"
              onClick={() => handleLinkClick("/empdash/")}
              className={`nav-link w-100 ${
                activeLink === "/empdash/"
                  ? "page-active"
                  : "link-body-emphasis"
              }`}
            >
              <i className="fa-solid fa-user-minus me-2"></i>
              Timeline
            </Link>
          </li>
        )}
        {!status && (
          <li className="nav-item d-flex align-items-center">
            <span
              className={`dot-added ${
                activeLink === "/empdash/spocdata" ? "bullet-dot" : ""
              } me-2`}
            ></span>
            <Link
              to="/empdash/spocdata"
              onClick={() => handleLinkClick("/empdash/spocdata")}
              className={`nav-link w-100 ${
                activeLink === "/empdash/spocdata"
                  ? "page-active"
                  : "link-body-emphasis"
              }`}
            >
              <i className="fa-solid fa-user-tie me-2"></i>
              SPOC Details
            </Link>
          </li>
        )}
        {!status && (
          <li className="nav-item d-flex align-items-center">
            <span
              className={`dot-added ${
                activeLink === "/empdash/clearance" ? "bullet-dot" : ""
              } me-2`}
            ></span>
            <Link
              to="/empdash/clearance"
              onClick={() => handleLinkClick("/empdash/clearance")}
              className={`nav-link w-100 ${
                activeLink === "/empdash/clearance"
                  ? "page-active"
                  : "link-body-emphasis"
              }`}
            >
              <i className="fa-solid fa-check-double me-2"></i>
              Clearance Status
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ESidebar;
