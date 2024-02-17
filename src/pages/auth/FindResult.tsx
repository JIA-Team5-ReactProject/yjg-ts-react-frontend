import AuthBg from "../../components/auth/AuthBg";
import GetResult from "../../components/auth/GetResult";

function FindResult() {
  return (
    <div>
      <AuthBg form={<GetResult />} />
    </div>
  );
}

export default FindResult;
