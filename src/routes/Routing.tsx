import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Join from "../pages/auth/Join";
import FindMyAccount from "../pages/auth/FindMyAccount";
import FindResult from "../pages/auth/FindResult";
import Main from "../pages/Main";
import Mypage from "../pages/Mypage";
import ProtectedRoute from "./ProtectedRoute";
import MasterRoutes from "./MasterRoutes";
import AdminRoutes from "./AdminRoutes";
import SalonRoutes from "./SalonRoutes";
import RestaurantRoutes from "./RestaurantRoutes";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/findIdPw" element={<FindMyAccount />} />
      <Route path="/findIdPw/result" element={<FindResult />} />
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
          element={<ProtectedRoute power="admin" children={<AdminRoutes />} />}
        />
        <Route
          path="salon/*"
          element={<ProtectedRoute power="salon" children={<SalonRoutes />} />}
        />
        <Route
          path="restaurant/*"
          element={
            <ProtectedRoute
              power="restaurant"
              children={<RestaurantRoutes />}
            />
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
