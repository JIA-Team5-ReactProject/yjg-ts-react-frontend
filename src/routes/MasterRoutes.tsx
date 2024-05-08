import { Route, Routes } from "react-router-dom";
import Master from "../pages/master/Master";
import Management from "../pages/master/Management";

function MasterRoutes() {
  return (
    <Routes>
      <Route path="unapprovedUser" element={<Master />} />
      <Route path="management" element={<Management />} />
    </Routes>
  );
}

export default MasterRoutes;
