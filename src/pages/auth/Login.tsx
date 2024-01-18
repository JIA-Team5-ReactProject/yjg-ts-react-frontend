import { useNavigate } from "react-router-dom";
import schoolBg from "../../assets/image/school.jpg";
import jwtLogo from "../../assets/image/simbol.png";

function Login() {
  let navigate = useNavigate();

  return (
    <div>
      <div
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(" + schoolBg + ")" }}
      >
        <div className="bg-cyan-800/80 h-full p-5 bg-auto overflow-scroll">
          <div>
            <img src={jwtLogo} alt="logo" className="w-28 mb-6" />
          </div>
          <form>
            <div className="flex flex-col bg-sky-200/75 rounded-3xl aspect-video p-10 min-w-96 max-w-xl m-auto">
              <p className="font-bold text-3xl text-center mb-10 mt-2">
                로그인
              </p>
              <input
                type="text"
                placeholder="아이디"
                className="mb-6 p-3 outline-slate-100"
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="p-3 mb-1 outline-slate-100"
              />
              <div className="flex gap-3">
                <p
                  className="p-1 underline underline-offset-4 text-gray-500/80 font-bold text-sm cursor-pointer"
                  onClick={() => {
                    navigate("/join");
                  }}
                >
                  회원가입
                </p>
                <p
                  className="p-1 underline underline-offset-4 text-gray-500/80 font-bold text-sm cursor-pointer"
                  onClick={() => {
                    navigate("/idpw-find");
                  }}
                >
                  아이디 / 비밀번호 찾기
                </p>
              </div>
              <button
                className="rounded-xl ml-auto px-7 bg-cyan-600 py-3 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
