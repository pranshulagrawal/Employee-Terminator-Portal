import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactLogo from "./login.svg";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {
  const [employeeid, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!employeeid.trim()) {
      newErrors.employeeid = "Employee ID is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBlur = (field) => {
    const newErrors = { ...errors };
  
    if (field === "employeeid" || field === "password" || field === "userType") {
      if (field === "employeeid" && !employeeid.trim()) {
        newErrors.employeeid = "Employee ID is required";
      } else if (field === "password" && !password.trim()) {
        newErrors.password = "Password is required";
      } else {
        newErrors[field] = "";
      }
    }
  
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:9000/auth/login",
          {
            employee_id: employeeid,
            password: password,
            // userType: userType,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("User authenticated!..Redirecting");
          setSnackbarOpen(true);
          sessionStorage.setItem("role", response.data.role);
          sessionStorage.setItem("name", response.data.name);
          sessionStorage.setItem("email_id", response.data.email_id);
          sessionStorage.setItem("manager_id", response.data.manager_id);
          sessionStorage.setItem("hr_id", response.data.hr_id);
          sessionStorage.setItem("employee_id", response.data.employee_id);
          sessionStorage.setItem("active", response.data.active);
          setTimeout(() => {
            switch (response.data.role) {
              case "HR":
                navigate("/hrdash/");
                break;
              case "Manager":
                navigate("/managdash/");
                break;
              case "Employee":
                navigate("/empdash/");
                break;
              default:
                break;
            }            
          }, 1000);
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Authentication failed");
          setSnackbarOpen(true);
        }
      } catch (error) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Invalid Credentials");
        setSnackbarOpen(true);
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-purple">
      <div className="col-md-12">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <img src={ReactLogo} alt="React Logo" />
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-4 my-auto">
                <h3 className="text-center pb-2 border-bottom border-secondary">
                  Login System
                </h3>
                <form onSubmit={handleSubmit} className="container mt-5">
                  <div className="form-group mb-3">
                    <label htmlFor="employeeid" className="mb-2">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.employeeid ? "is-invalid" : ""
                      }`}
                      id="employeeid"
                      placeholder="Enter your Employee ID"
                      value={employeeid}
                      onChange={(e) => {
                        setEmployeeId(e.target.value);
                        handleBlur("employeeid");
                      }}
                      
                    />
                    {errors.employeeid && (
                      <div className="invalid-feedback">
                        {errors.employeeid}
                      </div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password" className="mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        handleBlur("password");
                      }}
                      
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  {/* <div className="form-group mb-3">
                    <label htmlFor="role" className="mb-2">
                      What is your role?
                    </label>
                    <select
                      className={`form-control ${
                        errors.userType ? "is-invalid" : ""
                      }`}
                      id="role"
                      value={userType}
                      onChange={(e) => {
                        setUserType(e.target.value);
                      }}
                      required
                    >
                      <option value="">Select role</option>
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                    {errors.userType && (
                      <div className="invalid-feedback">{errors.userType}</div>
                    )}
                  </div> */}
                  <div className="text-center mt-3">
                    <button
                      type="submit"
                      className="btn mt-3 bg-purple"
                      style={{ width: "200px" }}
                      data-testid="login-button"
                    >
                      Login
                    </button>
                  </div>
                  <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={2000}
                  onClose={handleSnackbarClose}
                  sx={{
                    position: 'relative', 
                    top: '50px'
                  }}
                >
                  <Alert severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
