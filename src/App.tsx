import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Main from "./pages/Main";
import Join from "./pages/auth/Join";
import FindMyAccount from "./pages/auth/FindMyAccount";
import Mypage from "./pages/Mypage";
import Master from "./pages/master/Master";
import Salon from "./pages/salon/Salon";
import SalonPending from "./pages/salon/SalonPending";
import SalonPrice from "./pages/salon/SalonPrice";
import FindResult from "./pages/auth/FindResult";
import Admin from "./pages/admin/Admin";
import Repair from "./pages/admin/Repair";
import Reading from "./pages/post/Reading";
import StayOut from "./pages/admin/StayOut";
import MeetingRoom from "./pages/admin/MeetingRoom";
import BusTimeTable from "./pages/admin/BusTimeTable";
import Writing from "./pages/post/Writing";
import Modifying from "./pages/post/Modifying";
import Management from "./pages/master/Management";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/findIdPw" element={<FindMyAccount />} />
        <Route path="/findIdPw/result" element={<FindResult />} />
        <Route path="/main" element={<Main />}>
          <Route path="mypage" element={<Mypage />} />
          <Route path="master" element={<Master />} />
          <Route path="master/management" element={<Management />} />
          <Route path="salon" element={<Salon />} />
          <Route path="salon/pending" element={<SalonPending />} />
          <Route path="salon/priceCorrection" element={<SalonPrice />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/repair" element={<Repair />} />
          <Route path="admin/stayOut" element={<StayOut />} />
          <Route path="admin/meetingRoom" element={<MeetingRoom />} />
          <Route path="admin/busTimeTable" element={<BusTimeTable />} />
          <Route path="post/reading/:id" element={<Reading />} />
          <Route path="post/writing" element={<Writing />} />
          <Route path="post/modifying/:id" element={<Modifying />} />
          <Route path="restaurant" element />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
