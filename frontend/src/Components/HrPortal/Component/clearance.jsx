import React, { useState, useEffect } from "react";

const Clearance = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredEmployees = data.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetch("http://localhost:9000/separated/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data?.filter(
          (employee) => employee.hr_id === sessionStorage.getItem("employee_id")
        );
        setData(filteredData);
        console.log(typeof User);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleUpdateClick = (employeeId, updatedClearances) => {
    fetch(`http://localhost:9000/separated/update/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedClearances),
    })
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:9000/separated/all")
          .then((response) => response.json())
          .then((data) => {
            const filteredData = data.filter(
              (employee) => employee.hr_id === sessionStorage.getItem("employee_id")
            );
            setData(filteredData);
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => console.error("Error:", error));
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
      </div>

      <div className="accordion" id="accordionFlushExample">
        <table className="table">
          <thead className="table-head-style rounded-4">
            <tr>
              <th className="col-3">Employee ID</th>
              <th className="col-4">Name</th>
              <th className="col-5">Department</th>
              <th>Open</th>
            </tr>
          </thead>
        </table>
        {filteredEmployees?.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`flush-heading-${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse-${index}`}
                aria-expanded="false"
                aria-controls={`flush-collapse-${index}`}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-3">{item.employee_id}</div>
                    <div className="col-4">{item.name}</div>
                    <div className="col-5">{item.department}</div>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id={`flush-collapse-${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`flush-heading-${index}`}
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <table className="table table-bordered">
                  <thead className="table-head-style rounded-4">
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Comment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.departmentClearancesList?.map((clearance, i) => (
                      <tr key={index + "-" + i}>
                        <td>{clearance.department}</td>
                        <td>{clearance.status}</td>
                        <td>{clearance.comment}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-success me-2"
                            onClick={() => {
                              const updatedClearances = [
                                ...item.departmentClearancesList,
                              ];
                              updatedClearances[i].status = "cleared";
                              updatedClearances[i].comment =
                                "Clearance Done......no issues";
                              handleUpdateClick(
                                item.employee_id,
                                updatedClearances
                              );
                            }}
                          >
                            Clear
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              const updatedClearances = [
                                ...item.departmentClearancesList,
                              ];
                              updatedClearances[i].status = "Rejected";
                              updatedClearances[i].comment =
                                "Please Contact SPOC person of this Department";
                              handleUpdateClick(
                                item.employee_id,
                                updatedClearances
                              );
                            }}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center my-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              &lt;
            </button>
          </li>
          {Array.from({
            length: Math.ceil(filteredEmployees.length / itemsPerPage),
          })?.map((_, index) => (
            <li
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
              key={index}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === Math.ceil(filteredEmployees.length / itemsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              &gt;
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Clearance;
