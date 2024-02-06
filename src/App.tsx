import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Join from "./pages/Join";
import FindMyAccount from "./pages/FindMyAccount";
import Mypage from "./pages/Mypage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/findIdPw" element={<FindMyAccount />} />
        <Route path="/main" element={<Main />}>
          <Route path="mypage" element={<Mypage />} />
          <Route path="master" element />
          <Route path="salon" element />
          <Route path="admin" element />
          <Route path="restaurant" element />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
