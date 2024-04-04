import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Token, UserDataAtom } from "../../recoil/UserDataAtiom";
import { SubmitHandler, useForm } from "react-hook-form";
import { JoinFormValues, PostUserData } from "../../types/auth";
import { nameReg, passwordReg, phoneNumReg } from "../../utils/regex";
import { trimValues } from "../../utils/validate";
import { customAxios } from "../../services/customAxios";
import { ListBtn } from "../master/UserList";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "../../utils/formatPhoneNum";

function MypageForm() {
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinFormValues>();
  // 수정중인지 아닌지 체크
  const [onChange, setOnChange] = useState(false);
  // 비밀번호 변경하는지 체크
  const [pwChange, setPwChange] = useState(false);
  // 소유권한 체크
  const [powerData, setPowerData] = useState<string[]>([]);
  // 유저 데이터
  const userData = useRecoilValue(UserDataAtom);
  const token = useRecoilValue(Token);
  const password = watch("password");
  const navigate = useNavigate();

  // 권한 업데이트
  useEffect(() => {
    setPowerData(userData.power);
  }, []);

  // 수정 기본값 넣어주기
  useEffect(() => {
    setValue("name", userData.name);
    setValue("phone", userData.phone);
    setPwChange(false);
  }, [onChange]);

  // 정보수정 제출 함수
  const onSubmit: SubmitHandler<JoinFormValues> = async (data) => {
    const trimData = trimValues(data);
    const postData: PostUserData = {
      admin_id: userData.id,
    };
    if (pwChange) {
      postData.password = trimData.password;
    }
    if (userData.name !== trimData.name) {
      postData.name = trimData.name;
    }
    if (userData.phone !== trimData.phone) {
      postData.phone_number = trimData.phone;
    }
    try {
      await customAxios.patch("/api/admin", postData);
      alert("수정완료");
    } catch (error) {
      console.log(error);
    }
  };

  // 회원 탈퇴하기
  const deleteSelf = async () => {
    try {
      await customAxios.delete("/api/unregister", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 탈퇴 제출하기
  const onRemove = () => {
    if (window.confirm("회원탈퇴를 하시겠습니까?")) {
      alert("삭제되었습니다");
      deleteSelf();
      localStorage.removeItem("token");
      navigate("/");
    } else {
      alert("취소되었습니다.");
    }
  };

  return (
    <>
      {onChange ? (
        <div className="flex h-full items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white mx-auto grid grid-cols-2 p-24 text-xl gap-y-5 font-semibold w-2/3 h-fit rounded-2xl shadow-lg"
          >
            <div className="text-4xl font-bold mb-10">내정보</div>
            <div className="flex gap-2 items-center">
              <p className="flex">비밀번호 변경하기</p>
              <label className="relative cursor-pointer items-center">
                <input
                  id="switch-3"
                  type="checkbox"
                  className="peer sr-only"
                  onChange={() => {
                    setPwChange(!pwChange);
                  }}
                />
                <label htmlFor="switch-3" className="hidden"></label>
                <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-400 peer-checked:after:translate-x-full peer-focus:ring-blue-400"></div>
              </label>
            </div>
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
            {pwChange ? (
              <>
                <div>
                  새로운 비밀번호
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
                  비밀번호 체크
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
              </>
            ) : null}
            <div className="col-span-2 space-x-3 justify-self-end">
              <button
                type="submit"
                className="rounded-xl mt-6 ml-auto px-7 bg-blue-400/90 py-2 text-base font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                확인
              </button>
              <button
                className="rounded-xl mt-6 ml-auto px-7 bg-red-400/90 py-2 text-base font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-black/10 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="bg-white grid grid-cols-2 p-12 text-xl gap-y-5 font-semibold w-2/3 h-fit rounded-2xl shadow-lg">
            <div className="col-span-2 text-4xl font-bold mb-6">내정보</div>
            <div>이름</div> <div>{userData.name}</div>
            <div>전화번호</div> <div>{formatPhoneNumber(userData.phone)}</div>
            <div>이메일</div> <div>{userData.email}</div>
            <div>권한</div>
            <div className="flex flex-col gap-1">
              {powerData.map((v) => {
                return <div>{v}</div>;
              })}
            </div>
            <div className="col-span-2 flex justify-end gap-3 mt-3">
              <ListBtn
                value="수정"
                color="bg-orange-400/80"
                onClick={() => {
                  setOnChange(true);
                }}
              />
              <ListBtn
                value="회원탈퇴"
                color="bg-red-400/90"
                onClick={onRemove}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MypageForm;
