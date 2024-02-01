import jwtHeader from "../assets/schoolImg/logo_header.png";

function Header() {
  return (
    <div className="bg-cyan-700 p-6 shadow-black/20 shadow-md fixed w-full">
      <div className="flex justify-center">
        <img src={jwtHeader} alt="logo" className="w-96" />
      </div>
    </div>
  );
}
export default Header;
