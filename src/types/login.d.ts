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

export type LoginUserData = {
  img?: string;
  approved: boolean;

  power: {
    master: boolean;
    salon: boolean;
    restaurant: boolean;
    admin: boolean;
  };
} & LoginFormValues &
  FindingIdValues;
