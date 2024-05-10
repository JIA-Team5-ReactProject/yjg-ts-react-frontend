import { Route, Routes } from "react-router-dom";
import NotApproved from "../pages/master/NotApproved";
import Management from "../pages/master/Management";

function MasterRoutes() {
  return (
    <Routes>
      <Route path="management" element={<Management />} />
      <Route path="unapprovedUser" element={<NotApproved />} />
    </Routes>
  );
}

export default MasterRoutes;
