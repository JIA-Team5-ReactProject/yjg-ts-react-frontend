import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import MainRoute from "./MainRoute";
import NotFound from "../pages/NotFound";

function Routing() {
  return (
    <>
      <AuthRoutes />
      <MainRoute />
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Routing;
