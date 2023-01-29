import { Route, Routes } from "react-router-dom";
import "./App.css";
import BillingTable from "./components/billingTable/BillingTable";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Register from "./components/registration/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route
          path="/billsTable"
          element={
            <PrivateRoute>
              <BillingTable />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
