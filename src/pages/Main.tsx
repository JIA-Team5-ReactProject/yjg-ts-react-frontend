import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/Sidebar";
import MainContainer from "../components/MainContainer";
import MainBg from "../components/MainBg";

function Main() {
  const location = useLocation();

  return (
    <div className="h-screen w-screen overflow-auto">
      <Header />
      <div className="flex h-full">
        <Sidebar />
        <MainContainer>
          {location.pathname === "/main" ? <MainBg /> : <Outlet />}
        </MainContainer>
      </div>
    </div>
  );
}

export default Main;
