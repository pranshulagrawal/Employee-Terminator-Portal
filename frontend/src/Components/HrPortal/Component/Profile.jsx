import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    if (name === "newPassword" || name === "confirmNewPassword") {
      const newPassword = name === "newPassword" ? value : formData.newPassword;
      const confirmNewPassword =
        name === "confirmNewPassword" ? value : formData.confirmNewPassword;
  
      if (newPassword !== confirmNewPassword) {
        setValidationErrors({
          ...validationErrors,
          confirmNewPassword: "Passwords do not match",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          confirmNewPassword: "",
        });
      }
  
      if (name === "newPassword" && validatePassword(value)) {
        setValidationErrors({
          ...validationErrors,
          newPassword: "",
        });
      }
    }
  };
  

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const employeeId = sessionStorage.getItem("employee_id");

    if (!validatePassword(formData.newPassword)) {
      setValidationErrors({
        ...validationErrors,
        newPassword:
          "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one special character, and one number",
      });
      return;
    }

    console.log(employeeId);
    console.log(formData.oldPassword);
    console.log(formData.newPassword);

    axios
      .put(`http://localhost:9000/hr/changePassword/`, {
        employee_id: employeeId,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      })
      .then((response) => {
        console.log(response.data);
        alert("Password changed successfully");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setValidationErrors({});
        closeDialog();
      })
      .catch((error) => {
        console.error(error);
        alert("Invalid old password");
      });
  };

  return (
    <div className="d-flex justify-content-end mb-2">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
            <div className="card p-3 py-4">
              <div className="text-center">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/006/017/842/small_2x/customer-service-icon-user-with-laptop-computer-and-headphone-illustration-free-vector.jpg"
                  width="200"
                  className="rounded-circle"
                />
              </div>
              <div className="col-md-12 pt-5">
                <table className="table table-light mx-auto table-hover table-striped">
                  <tbody className="col">
                    <tr className="col-lg-6">
                      <td className="border">HR ID</td>
                      <td className="border">
                        {sessionStorage.getItem("employee_id")}
                      </td>
                    </tr>
                    <tr className="col-lg-6">
                      <td className="border">Name</td>
                      <td className="border">
                        {sessionStorage.getItem("name")}
                      </td>
                    </tr>
                    <tr className="col-lg-6">
                      <td className="border">Email</td>
                      <td className="border">
                        {sessionStorage.getItem("email_id")}
                      </td>
                    </tr>
                    <tr className="col-lg-6">
                      <td className="border">Role</td>
                      <td className="border">
                        {sessionStorage.getItem("role")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row mt-3">
                <div className="col-12 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={toggleDialog}
                  >
                    Change Password
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
                          <h5 className="modal-title text-center">
                            Change Password
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={closeDialog}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={handlePasswordChange}>
                            <div className="mb-3">
                              <label
                                htmlFor="oldPassword"
                                className="form-label"
                              >
                                Old Password
                              </label>
                              <input
                                type="password"
                                className={`form-control ${
                                  validationErrors.oldPassword && "is-invalid"
                                }`}
                                id="oldPassword"
                                name="oldPassword"
                                required
                                value={formData.oldPassword}
                                onChange={handleInputChange}
                              />
                              {validationErrors.oldPassword && (
                                <div className="invalid-feedback">
                                  {validationErrors.oldPassword}
                                </div>
                              )}
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="newPassword"
                                className="form-label"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                className={`form-control ${
                                  validationErrors.newPassword && "is-invalid"
                                }`}
                                id="newPassword"
                                name="newPassword"
                                required
                                value={formData.newPassword}
                                onChange={handleInputChange}
                              />
                              {validationErrors.newPassword && (
                                <div className="invalid-feedback">
                                  {validationErrors.newPassword}
                                </div>
                              )}
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="confirmNewPassword"
                                className="form-label"
                              >
                                Confirm New Password
                              </label>
                              <input
                                type="password"
                                className={`form-control ${
                                  validationErrors.confirmNewPassword &&
                                  "is-invalid"
                                }`}
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                required
                                value={formData.confirmNewPassword}
                                onChange={handleInputChange}
                              />
                              {validationErrors.confirmNewPassword && (
                                <div className="invalid-feedback">
                                  {validationErrors.confirmNewPassword}
                                </div>
                              )}
                            </div>

                            <button type="submit" className="btn btn-primary">
                              Change Password
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
