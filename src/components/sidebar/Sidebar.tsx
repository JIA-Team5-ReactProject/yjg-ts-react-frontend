import testImg from "../../assets/schoolImg/test.jpg";
import SidePowerModal from "./SidePowerModal";

function Sidebar() {
  const user = {
    img: testImg,
    name: "이민혁",
    power: { salon: true, restaurant: false, admin: false },
  };

  return (
    <div className="bg-cyan-600/70 w-96 h-screen p-2 shadow-black/35 shadow-xl flex flex-col gap-10">
      <div className="border-4 border-cyan-900/75 mt-32 mx-4 grid grid-cols-7 p-5 h-44 gap-2">
        <div
          className="col-span-3 bg-cover bg-center rounded-full shadow-md shadow-inherit"
          style={{ backgroundImage: "url(" + user.img + ")" }}
        ></div>
        <div className="col-span-4 flex-col mt-4">
          <p className="text-center self-center text-white text-2xl font-bold underline underline-offset-8">
            {user.name} 님
          </p>
          <div className="flex gap-2 mt-7 text-sm font-bold">
            <button
              className="flex-1 py-3 rounded-3xl bg-cyan-400/70 uppercase text-white shadow-md shadow-inherit transition-all hover:shadow-sm hover:shadow-inherit  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              내정보
            </button>
            <button
              className="flex-1 py-3 rounded-3xl bg-cyan-600 uppercase text-white shadow-md shadow-inherit transition-all hover:shadow-sm hover:shadow-inherit focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
      <SidePowerModal />
    </div>
  );
}

export default Sidebar;
