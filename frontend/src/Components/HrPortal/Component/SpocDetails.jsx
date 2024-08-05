import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SpocDetails = () => {
  const [data, setData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    contactno: "",
    email: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    contactno: "",
    name:"",
    department: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:9000/spoc/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setFormData({
      name: "",
      department: "",
      contactno: "",
      email: "",
    });
    setShowDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });

    if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._-]+@(natwest\.com|rbos\.co\.uk)$/;
      if (!value.match(emailPattern)) {
        setValidationErrors({
          ...validationErrors,
          email: "Please enter a valid NatWest email address.",
        });
      }
    }

    if (name === "contactno") {
      const phonePattern = /^\d{10}$/;
      if (!value.match(phonePattern)) {
        setValidationErrors({
          ...validationErrors,
          contactno: "Please enter a 10-digit phone number.",
        });
      }
    }
    if (name === "name") {
      setValidationErrors({
        ...validationErrors,
        name: !value.trim() ? "Name is required" : "",
      });
    }
  
    if (name === "department") {
      setValidationErrors({
        ...validationErrors,
        department: !value.trim() ? "Department is required" : "",
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@(natwest\.com|rbos\.co\.uk)$/;
    if (!formData.email.match(emailPattern)) {
      setValidationErrors({
        ...validationErrors,
        email: "Please enter a valid NatWest email address.",
      });
      return;
    }
    const phonePattern = /^\d{10}$/;
    if (!formData.contactno.match(phonePattern)) {
      setValidationErrors({
        ...validationErrors,
        contactno: "Please enter a 10-digit phone number.",
      });
      return;
    }

    fetch("http://localhost:9000/spoc/add", {
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
          name: "",
          department: "",
          contactno: "",
          email: "",
        });

        // Close the dialog after successful submission
        setShowDialog(false);
        fetch("http://localhost:9000/spoc/all")
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding data:", error);
      });
  };
  const handleUpdate = (item) => {
    setSelectedItemId(item.id);
    setFormData({
      name: item.name,
      department: item.department,
      contactno: item.contactno,
      email: item.email,
    });
  };
  const handleCancelEdit = () => {
    setSelectedItemId(null);
    setFormData({
      name: "",
      department: "",
      contactno: "",
      email: "",
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:9000/spoc/delete/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setSnackbarSeverity("danger");
        setSnackbarMessage("Data Deleted Successfully");
        setSnackbarOpen(true);
      fetch("http://localhost:9000/spoc/all")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error:", error));
    });
  };
  const handleSave = (item) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@(natwest\.com|rbos\.co\.uk)$/;
    if (!formData.email.match(emailPattern)) {
      setValidationErrors({
        ...validationErrors,
        email: "Please enter a valid NatWest email address.",
      });
      return;
    }

    // Phone number validation
    const phonePattern = /^\d{10}$/;
    if (!formData.contactno.match(phonePattern)) {
      setValidationErrors({
        ...validationErrors,
        contactno: "Please enter a 10-digit phone number.",
      });
      return;
    }

    // Send update request to the API
    fetch(`http://localhost:9000/spoc/update/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Data Updated Successfully");
        setSnackbarOpen(true);
        setSelectedItemId(null);
        setFormData({
          name: "",
          department: "",
          contactno: "",
          email: "",
        });

        fetch("http://localhost:9000/spoc/all")
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error("Error:", error));
      })
      .catch((error) => {
        setSnackbarSeverity("danger");
        setSnackbarMessage("Error Adding Data");
        setSnackbarOpen(true);
      });
  };

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
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </div>

        <div className="col-sm-8 d-flex justify-content-end align-items-center mb-2">
          <button className="btn bg-purple" onClick={openDialog}>
            Add SPOC
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
              <div className="modal-content mt-5">
                <div className="modal-header">
                  <h5 className="modal-title">Add SPOC Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeDialog}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleFormSubmit}>
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
                        required
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {validationErrors.name && (
                        <div className="invalid-feedback">
                          {validationErrors.name}
                        </div>
                      )}
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
                        required
                        placeholder="Enter department"
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
                      <label htmlFor="contactno" className="form-label">
                        Contact No.
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          validationErrors.contactno && "is-invalid"
                        }`}
                        id="contactno"
                        name="contactno"
                        placeholder="Enter contact no."
                        value={formData.contactno}
                        onChange={handleInputChange}
                      />
                      {validationErrors.contactno && (
                        <div className="invalid-feedback">
                          {validationErrors.contactno}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          validationErrors.email && "is-invalid"
                        }`}
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {validationErrors.email && (
                        <div className="invalid-feedback">
                          {validationErrors.email}
                        </div>
                      )}
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {selectedItemId === item.id ? (
                        <input
                          type="text"
                          className={`form-control ${
                            validationErrors.name && "is-invalid"
                          }`}
                          value={formData.name}
                          onChange={(e) => handleInputChange(e)}
                          name="name"
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td>
                      {selectedItemId === item.id ? (
                        <input
                          type="text"
                          className={`form-control ${
                            validationErrors.department && "is-invalid"
                          }`}
                          value={formData.department}
                          onChange={(e) => handleInputChange(e)}
                          name="department"
                        />
                      ) : (
                        item.department
                      )}
                    </td>
                    <td>
                      {selectedItemId === item.id ? (
                        <input
                          type="text"
                          className={`form-control ${
                            validationErrors.contactno && "is-invalid"
                          }`}
                          value={formData.contactno}
                          onChange={(e) => handleInputChange(e)}
                          name="contactno"
                        />
                      ) : (
                        item.contactno
                      )}
                    </td>
                    <td>
                      {selectedItemId === item.id ? (
                        <input
                          type="email"
                          className={`form-control ${
                            validationErrors.email && "is-invalid"
                          }`}
                          value={formData.email}
                          onChange={(e) => handleInputChange(e)}
                          name="email"
                        />
                      ) : (
                        item.email
                      )}
                    </td>
                    <td>
                      {selectedItemId === item.id ? (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleSave(item)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm ms-2"
                            onClick={() => handleCancelEdit()}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleUpdate(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </>
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

export default SpocDetails;
