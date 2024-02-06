import { atom } from "recoil";
import { LoginUserData } from "../types/login";

export const UserDataAtom = atom<LoginUserData>({
  key: "UserData",
  default: {
    img: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    approved: false,

    power: {
      master: false,
      salon: false,
      restaurant: false,
      admin: false,
    },
  },
});
