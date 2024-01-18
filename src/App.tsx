import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Main from "./pages/Main";
import Join from "./pages/auth/Join";
import FindIdPw from "./pages/auth/FindIdPw";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/findIdPw" element={<FindIdPw />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
