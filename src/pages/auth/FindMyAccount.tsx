import AuthBg from "../../components/auth/AuthBg";
import FindMyAccountForm from "../../components/auth/FindMyAccountForm";

function FindMyAccount() {
  return (
    <div>
      <AuthBg form={<FindMyAccountForm />} />
    </div>
  );
}

export default FindMyAccount;
