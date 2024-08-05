import React, { useState, useEffect } from "react";

const MDashboard = () => {
  const [data, setData] = useState({ employees: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [inactiveEmployees, setInactiveEmployees] = useState(0);


  const fetchData = async () => {
    try {
      const employeeResponse = await fetch(
        "http://localhost:9000/employee/all"
      );
      const employees = await employeeResponse.json();

      const filteredEmployees = employees.filter(
        (employee) => employee.manager_id === sessionStorage.getItem('employee_id')
      );


      setData({
        employees: filteredEmployees,
      });

      setTotalEmployees(filteredEmployees.length);
      setActiveEmployees(
        filteredEmployees.filter((employee) => employee.active).length
      );
      setInactiveEmployees(
        filteredEmployees.filter((employee) => !employee.active).length
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const filteredEmployees = data.employees.filter((employee) =>
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
      <div className="col-sm-4 my-4">
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

      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="d-flex justify-content-between align-items-center px-4 my-3 border-purple-table">
            <h4 className="card-title py-1">Employee List</h4>
          </div>
          
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

export default MDashboard;