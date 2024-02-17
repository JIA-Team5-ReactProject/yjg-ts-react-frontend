import { GetUserData } from "./auth";

export type UserListType = {
  user: Record<string | unknown>;
  dataList: (string | DataListBtnType[])[];
};

export type DataListBtnType = {
  user?: Record<string | unknown>;
  value: string;
  color: string;
  onClick: (number) => void;
};

export type GetApprovedData = {
  type?: "approved" | "unapproved";
};
