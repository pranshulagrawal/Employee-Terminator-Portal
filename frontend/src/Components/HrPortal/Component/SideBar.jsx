import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("/hrdash/");

  const status = JSON.parse(sessionStorage.getItem('active'));

  const handleLinkClick = (to) => {
    setActiveLink(to);
  };
  return (
    <div className="d-flex flex-column bg-white" style={{ height: "100vh" }}>
      <Link
        to="/hrdash/"
        className="d-flex align-items-center mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <span className="fs-4 pt-3 m-3 ps-5">ET Portal</span>
      </Link>
      <ul className="nav nav-pills flex-column mb-auto p-3 border-top">
        <li className="nav-item d-flex align-items-center">
          <span
            className={`dot-added ${
              activeLink === "/hrdash/" ? "bullet-dot" : ""
            } me-2`}
          ></span>
          <Link
            to="/hrdash/"
            onClick={() => handleLinkClick("/hrdash/")}
            className={`nav-link w-100 ${
              activeLink === "/hrdash/" ? "page-active" : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-chart-line me-2"></i>
            Dashboard
          </Link>
        </li>
        <li className="nav-item d-flex align-items-center">
          <span
            className={`dot-added ${
              activeLink === "/hrdash/empinactive" ? "bullet-dot" : ""
            } me-2`}
          ></span>
          <Link
            to="/hrdash/empinactive"
            onClick={() => handleLinkClick("/hrdash/empinactive")}
            className={`nav-link w-100 ${
              activeLink === "/hrdash/empinactive" ? "page-active" : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-user-minus me-2"></i>
            Inactive
          </Link>
        </li>
        <li className="nav-item d-flex align-items-center">
          <span
            className={`dot-added ${
              activeLink === "/hrdash/spocdata" ? "bullet-dot" : ""
            } me-2`}
          ></span>
          <Link
            to="/hrdash/spocdata"
            onClick={() => handleLinkClick("/hrdash/spocdata")}
            className={`nav-link w-100 ${
              activeLink === "/hrdash/spocdata" ? "page-active" : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-user-tie me-2"></i>
            SPOC Details
          </Link>
        </li>
        <li className="nav-item d-flex align-items-center">
          <span
            className={`dot-added ${
              activeLink === "/hrdash/clearance" ? "bullet-dot" : ""
            } me-2`}
          ></span>
          <Link
            to="/hrdash/clearance"
            onClick={() => handleLinkClick("/hrdash/clearance")}
            className={`nav-link w-100 ${
              activeLink === "/hrdash/clearance" ? "page-active" : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-check-double me-2"></i>
            Clearance Status
          </Link>
        </li>
        {status && (
        <li className="nav-item d-flex align-items-center">
          <span
            className={`dot-added ${
              activeLink === "/hrdash/resignation" ? "bullet-dot" : ""
            } me-2`}
          ></span>
          <Link
            to="/hrdash/resignation"
            onClick={() => handleLinkClick("/hrdash/resignation")}
            className={`nav-link w-100 ${
              activeLink === "/hrdash/resignation" ? "page-active" : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-pen-nib me-2"></i>
            Self Resignation
          </Link>
        </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
