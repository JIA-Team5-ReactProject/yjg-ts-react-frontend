import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/Sidebar";

function Main() {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex gap-6">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
