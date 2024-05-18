import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "./FormInput";
import { JoinFormValues } from "../../types/auth";
import { useEffect, useState } from "react";
import { trimValues } from "../../utils/validate";
import { publicApi } from "../../services/customAxios";
import { emailReg, nameReg, passwordReg, phoneNumReg } from "../../utils/regex";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import GoLogin from "./GoLogin";

function JoinForm(): JSX.Element {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<JoinFormValues>();

  const navigate = useNavigate();
  const password = watch("password");
  const email = watch("email");
  //중복체크 상태
  const [duplicateCheck, setDuplicateCheck] = useState(false);

  useEffect(() => {
    setDuplicateCheck(false);
  }, [email]);

  // 아이디 중복 체크 Api
  const duplicateCheckApi = async (email: string) => {
    const isValid = emailReg.test(email);
    if (!isValid) {
      return Promise.reject(new Error("이메일을 입력해주세요."));
    }

    const response = await publicApi.get(`/api/verify-email/${email}`);
    if (response.data.check) {
      setDuplicateCheck(response.data.check);
    }
  };

  // 회원가입 Api
  const joinApi = async (data: JoinFormValues) => {
    if (!duplicateCheck) {
      setError(
        "email",
        { message: "중복 체크를 해주세요." },
        { shouldFocus: true }
      );
      return;
    }
    const trimData = trimValues(data);
    const response = await publicApi.post("/api/admin", {
      name: trimData.name,
      phone_number: trimData.phone,
      email: trimData.email,
      password: trimData.password,
    });

    return response.data;
  };

  // 중복체크 mutation
  const { mutate: duplicateCheckMutation } = useMutation({
    mutationFn: (email: string) => duplicateCheckApi(email),
    onError() {
      setError(
        "email",
        { message: "Email이 존재합니다." },
        { shouldFocus: true }
      );
    },
  });

  // 회원가입 mutation
  const { mutate: joinMutation } = useMutation({
    mutationFn: (data: JoinFormValues) => joinApi(data),
    // Api 연결 성공
    onSuccess() {
      alert("회원가입 신청이 완료되었습니다.");
      navigate("/");
    },
  });

  // 회원가입 제출 함수
  const onSubmit: SubmitHandler<JoinFormValues> = async (data) => {
    joinMutation(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col bg-sky-200/90 rounded-3xl p-10 min-w-96 max-w-xl m-auto">
        <p className="font-bold text-3xl text-center mb-5 mt-2">회원가입</p>
        <FormInput
          type="text"
          name="name"
          label="이름"
          placeholder="이름 입력 ( 한글 )"
          register={register("name", {
            required: "이름을 입력해주세요.",
            pattern: {
              value: nameReg,
              message: "한글로 2~5자를 입력해주세요.",
            },
          })}
          errorMessage={errors?.name && errors.name.message}
        />
        <FormInput
          type="email"
          name="email"
          label="메일 입력"
          check={{
            textF: "중복체크",
            textT: "체크완료",
            onCheck: () => {
              duplicateCheckMutation(email);
            },
            buttonState: duplicateCheck,
          }}
          placeholder="이메일 입력 "
          register={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: emailReg,
              message: "이메일 양식에 맞춰 입력해주세요.",
            },
          })}
          errorMessage={errors?.email && errors.email.message}
        />
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
        <FormInput
          type="tel"
          name="phone"
          label="전화번호"
          placeholder="휴대폰 번호 입력 ( '-' 제외 11자리 )"
          register={register("phone", {
            required: "전화번호를 입력해주세요.",
            pattern: {
              value: phoneNumReg,
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
        <GoLogin />
      </div>
    </form>
  );
}

export default JoinForm;
