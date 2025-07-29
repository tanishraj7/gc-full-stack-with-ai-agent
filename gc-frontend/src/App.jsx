import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GinnisCart from "./ecom/GinnisCart";
import AIHelper from "./pages/AIHelper";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/ai-helper"
          element={
            <PrivateRoute>
              <AIHelper />
            </PrivateRoute>
          }
        />

      <Route
        path="/ginniscart"
        element={
          <PrivateRoute>
            <GinnisCart />
          </PrivateRoute>
        }
      />
      </Routes>
    </>
  );
}

export default App;
