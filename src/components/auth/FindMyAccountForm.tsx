import { useState } from "react";
import FormInput from "./FormInput";

type FindMyAccountType = "findingId" | "findingPassword";

function FindMyAccountForm(): JSX.Element {
  const [findingAccount, setFindingAccount] =
    useState<FindMyAccountType>("findingId");

  return (
    <form>
      <div className="flex min-w-96 max-w-xl m-auto text-center font-bold">
        <div
          className={`${
            findingAccount === "findingId"
              ? "bg-sky-200/75"
              : "bg-sky-200/50 text-black/30"
          } flex-1 rounded-t-full py-3 cursor-pointer transition-all duration-500 ease-in-out`}
          onClick={() => {
            setFindingAccount("findingId");
          }}
        >
          아이디 찾기
        </div>
        <div
          className={`${
            findingAccount === "findingPassword"
              ? "bg-sky-200/75"
              : "bg-sky-200/50 text-black/30"
          } flex-1 rounded-t-full py-3 cursor-pointer transition-all duration-500 ease-in-out`}
          onClick={() => {
            setFindingAccount("findingPassword");
          }}
        >
          비밀번호 찾기
        </div>
      </div>
      <div className="flex flex-col bg-sky-200/75 rounded-b-3xl  aspect-video p-10 min-w-96 max-w-xl m-auto ">
        {findingAccount === "findingId" ? (
          <>
            <FormInput type="text" name="name" label="이름" />
            <FormInput type="email" name="email" label="메일 입력" />
          </>
        ) : (
          <>
            <FormInput type="text" name="id" label="아이디" />
            <FormInput
              type="email"
              name="email"
              label="메일 입력"
              check="인증번호"
            />
            <FormInput type="text" name="" label="인증번호" />
          </>
        )}
        <button
          className="rounded-xl bg-cyan-600 py-3 mt-10 text-xl font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
        >
          {findingAccount === "findingId" ? "아이디 찾기" : "비밀번호 찾기"}
        </button>
      </div>
    </form>
  );
}

export default FindMyAccountForm;
