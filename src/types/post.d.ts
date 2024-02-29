export type PostType = {
  title: string;
  content: string;
  tag: string;
  urgent: boolean;
};

export type PostFormType = {
  admin_id: string;
  images: string[];
} & PostType;

export type ModifyFormType = {
  images: file[];
  delete_images: string[];
} & PostType;

export type EditorType = {
  value: string;
  setValue: (value: string) => void;
};

export type PostImgType = {
  selectedImg: file[];
  setSelectedImg: (value: file[]) => void;
};

export type PostPrevImgType = {
  prevImgData: { image: string; id: string }[];
  prevImg: string[];
  setPrevImg: (value: string[]) => void;
};

export type NoticeListType = {
  id: string;
} & PostType;

export type NoticeType = {
  admin_id: string;
  notice_images: { image: string; id: string }[];
} & NoticeListType;

export type SearchType = {
  tag: string;
  setTag: (tag: string) => void;
  setSearch: (seach: string) => void;
};

export type PaginationType = {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
};
