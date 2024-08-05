import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  function getCurrentDateTime() {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const dateTimeString = new Date().toLocaleString(undefined, options);
    return dateTimeString;
  }

  return (
    <header className="py-4 my-1 border-bottom d-flex justify-content-end bg-body-tertiary">
      <div className="container">
        <div className="d-flex justify-content-end">
        <span className="span me-5 text-dark">{currentDateTime}</span>
          <div className="flex-shrink-0 dropdown">
            <a
              href="#"
              className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/006/017/842/small_2x/customer-service-icon-user-with-laptop-computer-and-headphone-illustration-free-vector.jpg"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li>
                <Link className="dropdown-item" to="/hrdash/userprofile">
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
              <button className="dropdown-item" onClick={() => {
              sessionStorage.clear();
              window.location = "http://localhost:3000/";
            }}>
                  Sign out


                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
