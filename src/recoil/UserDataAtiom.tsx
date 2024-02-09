import { atom } from "recoil";
import { LoginUserData } from "../types/auth";

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
      salon_privilege: false,
      restaurant_privilege: false,
      admin_privilege: false,
    },
  },
});
