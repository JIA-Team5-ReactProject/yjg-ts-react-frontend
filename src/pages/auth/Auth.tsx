import { Outlet } from "react-router-dom";
import schoolBg from "../../assets/image/school.jpg";
import jwtLogo from "../../assets/image/simbol.png";

function Auth() {
  return (
    <div>
      <div
        className="bg-cover bg-center h-dvh"
        style={{ backgroundImage: "url(" + schoolBg + ")" }}
      >
        <div className="bg-cyan-800/80 h-full p-5">
          <div>
            <img src={jwtLogo} alt="logo" className="w-28 mb-6" />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
