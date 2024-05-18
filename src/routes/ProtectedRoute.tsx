import { useRecoilValue } from "recoil";
import { UserDataAtom } from "../recoil/UserDataAtiom";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props: { power: string; children: ReactElement }) {
  const { power, children } = props;
  // 유저 권한
  const userPower = useRecoilValue(UserDataAtom);

  return userPower.power.includes(power) ? (
    <>{children}</>
  ) : (
    <Navigate to="/404" />
  );
}

export default ProtectedRoute;
