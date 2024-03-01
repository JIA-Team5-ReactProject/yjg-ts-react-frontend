export type UserListType = {
  user: Record<string | unknown>;
  dataList: ({ value: string; col: string } | DataListBtnType[])[];
};

export type DataListBtnType = {
  user?: Record<string | unknown>;
  type?: "submit";
  value: string;
  color: string;
  onClick: (number) => void;
};

export type GetApprovedData = {
  type?: "approved" | "unapproved";
};
