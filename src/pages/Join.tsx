import AuthBg from "../components/auth/AuthBg";
import JoinForm from "../components/auth/JoinForm";

function Join(): JSX.Element {
  return (
    <div>
      <AuthBg form={<JoinForm />} />
    </div>
  );
}
export default Join;
