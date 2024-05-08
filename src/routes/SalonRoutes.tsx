import { Route, Routes } from "react-router-dom";
import Salon from "../pages/salon/Salon";
import SalonPending from "../pages/salon/SalonPending";
import SalonPrice from "../pages/salon/SalonPrice";

function SalonRoutes() {
  return (
    <Routes>
      <Route path="/reservation" element={<Salon />} />
      <Route path="/pending" element={<SalonPending />} />
      <Route path="/priceCorrection" element={<SalonPrice />} />
    </Routes>
  );
}

export default SalonRoutes;
