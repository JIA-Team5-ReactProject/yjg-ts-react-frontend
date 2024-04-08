import { useRecoilValue } from "recoil";
import { LoadinStateAtom, UserDataAtom } from "../recoil/UserDataAtiom";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

function ProtectedRoute(props: { power: string; children: ReactElement }) {
  const { power, children } = props;
  // 유저 권한
  const userPower = useRecoilValue(UserDataAtom);
  // 로딩 페이지 상태 전역 변수
  const loadingState = useRecoilValue(LoadinStateAtom);

  if (loadingState) {
    return <LoadingPage />;
  }

  return userPower.power.includes(power) ? (
    <>{children}</>
  ) : (
    <Navigate to="/404" />
  );
}

export default ProtectedRoute;
