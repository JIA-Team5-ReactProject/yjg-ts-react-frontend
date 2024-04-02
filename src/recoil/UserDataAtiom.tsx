import { atom } from "recoil";
import { LoginUserData } from "../types/auth";

export const Token = atom<string>({
  key: "token",
  default: "",
});

export const UserDataAtom = atom<LoginUserData>({
  key: "UserData",
  default: {
    id: 0,
    name: "",
    phone: "",
    email: "",
    password: "",

    power: [""],
  },
});
