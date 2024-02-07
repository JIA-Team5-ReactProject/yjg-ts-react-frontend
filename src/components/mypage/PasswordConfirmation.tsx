import { useRecoilValue } from "recoil";
import { UserDataAtom } from "../../recoil/UserDataAtiom";
import { useForm, SubmitHandler } from "react-hook-form";
import { passwordValues } from "../../types/auth";
import { trimValues } from "../../utils/validate";
import { customAxios } from "../../services/customAxios";

function PasswordConfirmation() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<passwordValues>();
  const userData = useRecoilValue(UserDataAtom);

  const onSubmit: SubmitHandler<passwordValues> = async (data) => {
    const trimData = trimValues(data);
    try {
      const pwCheckPost = await customAxios.post("/api/admin/verify-password", {
        password: trimData.password,
      });
      console.log(pwCheckPost);
    } catch (error) {
      setError("password", {
        type: "manual",
        message: "인증에 실패했습니다. 비밀번호를 확인해주세요.",
      });
    }
  };
  return (
    <div className="border border-black h-full w-full text-center">
      <p className="text-4xl font-bold mt-20">비밀번호확인</p>
      <div className="mt-24 text-sm">
        <p>
          {<span className="text-blue-600 text-xl">{userData.name}</span>}님의
          회원정보를 안전하게 보호하기 위해
        </p>
        <p>비밀번호를 한번 더 확인해 주세요.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col mt-16">
        {errors?.password && (
          <span className="text-red-500 text-xs font-bold translate-x-2 tracking-tight mb-2 ml-12">
            {errors.password.message}
          </span>
        )}
        <div>
          <label htmlFor="password" className="font-bold mr-2">
            ▶비밀번호
          </label>
          <input
            type="password"
            className="pl-2 border-2 border-gray-400"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
            })}
          />
        </div>
        <button
          type="submit"
          className="rounded-xl mt-40 ml-auto px-7 bg-cyan-600 py-2 text-base font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
        >
          확인
        </button>
      </form>
    </div>
  );
}

export default PasswordConfirmation;
