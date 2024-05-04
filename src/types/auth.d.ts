import { RegisterOptions } from "react-hook-form";

export type FormInputPropsType = {
  type: string;
  name: string;
  label?: string;
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

export type PatchUserDataType = {
  name: string;
  phone: string;
  currentPW: string;
  newPW: string;
  pwCheck: string;
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
  password?: string;
  pwCheck?: string;
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

export type LoginUserData = {
  id: number;
  power: string[];
} & LoginFormValues &
  FindingIdValues;

export type GetUserData = {
  id: number;
  phone_number: string;
  privileges: PrivilegeType[];
} & FindingPasswordValues;

export type PostUserData = {
  admin_id: number;
  name?: string;
  phone_number?: string;
  current_password?: string;
  new_password?: string;
};

export type PrivilegeType = {
  id: string;
  privilege: string;
};

export type StudentType = {
  id: string;
  email: string;
  name: string;
  phone_number?: string;
  student_id?: string;
};
