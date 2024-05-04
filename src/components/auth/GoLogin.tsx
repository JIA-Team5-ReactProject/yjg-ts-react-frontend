import { useNavigate } from "react-router-dom";

function GoLogin() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center gap-2 mt-3">
      <div className="text-xs text-right pt-1 font-bold">
        이미 계정이 있나요?
      </div>
      <div
        className="text-xs text-right pt-1 font-bold underline-offset-2  hover:underline cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        로그인
      </div>
    </div>
  );
}

export default GoLogin;
