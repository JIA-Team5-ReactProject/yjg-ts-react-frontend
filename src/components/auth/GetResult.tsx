import { useLocation, useNavigate } from "react-router-dom";
import { ListBtn } from "../master/UserList";
import { SubmitHandler, useForm } from "react-hook-form";
import { passwordValues } from "../../types/auth";
import FormInput from "./FormInput";
import { passwordReg } from "../../utils/regex";
import { publicApi } from "../../services/customAxios";

function GetResult() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordValues>();

  // 값 받아오기
  const location = useLocation();
  const state = location.state.state;
  const value = location.state.value;
  // 현재 비밀번호 값
  const password = watch("password");

  const navigate = useNavigate();

  // 비밀번호 재설정 함수
  const onSubmit: SubmitHandler<passwordValues> = async (data) => {
    try {
      await publicApi.patch(
        "/api/reset-password",
        {
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        }
      );
      alert("비밀번호 변경이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-14 bg-sky-200/90 rounded-3xl aspect-video p-10 min-w-fit max-w-screen-sm m-auto">
      {state === "id" ? (
        <>
          <div className="font-bold text-xl text-center">아이디 찾기</div>
          <div className="text-lg font-bold text-center">
            <span className="text-blue-800">{value.name}</span>님의 아이디
            찾기를 완료되었습니다.
          </div>
          <div className="font-bold text-2xl text-center border-b-4 border-b-black pb-2 mx-20">
            {value.email}
          </div>
          <div className="text-center">
            <ListBtn
              value="로그인 페이지"
              color="bg-cyan-700/90"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="font-bold text-xl text-center mb-10">
            비밀번호 찾기
          </div>
          <div className="text-lg font-bold text-center mb-4">
            비밀번호를 재설정합니다.
          </div>
          <FormInput
            type="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호 입력 ( 영문, 숫자 포함 10자 이상 )"
            register={register("password", {
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value: passwordReg,
                message: "영문, 숫자를 포함한 10자 이상을 입력해주세요.",
              },
            })}
            errorMessage={errors?.password && errors.password.message}
          />
          <FormInput
            type="password"
            name="pwCheck"
            label="비밀번호 확인"
            placeholder="비밀번호 재입력"
            register={register("pwCheck", {
              required: "비밀번호를 한번 더 입력해주세요.",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
            errorMessage={errors?.pwCheck && errors.pwCheck.message}
          />
          <button
            type="submit"
            className="w-1/2 mx-auto rounded-xl bg-cyan-600 py-3 text-xl font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            변경하기
          </button>
        </form>
      )}
    </div>
  );
}

export default GetResult;
