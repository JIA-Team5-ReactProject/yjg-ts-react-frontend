import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useEffect } from "react";
import { privateApi } from "../services/customAxios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  LoadinStateAtom,
  LoginStateAtom,
  UserDataAtom,
} from "../recoil/UserDataAtiom";

function Main() {
  // 로그인 상태 전역 변수
  const loginState = useRecoilValue(LoginStateAtom);
  // 로그인 상태 전역 저장변수
  const setLoginState = useSetRecoilState(LoginStateAtom);
  // 유저 데이터 전역 저장 변수
  const setUserData = useSetRecoilState(UserDataAtom);
  // 로딩 페이지 전역 저장 변수
  const setLoadingState = useSetRecoilState(LoadinStateAtom);

  // 페이지 새로고침할 시
  useEffect(() => {
    if (!loginState) {
      getUserData().then(() => {
        setLoginState(true);
      });
      const token = sessionStorage.getItem("userToken");
      if (token) {
      }
    }
  }, [loginState]);

  // 토큰으로 정보 확인하기
  const getUserData = async () => {
    setLoadingState(true);
    try {
      const userData = await privateApi.get("/api/user");
      console.log(userData.data.admin);
      const data = userData.data.admin;
      const powerArr: string[] = [];
      data.privileges.map((v: { privilege: string }) => {
        powerArr.push(v.privilege);
      });
      setUserData({
        id: data.id,
        name: data.name,
        phone: data.phone_number,
        email: data.email,
        password: data.password,
        power: powerArr,
      });
      setLoadingState(false);
    } catch (error) {
      console.log(error);
      setLoadingState(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-auto">
      <Header />
      <div className="flex h-full">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
