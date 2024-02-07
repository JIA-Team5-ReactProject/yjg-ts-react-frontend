import { useState } from "react";
import PasswordConfirmation from "../components/mypage/PasswordConfirmation";

function Mypage() {
  const [passwordCheck, setPasswordCheck] = useState(false);

  return (
    <div className="flex-auto h-screen pt-32 pr-6 pb-6">
      {passwordCheck ? null : <PasswordConfirmation />}
    </div>
  );
}

export default Mypage;
