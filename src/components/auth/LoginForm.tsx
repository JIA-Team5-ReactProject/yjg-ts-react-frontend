import { useNavigate } from "react-router-dom";

function LoginForm(): JSX.Element {
  let navigate = useNavigate();

  return (
    <form>
      <div className="flex flex-col bg-sky-200/75 rounded-3xl aspect-video p-10 min-w-96 max-w-xl m-auto">
        <p className="font-bold text-3xl text-center mb-14 mt-2">로그인</p>
        <input
          type="text"
          placeholder="아이디"
          className="mb-6 p-3 outline-slate-100"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="p-3 mb-2 outline-slate-100"
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
              navigate("/findIdPw");
            }}
          >
            아이디 / 비밀번호 찾기
          </p>
        </div>
        <button
          className="rounded-xl mt-10 ml-auto px-7 bg-cyan-600 py-2 text-base font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
        >
          로그인
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
