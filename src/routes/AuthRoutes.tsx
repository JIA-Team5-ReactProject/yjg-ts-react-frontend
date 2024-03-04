import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Join from "../pages/auth/Join";
import FindMyAccount from "../pages/auth/FindMyAccount";
import FindResult from "../pages/auth/FindResult";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/findIdPw" element={<FindMyAccount />} />
      <Route path="/findIdPw/result" element={<FindResult />} />
    </Routes>
  );
}

export default AuthRoutes;
