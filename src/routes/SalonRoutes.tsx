import { Route, Routes } from "react-router-dom";
import ReservationList from "../pages/salon/ReservationList";
import SalonPending from "../pages/salon/SalonPending";
import SalonPrice from "../pages/salon/SalonPrice";

function SalonRoutes() {
  return (
    <Routes>
      <Route path="/reservation" element={<ReservationList />} />
      <Route path="/pending" element={<SalonPending />} />
      <Route path="/priceCorrection" element={<SalonPrice />} />
    </Routes>
  );
}

export default SalonRoutes;
