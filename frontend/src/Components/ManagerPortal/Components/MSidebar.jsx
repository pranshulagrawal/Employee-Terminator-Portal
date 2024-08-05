import React, { useState } from "react";
import { Link } from "react-router-dom";

const MSidebar = () => {
  const [activeLink, setActiveLink] = useState("/managdash/");

  const handleLinkClick = (to) => {
    setActiveLink(to);
  };

  const status = JSON.parse(sessionStorage.getItem('active'));

  return (
    <div className="d-flex flex-column bg-white" style={{ height: "100vh" }}>
      <Link
        to="/managdash/"
        className="d-flex align-items-center mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <span className="fs-4 pt-3 m-3 ps-5">ET Portal</span>
      </Link>
      <ul className="nav nav-pills flex-column mb-auto p-3 border-top">
        <li className="nav-item d-flex align-items-center">
          <span
            className={`dot-added ${
              activeLink === "/managdash/" ? "bullet-dot" : ""
            } me-2`}
          ></span>
          <Link
            to="/managdash/"
            onClick={() => handleLinkClick("/managdash/")}
            className={`nav-link w-100 ${
              activeLink === "/managdash/"
                ? "page-active"
                : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-chart-line me-2"></i>
            Dashboard
          </Link>
        </li>
        <li className="nav-item d-flex align-items-center">
          <span
            className={`dot-added ${
              activeLink === "/managdash/empinactive" ? "bullet-dot" : ""
            } me-2`}
          ></span>
          <Link
            to="/managdash/empinactive"
            onClick={() => handleLinkClick("/managdash/empinactive")}
            className={`nav-link w-100 ${
              activeLink === "/managdash/empinactive"
                ? "page-active"
                : "link-body-emphasis"
            }`}
          >
            <i className="fa-solid fa-user-minus me-2"></i>
            Inactive
          </Link>
        </li>
        {status && (
          <li className="nav-item d-flex align-items-center">
            <span
              className={`dot-added ${
                activeLink === "/managdash/resignation" ? "bullet-dot" : ""
              } me-2`}
            ></span>
            <Link
              to="/managdash/resignation"
              onClick={() => handleLinkClick("/managdash/resignation")}
              className={`nav-link w-100 ${
                activeLink === "/managdash/resignation"
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
                activeLink === "/managdash/timeline" ? "bullet-dot" : ""
              } me-2`}
            ></span>
            <Link
              to="/managdash/timeline"
              onClick={() => handleLinkClick("/managdash/timeline")}
              className={`nav-link w-100 ${
                activeLink === "/managdash/timeline"
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
                activeLink === "/managdash/spocdata" ? "bullet-dot" : ""
              } me-2`}
            ></span>
            <Link
              to="/managdash/spocdata"
              onClick={() => handleLinkClick("/managdash/spocdata")}
              className={`nav-link w-100 ${
                activeLink === "/managdash/spocdata"
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
                activeLink === "/managdash/clearance" ? "bullet-dot" : ""
              } me-2`}
            ></span>
            <Link
              to="/managdash/clearance"
              onClick={() => handleLinkClick("/managdash/clearance")}
              className={`nav-link w-100 ${
                activeLink === "/managdash/clearance"
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

export default MSidebar;
