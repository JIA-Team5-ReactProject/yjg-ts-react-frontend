import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";

function JoinForm(): JSX.Element {
  const navigate = useNavigate();

  return (
    <form>
      <div className="flex flex-col bg-sky-200/75 rounded-3xl aspect-video p-10 min-w-96 max-w-xl m-auto">
        <p className="font-bold text-3xl text-center mb-10 mt-2">회원가입</p>
        <FormInput type="text" name="name" label="이름" />
        <FormInput type="text" name="id" label="아이디" check="중복체크" />
        <FormInput type="password" name="pw" label="비밀번호" />
        <FormInput type="password" name="pwCheck" label="비밀번호 확인" />
        <FormInput type="email" name="email" label="메일 입력" />
        <FormInput type="tel" name="phone" label="전화번호" />
        <button
          className="rounded-xl bg-cyan-600 py-3 text-xl font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
        >
          가입하기
        </button>
      </div>
    </form>
  );
}

export default JoinForm;
