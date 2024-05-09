import { useState } from "react";
import PasswordConfirmation from "../components/mypage/PasswordConfirmation";
import MypageForm from "../components/mypage/MypageForm";

function Mypage() {
  const [passwordCheck, setPasswordCheck] = useState(false);

  return (
    <>
      {passwordCheck ? (
        <MypageForm />
      ) : (
        <PasswordConfirmation setPasswordCheck={setPasswordCheck} />
      )}
    </>
  );
}

export default Mypage;
