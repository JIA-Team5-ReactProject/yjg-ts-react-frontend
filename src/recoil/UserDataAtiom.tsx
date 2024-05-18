import { atom } from "recoil";
import { LoginUserData } from "../types/auth";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

export const LoginStateAtom = atom<boolean>({
  key: "LoginState",
  default: false,
});

export const UserDataAtom = atom<LoginUserData>({
  key: "UserData",
  default: {
    id: 0,
    name: "",
    phone: "",
    email: "",
    power: [""],
  },
  effects_UNSTABLE: [persistAtom],
});
