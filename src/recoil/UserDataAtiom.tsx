import { atom } from "recoil";
import { LoginUserData } from "../types/auth";

export const LoadinStateAtom = atom<boolean>({
  key: "LoadingState",
  default: true,
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
});
