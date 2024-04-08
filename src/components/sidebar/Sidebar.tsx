import { useRecoilValue, useSetRecoilState } from "recoil";
import SidePowerModal from "./SidePowerModal";
import { LoginStateAtom, UserDataAtom } from "../../recoil/UserDataAtiom";
import { admin, master, restaurant, salon } from "../../constants/powerList";
import { useNavigate } from "react-router-dom";
import { privateApi } from "../../services/customAxios";
import symbolImg from "../../assets/schoolImg/simbol.png";

function Sidebar() {
  const userData = useRecoilValue(UserDataAtom);
  const navigate = useNavigate();
  // 로그인 상태 전역 변수
  const setLoginState = useSetRecoilState(LoginStateAtom);

  // 로그아웃 함수
  const logoutPost = async () => {
    try {
      await privateApi.post("/api/logout");
      setLoginState(false);
      sessionStorage.removeItem("userToken");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-cyan-600/70 min-w-[23rem] h-full p-2 shadow-black/35 shadow-xl flex flex-col gap-10 overflow-scroll">
      <div className="rounded-2xl border-4 border-cyan-900/70 mt-28 mx-4 grid grid-cols-7 p-5 h-44 gap-2">
        <div className="relative col-span-3">
          <img
            src={symbolImg}
            className="absolute w-full object-cover inset-y-2"
          />
        </div>
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
                logoutPost().then(() => {
                  navigate("/");
                });
              }}
              className="flex-1 py-3 rounded-3xl bg-cyan-600 uppercase text-white shadow-md shadow-inherit transition-all hover:shadow-sm hover:shadow-inherit focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
      {userData.power.includes("master") ? (
        <SidePowerModal power={master} />
      ) : null}
      {userData.power.includes("salon") ? (
        <SidePowerModal power={salon} />
      ) : null}
      {userData.power.includes("restaurant") ? (
        <SidePowerModal power={restaurant} />
      ) : null}
      {userData.power.includes("admin") ? (
        <SidePowerModal power={admin} />
      ) : null}
    </div>
  );
}

export default Sidebar;
