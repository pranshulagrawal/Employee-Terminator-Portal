import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import EmployeeDashboard from "./Components/EmployeePortal/EmpDashobard"; // Corrected the component name
import HrDashboard from "./Components/HrPortal/HrDashboard";
import ManagerDashboard from "./Components/ManagerPortal/ManagerDashboard";
import LoginPage from "./Components/LoginPage";

function ProtectedRoute({ element, allowedRoles }) {
  const userRole = sessionStorage.getItem("role");

  if (allowedRoles.includes(userRole)) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-purple">
        <div className="col-md-11">
          <Routes>
            <Route
              path="/"
              element={
                <div
                  className="card vh-90 bg-body-tertiary border-0"
                  style={{ height: "95vh", overflowY: "scroll", scrollbarWidth: "none"}}
                >
                  <Outlet />
                </div>
              }
            >
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="hrdash/*"
                element={
                  <ProtectedRoute
                    allowedRoles={["HR"]}
                    element={<HrDashboard />}
                  />
                }
              />
              <Route
                path="empdash/*"
                element={
                  <ProtectedRoute
                    allowedRoles={["Employee"]}
                    element={<EmployeeDashboard />}
                  />
                }
              />
              <Route
                path="managdash/*"
                element={
                  <ProtectedRoute
                    allowedRoles={["Manager"]}
                    element={<ManagerDashboard />}
                  />
                }
              />
            </Route>
            ``
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
