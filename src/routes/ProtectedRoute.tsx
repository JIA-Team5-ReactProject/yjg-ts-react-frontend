import { useRecoilValue } from "recoil";
import { UserDataAtom } from "../recoil/UserDataAtiom";
import { ReactElement } from "react";
import { UserPower } from "../types/auth";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props: {
  power: keyof UserPower;
  children: ReactElement;
}) {
  const { power, children } = props;
  // 유저 권한
  const userPower = useRecoilValue(UserDataAtom);

  return userPower.power[power] ? <>{children}</> : <Navigate to="/404" />;
}

export default ProtectedRoute;
