import { RegisterOptions } from "react-hook-form";

export type FormInputPropsType = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  check?: {
    textT: string;
    textF: string;
    onCheck: () => undefined | void;
    buttonState: boolean;
  };
  register?: { name: string; RegisterOptions?: RegisterOptions };
  errorMessage?: string | undefined;
};

export type JoinFormValues = {
  name: string;
  pwCheck: string;
  phone: string;
} & LoginFormValues;

export type LoginFormValues = {
  email: string;
} & passwordValues;

export type passwordValues = {
  password: string;
};

export type FindingFormValues = {
  verificationCode: string;
} & FindingIdValues &
  FindingPasswordValues;

export type FindingIdValues = {
  name: string;
  phone: string;
};

export type FindingPasswordValues = {
  name: string;
  email: string;
};

export type UserPower = {
  master?: boolean;
  salon_privilege: boolean;
  restaurant_privilege: boolean;
  admin_privilege: boolean;
};

export type LoginUserData = {
  id: number;
  img?: string;
  approved: boolean;
  power: UserPower;
} & LoginFormValues &
  FindingIdValues;

export type GetUserData = {
  id: number;
  phone_number: string;
} & FindingPasswordValues &
  UserPower;
