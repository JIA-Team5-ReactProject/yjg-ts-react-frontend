import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/Sidebar";
import MainContainer from "../components/MainContainer";

function Main() {
  return (
    <div className="h-screen w-screen overflow-auto">
      <Header />
      <div className="flex h-full">
        <Sidebar />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </div>
  );
}

export default Main;
