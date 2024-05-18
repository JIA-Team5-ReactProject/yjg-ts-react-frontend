import { Route, Routes } from "react-router-dom";
import Notice from "../pages/admin/Notice";
import Repair from "../pages/admin/Repair";
import StayOut from "../pages/admin/StayOut";
import MeetingRoom from "../pages/admin/MeetingRoom";
import BusTimeTable from "../pages/admin/BusTimeTable";
import Reading from "../pages/post/Reading";
import Writing from "../pages/post/Writing";
import Modifying from "../pages/post/Modifying";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/notice" element={<Notice />} />
      <Route path="/repair" element={<Repair />} />
      <Route path="/stayOut" element={<StayOut />} />
      <Route path="/meetingRoom" element={<MeetingRoom />} />
      <Route path="/busTimeTable" element={<BusTimeTable />} />
      <Route path="/reading/:id" element={<Reading />} />
      <Route path="/writing" element={<Writing />} />
      <Route path="/modifying/:id" element={<Modifying />} />
    </Routes>
  );
}

export default AdminRoutes;
