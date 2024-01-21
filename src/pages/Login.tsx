import AuthBg from "../components/auth/AuthBg";
import LoginForm from "../components/auth/LoginForm";

function Login(): JSX.Element {
  return (
    <div>
      <AuthBg form={<LoginForm />} />
    </div>
  );
}

export default Login;
