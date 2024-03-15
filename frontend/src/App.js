import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/LoginComponent";
import Signup from "./Components/SignupComponent";
import { isAuthenticated, isMaintenanceMode } from "./Auth/UserAuth"; // Import the isAuthenticated function
import MaintenancePage from "./Components/Error/MaintenancePage";
import Test from "./Components/TestComponent";
import ProductUpdate from "./Components/ProductUpdateComponent";
import Products from "./Components/ProductsComponent";
import Dashboard from "./Components/DashboardComponent";
import ReviewProduct from "./Components/ReviewedComponent";
import ReviewAdminUpdate from "./Components/ReviewedUpdateComponent";
import User from "./Components/UserComponent";
import MemberReviewProduct from "./Components/MemberUpdatedComponent";

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

const PrivateLoginRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    <Navigate to="/dashboard" replace={true} />
  ) : (
    element
  );
};


const App = () => {
  if (isMaintenanceMode()) {
    return <MaintenancePage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PrivateLoginRoute element={<Login />} />} />
        <Route path="/" element={<Signup />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />

        <Route
          path="/products"
          element={<PrivateRoute element={<Products />} />}
        />

        <Route
          path="/test"
          element={<PrivateRoute element={<Test />} />}
        />

        <Route
          path="/updateproduct"
          element={<PrivateRoute element={< ProductUpdate />} />}
        />
        <Route
          path="/reviewproduct"
          element={<PrivateRoute element={< ReviewProduct />} />}
        />

        <Route
          path="/reviewupdateproduct"
          element={<PrivateRoute element={< ReviewAdminUpdate />} />}
        />

        <Route
          path="/userstatus"
          element={<PrivateRoute element={< User />} />}
        />

        <Route
          path="/memberupdatedproduct"
          element={<PrivateRoute element={< MemberReviewProduct />} />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;