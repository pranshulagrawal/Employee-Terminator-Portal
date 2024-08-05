import React, { useState, useEffect } from "react";

const EClearance = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:9000/separated/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (employee) => employee.employee_id === sessionStorage.getItem('employee_id')
        );
        setData(filteredData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);


  return (
    <>
  
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {data?.map((item, index) => (
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
                    <div className="col-2">{item.employee_id}</div>
                    <div className="col-5">{item.name}</div>
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
                    
                    </tr>
                  </thead>
                  <tbody>
                    {item.departmentClearancesList?.map((clearance, i) => (
                      <tr key={index + "-" + i}>
                        <td>{clearance.department}</td>
                        <td>{clearance.status}</td>
                        <td>{clearance.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EClearance;
