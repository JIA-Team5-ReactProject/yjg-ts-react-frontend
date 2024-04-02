import { useState } from "react";
import PasswordConfirmation from "../components/mypage/PasswordConfirmation";
import MypageForm from "../components/mypage/MypageForm";
import MainContainer from "../components/MainContainer";

function Mypage() {
  const [passwordCheck, setPasswordCheck] = useState(false);

  return (
    <MainContainer>
      {passwordCheck ? (
        <MypageForm />
      ) : (
        <PasswordConfirmation setPasswordCheck={setPasswordCheck} />
      )}
    </MainContainer>
  );
}

export default Mypage;
