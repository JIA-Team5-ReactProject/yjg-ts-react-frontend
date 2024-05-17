import { useNavigate } from "react-router-dom";
import logoHeader from "../assets/schoolImg/logo_header.png";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-cyan-700 p-6 shadow-black/20 shadow-md fixed w-screen z-30">
      <div className="flex justify-center">
        <img
          src={logoHeader}
          alt="logo"
          className="w-96 cursor-pointer"
          onClick={() => {
            navigate("/main");
          }}
        />
      </div>
    </div>
  );
}
export default Header;
