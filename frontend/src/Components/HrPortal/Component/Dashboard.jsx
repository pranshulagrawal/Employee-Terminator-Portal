import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const [data, setData] = useState({ employees: [], managers: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState("employees");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [inactiveEmployees, setInactiveEmployees] = useState(0);
  const [addType, setAddType] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [loggedUser, setLoggedUser] = useState({
    employee_id: sessionStorage.getItem("employee_id"),
    manager_id: sessionStorage.getItem("manager_id"),
    hr_id: sessionStorage.getItem("hr_id"),
    name: sessionStorage.getItem("name"),
    email_id: sessionStorage.getItem("email_id"),
    role: sessionStorage.getItem("role"),
    active: sessionStorage.getItem("active"),
  });

  const [formData, setFormData] = useState({
    employee_id: "",
    manager_id: "",
    hr_id: "",
    name: "",
    email_id: "",
    password: "natwest@123",
    role: "",
    active: true,
  });

  const handleAddButtonClick = (type) => {
    setAddType(type);
    setShowDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeDialog = () => {
    setFormData({
      employee_id: "",
      manager_id: "",
      hr_id: "",
      name: "",
      email_id: "",
      password: "natwest@123",
      active: true,
    });
    setShowDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.role = addType === "employee" ? "Employee" : "Manager";
    if (addType === "employee") {
      fetch("http://localhost:9000/employee/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setSnackbarSeverity("success");
          setSnackbarMessage("Data Added Successfully");
          setSnackbarOpen(true);
          setFormData({
            employee_id: "",
            manager_id: "",
            hr_id: "",
            name: "",
            email_id: "",
            password: "natwest@123",
            role: "",
            active: true,
          });

          fetchData();
          setShowDialog(false);
        })
        .catch((error) => {
          setSnackbarSeverity("error");
          setSnackbarMessage("Error Adding Data");
          setSnackbarOpen(true);
        });
    } else if (addType === "manager") {
      fetch("http://localhost:9000/manager/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setSnackbarSeverity("success");
          setSnackbarMessage("Data Added Successfully");
          setSnackbarOpen(true);
          setFormData({
            employee_id: "",
            manager_id: "",
            hr_id: "",
            name: "",
            email_id: "",
            password: "natwest@123",
            role: "",
            active: true,
          });
          fetchData();
          setShowDialog(false);
        })
        .catch((error) => {
          setSnackbarSeverity("error");
          setSnackbarMessage("Error Adding Data");
          setSnackbarOpen(true);
        });
    }

    closeDialog();
  };

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };

  const filteredEmployees = data.employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredManagers = data.managers.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const MtotalPages = Math.ceil(filteredManagers.length / ITEMS_PER_PAGE);

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
  const currentManagers = filteredManagers.slice(startIndex, endIndex);

  const fetchData = async () => {
    try {
      const employeeResponse = await fetch(
        "http://localhost:9000/employee/all"
      );
      const managerResponse = await fetch("http://localhost:9000/manager/all");

      const employees = await employeeResponse.json();
      const managers = await managerResponse.json();

      const filteredEmployees = employees.filter(
        (employee) => employee.hr_id === sessionStorage.getItem("employee_id")
      );

      const filteredManagers = managers.filter(
        (manager) => manager.hr_id === sessionStorage.getItem("employee_id")
      );

      setData({
        employees: filteredEmployees,
        managers: filteredManagers,
      });

      setTotalEmployees(filteredEmployees.length + filteredManagers.length);
      setActiveEmployees(
        filteredEmployees.filter((employee) => employee.active).length +
          filteredManagers.filter((manager) => manager.active).length
      );
      setInactiveEmployees(
        filteredEmployees.filter((employee) => !employee.active).length +
          filteredManagers.filter((manager) => !manager.active).length
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="col-md-12 row my-3">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body ms-2 me-0 d-flex justify-content-between">
              <div className="row align-items-center">
                <div className="col">
                  <i className="fa-solid fa-users fa-xl"></i>
                </div>
                <div className="col p-0 ms-2 me-5">
                  <div className="d-flex flex-column">
                    <span className="small">Total</span>
                    <span className="font-bold fs-5">Employee</span>
                  </div>
                </div>
                <div className="col ms-1">
                  <h3 className="text-success">{totalEmployees}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body ms-2 me-0 d-flex justify-content-between">
              <div className="row align-items-center">
                <div className="col">
                  <i className="fa-solid fa-user-check fa-xl"></i>
                </div>
                <div className="col p-0 ms-2 me-5">
                  <div className="d-flex flex-column">
                    <span className="small">Total</span>
                    <span className="font-bold fs-5">Active</span>
                  </div>
                </div>
                <div className="col ms-1">
                  <h3 className="text-primary">{activeEmployees}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body ms-2 me-0 d-flex justify-content-between">
              <div className="row align-items-center">
                <div className="col">
                  <i className="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
                </div>
                <div className="col p-0 ms-2 me-5">
                  <div className="d-flex flex-column">
                    <span className="small">Total</span>
                    <span className="font-bold fs-5">Inactive</span>
                  </div>
                </div>
                <div className="col ms-1">
                  <h3 className="text-danger">{inactiveEmployees}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4 col-lg-12 col-md-12">
        <div className="col-sm-4 mt-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Employees"
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-4 mt-3">
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>

      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="d-flex justify-content-between align-items-center px-4 my-3 border-purple-table">
            <h4 className="card-title py-1">Employee List</h4>
            <div className="dropdown mx-4 mb-2">
              <select
                className="form-select"
                value={currentCategory}
                onChange={handleCategoryChange}
              >
                <option value="employees">Employees</option>
                <option value="managers">Managers</option>
              </select>
            </div>
            <div className="col-sm-8 d-flex justify-content-end align-items-center mb-2">
              <button
                className="btn bg-purple me-2"
                onClick={() => handleAddButtonClick("employee")}
              >
                Add Employee
              </button>
              <button
                className="btn bg-purple"
                onClick={() => handleAddButtonClick("manager")}
              >
                Add Manager
              </button>
            </div>
          </div>
          {showDialog && (
            <div className="dialog">
              {addType === "employee" && (
                <div className="custom-overlay">
                  <div
                    className="modal fade show ms-5 ps-5"
                    tabIndex="-1"
                    style={{ display: "block" }}
                  >
                    <div className="modal-dialog">
                      <div className="modal-content mt-5">
                        <div className="modal-header">
                          <h5 className="modal-title">Add Employee Details</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={closeDialog}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="mb-3">
                              <label htmlFor="name" className="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                className={`form-control`}
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="email_id" className="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                className={`form-control`}
                                id="email_id"
                                name="email_id"
                                placeholder="Enter email ID"
                                value={formData.email_id}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="manager_id"
                                className="form-label"
                              >
                                Manager ID
                              </label>
                              <input
                                type="text"
                                className={`form-control`}
                                id="manager_id"
                                name="manager_id"
                                placeholder="Enter manager ID"
                                value={formData.manager_id}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="hr_id" className="form-label">
                                HR ID
                              </label>
                              <input
                                type="text"
                                className={`form-control`}
                                id="hr_id"
                                name="hr_id"
                                placeholder="Enter HR ID"
                                value={formData.hr_id}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="employee_id"
                                className="form-label"
                              >
                                Emp ID
                              </label>
                              <input
                                type="text"
                                className={`form-control`}
                                id="employee_id"
                                name="employee_id"
                                placeholder="Enter employee ID"
                                value={formData.employee_id}
                                onChange={handleInputChange}
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

              {addType === "manager" && (
                <div className="custom-overlay">
                  <div
                    className="modal fade show mt-5 ms-5 ps-5"
                    tabIndex="-1"
                    style={{ display: "block" }}
                  >
                    <div className="modal-dialog">
                      <div className="modal-content mt-5">
                        <div className="modal-header">
                          <h5 className="modal-title">Add Manager Details</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={closeDialog}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="mb-3">
                              <label htmlFor="name" className="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                className={`form-control`}
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="email_id" className="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                className={`form-control`}
                                id="email_id"
                                name="email_id"
                                placeholder="Enter email ID"
                                value={formData.email_id}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="hr_id" className="form-label">
                                HR ID
                              </label>
                              <input
                                type="text"
                                className={`form-control`}
                                id="hr_id"
                                name="hr_id"
                                placeholder="Enter HR ID"
                                value={formData.hr_id}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="employee_id"
                                className="form-label"
                              >
                                Emp ID
                              </label>
                              <input
                                type="text"
                                className={`form-control`}
                                id="employee_id"
                                name="employee_id"
                                placeholder="Enter employee"
                                value={formData.employee_id}
                                onChange={handleInputChange}
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

              <button className="btn btn-primary" onClick={handleSubmit}>
                Add
              </button>
            </div>
          )}
          {currentCategory === "employees" ? (
            <div className="table-responsive px-4">
              <table className="table ">
                <thead className="table-head-style rounded-4">
                  <tr>
                    <th className="text-center">Employee ID</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Email ID</th>
                    <th className="text-center">Role</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees?.map((item) => (
                    <tr key={item.employee_id}>
                      <td className="text-center">{item.employee_id}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">{item.email_id}</td>
                      <td className="text-center">{item.role}</td>
                      <td className="text-center">
                        {item.active ? (
                          <div className="col-md-8 custom-chip-active py-1 mx-auto fw-bold">
                            <i className="fa-solid fa-circle fa-2xs dot-icon"></i>
                            &nbsp; Active
                          </div>
                        ) : (
                          <div className="col-md-8 custom-chip-inactive py-1 mx-auto fw-bold">
                            <i className="fa-solid fa-circle fa-2xs dot-icon"></i>
                            &nbsp; In active
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="table-responsive px-4">
              <table className="table ">
                <thead className="table-head-style rounded-4">
                  <tr>
                    <th className="text-center">Manager ID</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Email ID</th>
                    <th className="text-center">Role</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentManagers?.map((item) => (
                    <tr key={item.employee_id}>
                      <td className="text-center">{item.employee_id}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">{item.email_id}</td>
                      <td className="text-center">{item.role}</td>
                      <td className="text-center">
                        {item.active ? (
                          <div className="col-md-8 custom-chip-active py-1 mx-auto fw-bold">
                            <i className="fa-solid fa-circle fa-2xs dot-icon"></i>
                            &nbsp; Active
                          </div>
                        ) : (
                          <div className="col-md-8 custom-chip-inactive py-1 mx-auto fw-bold">
                            <i className="fa-solid fa-circle fa-2xs dot-icon"></i>
                            &nbsp; In active
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

export default Dashboard;
