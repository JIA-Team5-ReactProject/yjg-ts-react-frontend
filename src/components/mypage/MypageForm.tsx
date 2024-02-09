import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserDataAtom } from "../../recoil/UserDataAtiom";
import { SubmitHandler, useForm } from "react-hook-form";
import { JoinFormValues } from "../../types/auth";
import { nameReg, passwordReg, phoneNumReg } from "../../utils/regex";
import { trimValues } from "../../utils/validate";
import { customAxios } from "../../services/customAxios";

function MypageForm() {
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinFormValues>();
  //수정중인지 아닌지 체크
  const [onChange, setOnChange] = useState(false);
  //소유권한 체크
  const [powerData, setPowerData] = useState<string[]>([]);
  //유저 데이터
  const userData = useRecoilValue(UserDataAtom);
  const password = watch("password");
  useEffect(() => {
    //권한 업데이트
    const trueKeys = Object.entries(userData.power)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    setPowerData(trueKeys);
  }, []);
  useEffect(() => {
    //수정 기본값 넣어주기
    setValue("name", userData.name);
    setValue("phone", userData.phone);
  }, [onChange]);

  //정보수정 제출 함수
  const onSubmit: SubmitHandler<JoinFormValues> = async (data) => {
    const trimData = trimValues(data);

    const changePatch = await customAxios.post("/api/admin", {
      name: trimData.name,
      phone_number: trimData.phone,
      password: trimData.password,
    });
    alert("수정완료");
  };

  return (
    <>
      {onChange ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 p-12 text-xl gap-y-5 font-semibold w-2/3"
        >
          <div className="col-span-2 text-4xl font-bold mb-10">내정보</div>
          <div>
            이름
            {errors?.name && (
              <span className="text-red-500 text-xs font-bold translate-x-2 tracking-tight mb-2 ml-2">
                {errors.name.message}
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="이름 입력 ( 한글 )"
            className=" outline-black border-2 border-gray-300 pl-1"
            {...register("name", {
              required: "이름을 입력해주세요.",
              pattern: {
                value: nameReg,
                message: "한글로 2~5자를 입력해주세요.",
              },
            })}
          />
          <div>
            전화번호
            {errors?.phone && (
              <span className="text-red-500 text-xs font-bold translate-x-2 tracking-tight mb-2 ml-2">
                {errors.phone.message}
              </span>
            )}
          </div>
          <input
            type="tel"
            placeholder="휴대폰 번호 입력 ( '-' 제외 11자리 )"
            className=" outline-black border-2 border-gray-300 pl-1"
            {...register("phone", {
              required: "전화번호를 입력해주세요.",
              pattern: {
                value: phoneNumReg,
                message: "11자리 숫자를 입력해주세요.",
              },
            })}
          />
          <div>이메일</div> <div>{userData.email}</div>
          <div>
            비밀번호
            {errors?.password && (
              <span className="text-red-500 text-xs font-bold translate-x-2 tracking-tight mb-2 ml-2">
                {errors.password.message}
              </span>
            )}
          </div>
          <input
            type="password"
            placeholder="비밀번호 입력 ( 영문, 숫자 포함 10자 이상 )"
            className=" outline-black border-2 border-gray-300 pl-1"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value: passwordReg,
                message: "영문, 숫자를 포함한 10자 이상을 입력해주세요.",
              },
            })}
          />
          <div>
            비밀번호체크
            {errors?.pwCheck && (
              <span className="text-red-500 text-xs font-bold translate-x-2 tracking-tight mb-2 ml-2">
                {errors.pwCheck.message}
              </span>
            )}
          </div>
          <input
            type="password"
            placeholder="비밀번호 재입력"
            className=" outline-black border-2 border-gray-300 pl-1"
            {...register("pwCheck", {
              required: "비밀번호를 한번 더 입력해주세요.",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
          />
          <div className="col-span-2 space-x-3 justify-self-end">
            <button
              type="submit"
              className="rounded-xl mt-6 ml-auto px-7 bg-cyan-600 py-2 text-base font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              확인
            </button>
            <button
              className="rounded-xl mt-6 ml-auto px-7 bg-cyan-600 py-2 text-base font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={() => {
                setOnChange(false);
                reset();
              }}
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 p-12 text-xl gap-y-5 font-semibold w-2/3">
          <div className="col-span-2 text-4xl font-bold mb-10">내정보</div>
          <div>이름</div> <div>{userData.name}</div>
          <div>전화번호</div> <div>{userData.phone}</div>
          <div>이메일</div> <div>{userData.email}</div>
          <div>비밀번호</div>
          <div>**********</div>
          <div>권한</div>
          <div>{powerData.join(" ")}</div>
          <button
            className="col-span-2 rounded-xl mt-6 ml-auto px-7 bg-cyan-600 py-2 text-base font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={() => {
              setOnChange(true);
            }}
          >
            수정
          </button>
        </div>
      )}
    </>
  );
}

export default MypageForm;
