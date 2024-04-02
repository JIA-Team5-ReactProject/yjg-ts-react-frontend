import { StudentType } from "./auth";

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

export type getNoticeDataType = {
  page: number;
  tag?: string;
  title?: string;
};

export type NoticeListType = {
  id: string;
} & PostType;

export type NoticeType = {
  admin_id: string;
  notice_images: { image: string; id: string }[];
} & NoticeListType;

export type SearchType = {
  tagList: { value: string; name: string }[];
  tag: string;
  setTag: (tag: string) => void;
  setSearch: (seach: string) => void;
};

export type PaginationType = {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
};

export type getAfterServiceType = {
  page: number;
  name?: string;
  status: number;
};

export type AfterServiceListType = {
  id: string;
  user_name?: string;
  title: string;
  content: string;
  status: number;
  visit_date: string;
  visit_place: string;
};

export type AfterServiceType = {
  user_id: string;
  user: StudentType;
  after_service_images?: { image: string; id: string }[];
} & AfterServiceListType;
