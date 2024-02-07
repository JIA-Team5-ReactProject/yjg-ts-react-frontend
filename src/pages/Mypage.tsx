import { useState } from "react";
import PasswordConfirmation from "../components/mypage/PasswordConfirmation";
import MypageForm from "../components/mypage/MypageForm";

function Mypage() {
  const [passwordCheck, setPasswordCheck] = useState(true);

  return (
    <div className="flex-auto h-screen pt-32 pr-6 pb-6">
      {passwordCheck ? (
        <MypageForm />
      ) : (
        <PasswordConfirmation setPasswordCheck={setPasswordCheck} />
      )}
    </div>
  );
}

export default Mypage;
