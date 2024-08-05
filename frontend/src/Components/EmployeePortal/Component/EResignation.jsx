import React, { useState } from "react";
import axios from "axios";

const EResignation = () => {
  const [formData, setFormData] = useState({
    lastWorkDay: "",
    department: "",
    reason: "",
    remarks: "",
    departmentClearancesList: [
      { department: "HR", status: "pending", comment: "" },
      { department: "Technology", status: "pending", comment: "" },
      { department: "Corporate Card", status: "pending", comment: "" },
      { department: "Sodexo", status: "pending", comment: "" },
      { department: "Transport", status: "pending", comment: "" },
    ],
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateLastWorkDay = () => {
    return formData.lastWorkDay !== "";
  };

  const validateDepartment = () => {
    return formData.department !== "";
  };

  const validateReason = () => {
    return formData.reason !== "";
  };

  const validateRemarks = () => {
    return true;
  };

  const isFormValid = () => {
    return (
      validateLastWorkDay() &&
      validateDepartment() &&
      validateReason() &&
      validateRemarks()
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateStatus = (id) => {
    const url = `http://localhost:9000/employee/updateActiveStatus/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      employee_id: sessionStorage.getItem("employee_id"),
      manager_id: sessionStorage.getItem("manager_id"),
      name: sessionStorage.getItem("name"),
      email_id: sessionStorage.getItem("email_id"),
      role: sessionStorage.getItem("role"),
      active: sessionStorage.getItem("active"),
      hr_id: sessionStorage.getItem("hr_id"),
    };

    if (isFormValid()) {
      axios
        .post("http://localhost:9000/separated/add", {
          ...formData,
          ...userData,
        })
        .then(function (response) {
          handleUpdateStatus(sessionStorage.getItem("employee_id"));
          setFormSubmitted(true);
          setTimeout(() => {
            sessionStorage.clear();
            window.location.href = "/";
          }, 5000);
        })
        .catch(function (error) {
          console.error("Error adding data:", error);
        });
    } else {
      console.error("Form validation failed.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="container mt-5">
      <div className="card shadow">
        {!formSubmitted ? (
          <div className="card-body">
            <h3 className="text-center my-3">Resignation Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="lastWorkDay" className="form-label">
                    Last Working Day
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      !validateLastWorkDay() ? "is-invalid" : ""
                    }`}
                    id="lastWorkDay"
                    required
                    min={today}
                    name="lastWorkDay"
                    value={formData.lastWorkDay}
                    onChange={handleInputChange}
                    placeholder="Select a date"
                  />
                  {!validateLastWorkDay() && (
                    <div className="invalid-feedback">
                      Please select a date.
                    </div>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !validateDepartment() ? "is-invalid" : ""
                    }`}
                    id="department"
                    required
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Enter your department"
                  />
                  {!validateDepartment() && (
                    <div className="invalid-feedback">
                      Please enter a department.
                    </div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="reason" className="form-label">
                    Reason for Resignation
                  </label>
                  <textarea
                    type="text"
                    className={`form-control ${
                      !validateReason() ? "is-invalid" : ""
                    }`}
                    id="reason"
                    rows="3"
                    required
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Enter the reason for resignation"
                  ></textarea>
                  {!validateReason() && (
                    <div className="invalid-feedback">
                      Please enter a reason.
                    </div>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="remarks" className="form-label">
                    Remarks (optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="remarks"
                    rows="3"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    placeholder="Enter any remarks (optional)"
                  ></textarea>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={!isFormValid()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-success text-center my-2">Form Submitted...Redirecting you to login page in 5 sec</div>
        )}
      </div>
    </div>
  );
};

export default EResignation;
