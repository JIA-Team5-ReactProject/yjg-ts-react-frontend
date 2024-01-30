export type FormInputPropsType = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  check?: {
    text: string;
    onCheck: () => undefined | void;
    duplicateCheck: boolean;
  };
  register?: { name: string; RegisterOptions? };
  errorMessage?: string | undefined;
};

export type JoinFormValues = {
  name: string;
  pwCheck: string;
  email: string;
  phone: string;
} & LoginFormValues;

export type LoginFormValues = {
  id: string;
  password: string;
};
