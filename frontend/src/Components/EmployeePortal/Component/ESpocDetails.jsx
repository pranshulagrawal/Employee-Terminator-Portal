import React, { useState, useEffect } from "react";

const ESpocDetails = () => {
    const [data, setData] = useState([]);
    
  
    useEffect(() => {
      fetch("http://localhost:9000/spoc/all")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error:", error));
    }, []);
  
  
    const [searchQuery, setSearchQuery] = useState("");
    const filteredEmployees = data.filter((employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const ITEMS_PER_PAGE = 7;
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
      <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <h4 className="card-title px-4 my-3 border-purple-table py-1">
            SPOC Details
          </h4>
          <div className="table-responsive px-4">
            <table className="table table-bordered">
              <thead className="table-head-style rounded-4">
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Contact No.</th>
                  <th>Email</th>
                  
                </tr>
              </thead>
              <tbody>
                {currentEmployees?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.department}</td>
                    <td>{item.contactno}</td>
                    <td>{item.email}</td>
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
      </div>

  );
};

export default ESpocDetails;
