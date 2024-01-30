import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "./FormInput";
import { JoinFormValues } from "../../types/login";
import { useEffect, useState } from "react";
import { trimValues } from "../../utils/validate";

function JoinForm(): JSX.Element {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<JoinFormValues>();

  const password = watch("password");
  const id = watch("id");
  const [duplicateCheck, setDuplicateCheck] = useState(false);

  useEffect(() => {
    setDuplicateCheck(false);
  }, [id]);

  // 아이디 중복 체크 함수
  async function idDuplicateCheck(id: string) {
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(id);

    if (!isValid) {
      return Promise.reject(
        new Error(
          "아이디는 영어와 숫자가 각각 하나 이상 포함된 8~15자여야 합니다."
        )
      );
    }
    //중복체크 API
    setDuplicateCheck(true);
  }

  //회원가입 제출 함수
  const onSubmit: SubmitHandler<JoinFormValues> = (data) => {
    if (!duplicateCheck) {
      setError(
        "id",
        { message: "중복 체크를 해주세요." },
        { shouldFocus: true }
      );
      return;
    }
    const trimData = trimValues(data);
    console.log(trimData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col bg-sky-200/90 rounded-3xl aspect-video p-10 min-w-96 max-w-xl m-auto">
        <p className="font-bold text-3xl text-center mb-10 mt-2">회원가입</p>
        <FormInput
          type="text"
          name="name"
          label="이름"
          placeholder="이름 입력 ( 한글 )"
          register={register("name", {
            required: "이름을 입력해주세요.",
            pattern: {
              value: /^[가-힣]{2,5}$/,
              message: "한글로 2~5자를 입력해주세요.",
            },
          })}
          errorMessage={errors?.name && errors.name.message}
        />
        <FormInput
          type="text"
          name="id"
          label="아이디"
          check={{
            text: "중복체크",
            onCheck: () => {
              idDuplicateCheck(id).catch((error) => {
                alert(error);
              });
            },
            duplicateCheck: duplicateCheck,
          }}
          placeholder="아이디 입력 ( 6~15자 )"
          register={register("id", {
            required: "아이디를 입력해주세요.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/,
              message: "영문, 숫자를 포함한 6~15자를 입력해주세요.",
            },
          })}
          errorMessage={errors?.id && errors.id.message}
        />
        <FormInput
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호 입력 ( 영문, 숫자 포함 10자 이상 )"
          register={register("password", {
            required: "비밀번호를 입력해주세요.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/,
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
        <FormInput
          type="email"
          name="email"
          label="메일 입력"
          placeholder="이메일 입력 "
          register={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/,
              message: "@을 포함한 메일 양식을 입력해주세요.",
            },
          })}
          errorMessage={errors?.email && errors.email.message}
        />
        <FormInput
          type="tel"
          name="phone"
          label="전화번호"
          placeholder="휴대폰 번호 입력 ( '-' 제외 11자리 )"
          register={register("phone", {
            required: "전화번호를 입력해주세요.",
            pattern: {
              value: /^\d{11}$/,
              message: "11자리 숫자를 입력해주세요.",
            },
          })}
          errorMessage={errors?.phone && errors.phone.message}
        />
        <button
          type="submit"
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
