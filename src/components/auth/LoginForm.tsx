import React, { ReactElement, ReactHTML, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormValues } from "../../types/login";
import { watch } from "fs";
import { trimValues } from "../../utils/validate";

function LoginForm(): JSX.Element {
  const {
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["rememberId"]);
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setValue("id", cookies.rememberId);
      setIsRemember(true);
    }
  }, []);

  const handleOnChange = () => {
    if (isRemember) {
      setCookie("rememberId", watch("id"));
    } else {
      removeCookie("rememberId");
    }
  };
  //로그인 제출 함수
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const trimData = trimValues(data);
    handleOnChange();
    console.log(trimData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col bg-sky-200/90 rounded-3xl aspect-video p-10 min-w-96 max-w-xl m-auto">
        <p className="font-bold text-3xl text-center mb-14 mt-2">로그인</p>
        {errors?.id && (
          <span className="text-red-500 text-xs font-bold translate-x-2 tracking-tight mb-2">
            {errors.id.message}
          </span>
        )}
        <input
          type="text"
          placeholder="아이디"
          className="mb-6 p-3 outline-slate-100"
          {...register("id", {
            required: "아이디를 입력해주세요.",
          })}
        />
        {errors?.password && (
          <span className="text-red-500 text-xs font-bold translate-x-2 tracking-tight mb-2">
            {errors.password.message}
          </span>
        )}
        <input
          type="password"
          placeholder="비밀번호"
          className="p-3 mb-2 outline-slate-100"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
        />
        <div className="flex gap-3 justify-between ">
          <label htmlFor="id" className="flex pl-2">
            <input
              type="checkbox"
              id="saveId"
              onChange={() => {
                setIsRemember(!isRemember);
              }}
              checked={isRemember}
            />
            <p className="p-1 text-gray-500/80 font-bold text-sm cursor-pointer">
              아이디 저장
            </p>
          </label>
          <div className="flex gap-2">
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
        </div>
        <button
          type="submit"
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
