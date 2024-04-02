// 회의실 관련 타입

import { StudentType } from "./auth";

export type GetCheckRoomType = {
  room_number: string;
  date: string;
};

export type GetReservationDataType = {
  date: string;
  room_number?: string;
};

export type ReservationList = {
  id: string;
  reservation_s_time: string;
  reservation_e_time: string;
  user: StudentType;
};

// 버스 관련 타입

export type ChoiceListType = {
  head: string;
  state: number | string;
  setState: (state) => void;
  list: { state: number | string; head: string }[];
};

export type GetBusCategoryType = {
  weekend: number;
  semester: number;
  bus_route_direction: string;
};

export type BusCategotyType = {
  id: string;
  round: string;
};

export type ScheduleType = {
  id: string;
  bus_time: string;
  station: string;
};

export type BusScheduleListType = {
  id: string;
  schedule: ScheduleType[];
  createScheduleFuc: (
    id: string,
    station: string,
    time: string
  ) => Promise<void>;
  deleteScheduleFuc: (id: string) => Promise<void>;
  getScheduleFuc: () => Promise<void>;
};

export type ScheduleListType = {
  schedule: ScheduleType;
  deleteScheduleFuc: (id: string) => Promise<void>;
  getScheduleFuc: () => Promise<void>;
};

export type BusCategoryListType = {
  id: string;
  round: string;
  getCategoryFuc: (data: GetBusCategoryType) => Promise<void>;
  deleteCategoryFuc: (id: string) => Promise<void>;
  modifyCategotyFuc: (id: string, newName: string) => Promise<void>;
} & GetBusCategoryType;

// 외박,외출 관련

export type GetAbsenceDataType = {
  type: string;
  page: number;
  date: string;
  user_name?: string;
};

export type AbsenceListType = {
  id: string;
};

export type AbsenceType = {
  id: string;
  user: StudentType;
  content: string;
  start_date: string;
  end_date: string;
  type: string;
};

// AS 관련

export type GetCommentDataType = {
  id: string;
  admin_id: string;
  comment: string;
};

export type CommentsType = {
  comment: GetCommentDataType;
  getComment: () => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
};
