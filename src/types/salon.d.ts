export type ReservationUserType = {
  id: number;
  user_name: string;
  service_name: string;
  reservation_time: string;
};

export type SalonCategoryType = {
  id: string;
  category: string;
  gender: string;
  deleteCategoryFuc: (id: string) => Promise<void>;
  modifyCategoryFuc: (id: string, newName: string) => Promise<void>;
  getCategoryFuc: () => Promise<void>;
};

export type SalonServiceType = {
  salon_category_id: string;
  id: string;
  service: string;
  price: string;
  gender?: string;
};

export type ServiceListType = {
  id: string;
  service: SalonServiceType[];
  gender: string;
  createServiceFuc: (
    id: string,
    newName: string,
    newValue: string
  ) => Promise<void>;
  deleteServiceFuc: (service_id: string) => Promise<void>;
  getServiceFuc: (data: GetServiceType) => Promise<void>;
};

export type GuestType = {
  id: string;
  user_id: string;
  user_name: string;
  reservation_time: string;
};

export type TimeData = {
  time: string;
  available: boolean;
  personnel?: number;
};

export type BreakTimeType = {
  break_time: string[];
  date: MutableRefobject<string>;
};

export type AllServiceType = {
  category: string;
  male: SalonServiceType[];
  female: SalonServiceType[];
};

export type GetServiceType = {
  category_id: string;
  gender: string;
};

export type PriceTagType = {
  priceTag: boolean;
  setPriceTag: (value: boolean) => void;
  category: SalonCategoryType[];
};

export type ServiceTagType = {
  category: SalonCategoryType[];
  service: SalonServiceType[];
  gender: string;
};

export type BusinessTimeType = {
  id: string;
  s_time: string;
  e_time: string;
  date: string;
  open: number;
};
