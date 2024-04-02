import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/Sidebar";

function Main() {
  return (
    <div className="h-screen w-screen overflow-auto">
      <Header />
      <div className="flex h-full">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
