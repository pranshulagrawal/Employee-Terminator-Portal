import React, { useState, useEffect } from "react";
import axios from "axios";

const MInActive = () => {
  const [data, setData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredEmployees = data.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          (employee) => employee.manager_id === sessionStorage.getItem("employee_id")
        );
        setData(filteredData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const [formData, setFormData] = useState({
    employee_id: "",
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
    ]
  });

  const [validationErrors, setValidationErrors] = useState({});

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setFormData({
      employee_id: "",
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
      ]
    });
    setShowDialog(false);
    setValidationErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setValidationErrors({
        ...validationErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else if (name === "email_id" && (!value.includes("@natwest.com") && !value.includes("@rbos.co.uk"))) {
      setValidationErrors({
        ...validationErrors,
        [name]: "Please enter a valid email address",
      });
    } else {
      setValidationErrors({
        ...validationErrors,
        [name]: "",
      });
    }
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
        console.log("Updated status:", data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { employee_id } = formData;

    axios
      .post("http://localhost:9000/separated/add", {
        ...formData,
        manager_id: sessionStorage.getItem("employee_id"),
        hr_id: sessionStorage.getItem("hr_id"),
      })
      .then(function (response) {
        handleUpdateStatus(employee_id);
        setFormData({
          name: "",
          employee_id: "",
          lastWorkDay: "",
          email_id: "",
          reason: "",
          remarks: "",
          department: "",
        });
        closeDialog();
      })
      .catch(function (error) {
        console.error("Error adding data:", error);
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
                            className={`form-control ${validationErrors.employee_id && "is-invalid"
                              }`}
                            id="employee_id"
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            placeholder="Employee ID"
                            required
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
                            className={`form-control ${validationErrors.lastWorkDay && "is-invalid"
                              }`}
                            id="lastWorkDay"
                            name="lastWorkDay"
                            value={formData.lastWorkDay}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            placeholder="Last Work Day"
                            required
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
                            className={`form-control ${validationErrors.name && "is-invalid"
                              }`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            placeholder="Name"
                            required
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
                            className={`form-control ${validationErrors.email_id && "is-invalid"
                              }`}
                            id="email_id"
                            name="email_id"
                            value={formData.email_id}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            placeholder="Email"
                            required
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
                        className={`form-control ${validationErrors.department && "is-invalid"
                          }`}
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder="Department"
                        required
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
                        className={`form-control ${validationErrors.reason && "is-invalid"
                          }`}
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder="Reason"
                        required
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
                        className={`form-control`}
                        id="remarks"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleInputChange}
                        placeholder="Remarks"
                      />
                    </div>

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
                    <td className="text-center">
                      {item.lastWorkDay}
                    </td>
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

export default MInActive;
