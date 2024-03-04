import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Mypage from "../pages/Mypage";
import MasterRoutes from "./MasterRoutes";
import AdminRoutes from "./AdminRoutes";
import SalonRoutes from "./SalonRoutes";
import RestaurantRoutes from "./RestaurantRoutes";
import ProtectedRoute from "./ProtectedRoute";

function MainRoute() {
  return (
    <Routes>
      <Route path="/main" element={<Main />}>
        <Route path="mypage" element={<Mypage />} />
        <Route
          path="master/*"
          element={
            <ProtectedRoute power="master" children={<MasterRoutes />} />
          }
        />
        <Route
          path="admin/*"
          element={
            <ProtectedRoute
              power="admin_privilege"
              children={<AdminRoutes />}
            />
          }
        />
        <Route
          path="salon/*"
          element={
            <ProtectedRoute
              power="salon_privilege"
              children={<SalonRoutes />}
            />
          }
        />
        <Route
          path="restaurant/*"
          element={
            <ProtectedRoute
              power="restaurant_privilege"
              children={<RestaurantRoutes />}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default MainRoute;
