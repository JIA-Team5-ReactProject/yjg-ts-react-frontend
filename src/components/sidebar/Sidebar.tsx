import { useRecoilValue } from "recoil";
import SidePowerModal from "./SidePowerModal";
import { UserDataAtom } from "../../recoil/UserDataAtiom";
import { admin, master, restaurant, salon } from "../../constants/powerList";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../services/customAxios";

function Sidebar() {
  const userData = useRecoilValue(UserDataAtom);
  const navigate = useNavigate();

  //로그아웃 함수
  const logoutPost = async () => {
    await customAxios.post("/api/admin/logout");
    navigate("/login");
  };

  return (
    <div className="bg-cyan-600/70 w-96 h-full p-2 shadow-black/35 shadow-xl flex flex-col gap-10 overflow-auto">
      <div className="border-4 border-cyan-900/75 mt-32 mx-4 grid grid-cols-7 p-5 h-44 gap-2">
        <div
          className="col-span-3 bg-cover bg-center rounded-full shadow-md shadow-inherit"
          style={{ backgroundImage: "url(" + userData.img + ")" }}
        ></div>
        <div className="col-span-4 flex-col mt-4">
          <p className="text-center self-center text-white text-2xl font-bold underline underline-offset-8">
            {userData.name} 님
          </p>
          <div className="flex gap-2 mt-7 text-sm font-bold">
            <button
              className="flex-1 py-3 rounded-3xl bg-cyan-400/70 uppercase text-white shadow-md shadow-inherit transition-all hover:shadow-sm hover:shadow-inherit  focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={() => {
                navigate("/main/mypage");
              }}
            >
              내정보
            </button>
            <button
              onClick={() => {
                logoutPost();
              }}
              className="flex-1 py-3 rounded-3xl bg-cyan-600 uppercase text-white shadow-md shadow-inherit transition-all hover:shadow-sm hover:shadow-inherit focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
      {userData.power.master ? <SidePowerModal power={master} /> : null}
      {userData.power.salon_privilege ? <SidePowerModal power={salon} /> : null}
      {userData.power.restaurant_privilege ? (
        <SidePowerModal power={restaurant} />
      ) : null}
      {userData.power.admin_privilege ? <SidePowerModal power={admin} /> : null}
    </div>
  );
}

export default Sidebar;
