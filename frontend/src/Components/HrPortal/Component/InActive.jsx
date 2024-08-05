import React, { useState, useEffect } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InActive = () => {
  const [data, setData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredEmployees = data.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  useEffect(() => {
    fetch("http://localhost:9000/separated/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (employee) => employee.hr_id === sessionStorage.getItem("employee_id")
        );
        setData(filteredData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const [formData, setFormData] = useState({
    employee_id: "",
    manager_id: "",
    name: "",
    lastWorkDay: "",
    email_id: "",
    terminated: true,
    department: "",
    reason: "",
    remarks: "",
    type: 1,
    departmentClearancesList: [
      { department: "HR", status: "pending", comment: "" },
      { department: "Technology", status: "pending", comment: "" },
      { department: "Corporate Card", status: "pending", comment: "" },
      { department: "Sodexo", status: "pending", comment: "" },
      { department: "Transport", status: "pending", comment: "" },
    ],
  });
  const [validationErrors, setValidationErrors] = useState({
    employee_id: "",
    lastWorkDay: "",
    name: "",
    email_id: "",
    manager_id: "",
    reason: "",
    remarks: "",
    department: "",
  });

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setFormData({
      employee_id: "",
      manager_id: "",
      name: "",
      lastWorkDay: "",
      email_id: "",
      terminated: true,
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
    setShowDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email_id") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setValidationErrors({
          ...validationErrors,
          email_id: "Invalid email address",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          email_id: "",
        });
      }
    }

    if (name === "employee_id") {
      if (!value.trim()) {
        setValidationErrors({
          ...validationErrors,
          employee_id: "Employee ID is required",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          employee_id: "",
        });
      }
    }

    if (name === "lastWorkDay") {
      if (!value) {
        setValidationErrors({
          ...validationErrors,
          lastWorkDay: "Last Work Day is required",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          lastWorkDay: "",
        });
      }
    }

    if (name === "name") {
      if (!value.trim()) {
        setValidationErrors({
          ...validationErrors,
          name: "Name is required",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          name: "",
        });
      }
    }

    if (name === "department") {
      if (!value.trim()) {
        setValidationErrors({
          ...validationErrors,
          department: "Department is required",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          department: "",
        });
      }
    }

    if (name === "reason") {
      if (!value.trim()) {
        setValidationErrors({
          ...validationErrors,
          reason: "Reason is required",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          reason: "",
        });
      }
    }

    if (name === "remarks") {
      if (!value.trim()) {
        setValidationErrors({
          ...validationErrors,
          remarks: "Remarks are required",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          remarks: "",
        });
      }
    }

    if (name === "manager_id") {
      if (!value.trim()) {
        setValidationErrors({
          ...validationErrors,
          manager_id: "Manager ID is required",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          manager_id: "",
        });
      }
    }
  };

  const { type } = formData;

  const handleUpdateStatus = (id, type) => {
    let url;

    if (type === "Manager") {
      url = `http://localhost:9000/manager/updateActiveStatus/${id}`;
    } else {
      url = `http://localhost:9000/employee/updateActiveStatus/${id}`;
    }

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
      .then((data) => {})
      .catch((error) => {});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const hasValidationErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );
  
    if (hasValidationErrors) {
      return;
    }
    const { employee_id } = formData;

    axios
      .post("http://localhost:9000/separated/add", {
        ...formData,
        hr_id: sessionStorage.getItem("employee_id"),
      })
      .then(function (response) {
        setSnackbarSeverity("success");
        setSnackbarMessage("Data Added Successfully");
        setSnackbarOpen(true);
        handleUpdateStatus(employee_id, type);
        setFormData({
          name: "",
          employee_id: "",
          manager_id: "",
          lastWorkDay: "",
          email_id: "",
          reason: "",
          remarks: "",
          department: "",
        });
        setValidationErrors({});
        closeDialog();
      })
      .catch(function (error) {
        setSnackbarSeverity("danger");
        setSnackbarMessage("Error Adding Data");
        setSnackbarOpen(true);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-4 mb-4">
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Employees"
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>

        <div className="col-sm-8 d-flex justify-content-end align-items-center mb-2">
          <button className="btn bg-purple" onClick={openDialog}>
            Add Termination
          </button>
        </div>
      </div>

      {showDialog && (
        <div className="custom-overlay">
          <div
            className="modal fade show mt-5 ms-5 ps-5"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title me-2">Add Termination Details</h5>
                  <div className="row ms-4 form-group">
                    <select
                      className={`form-control dropdown-size ${
                        validationErrors.type && "is-invalid"
                      }`}
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option defaultValue={1}>Select Type</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeDialog}
                  ></button>
                </div>

                <div className="modal-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="employee_id" className="form-label">
                            Emp ID
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              validationErrors.employee_id && "is-invalid"
                            }`}
                            id="employee_id"
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleInputChange}
                          />
                          {validationErrors.employee_id && (
                            <div className="invalid-feedback">
                              {validationErrors.employee_id}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="lastWorkDay" className="form-label">
                            Last Work Day
                          </label>
                          <input
                            type="date"
                            className={`form-control ${
                              validationErrors.lastWorkDay && "is-invalid"
                            }`}
                            id="lastWorkDay"
                            name="lastWorkDay"
                            value={formData.lastWorkDay}
                            onChange={handleInputChange}
                          />
                          {validationErrors.lastWorkDay && (
                            <div className="invalid-feedback">
                              {validationErrors.lastWorkDay}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              validationErrors.name && "is-invalid"
                            }`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          {validationErrors.name && (
                            <div className="invalid-feedback">
                              {validationErrors.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="email_id" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            className={`form-control ${
                              validationErrors.email_id && "is-invalid"
                            }`}
                            id="email_id"
                            name="email_id"
                            value={formData.email_id}
                            onChange={handleInputChange}
                          />
                          {validationErrors.email_id && (
                            <div className="invalid-feedback">
                              {validationErrors.email_id}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="department" className="form-label">
                        Department
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          validationErrors.department && "is-invalid"
                        }`}
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                      />
                      {validationErrors.department && (
                        <div className="invalid-feedback">
                          {validationErrors.department}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="reason" className="form-label">
                        Reason
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          validationErrors.reason && "is-invalid"
                        }`}
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                      />
                      {validationErrors.reason && (
                        <div className="invalid-feedback">
                          {validationErrors.reason}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="remarks" className="form-label">
                        Remarks
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          validationErrors.remarks && "is-invalid"
                        }`}
                        id="remarks"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleInputChange}
                      />
                      {validationErrors.remarks && (
                        <div className="invalid-feedback">
                          {validationErrors.remarks}
                        </div>
                      )}
                    </div>
                    {formData.type === "Employee" && (
                      <div className="mb-3">
                        <label htmlFor="manager_id" className="form-label">
                          Manager ID
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            validationErrors.manager_id && "is-invalid"
                          }`}
                          id="manager_id"
                          name="manager_id"
                          value={formData.manager_id}
                          onChange={handleInputChange}
                        />
                        {validationErrors.manager_id && (
                          <div className="invalid-feedback">
                            {validationErrors.manager_id}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="modal-footer d-flex justify-content-center">
                      <button type="submit" className="btn bg-purple">
                        Save changes
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeDialog}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <h4 className="card-title px-4 my-3 border-purple-table py-1">
            Employee List
          </h4>
          <div className="table-responsive px-4">
            <table className="table ">
              <thead className="table-head-style rounded-4">
                <tr>
                  <th className="text-center">Employee ID</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Email ID</th>
                  <th className="text-center">Department</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees?.map((item) => (
                  <tr key={item.employee_id}>
                    <td className="text-center">{item.employee_id}</td>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.email_id}</td>
                    <td className="text-center">{item.department}</td>
                    <td className="text-center">{item.lastWorkDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between mx-4 mb-2">
            <button
              className="btn btn-outline-secondary"
              onClick={handleClickPrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <button
              className="btn btn-outline-secondary"
              onClick={handleClickNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InActive;
