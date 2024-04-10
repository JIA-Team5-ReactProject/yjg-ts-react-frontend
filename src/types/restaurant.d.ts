export type TodayMenuType = {
  meal_time: string;
  menu: string;
};

export type MealType = {
  id?: string;
  meal_type: string;
  price: string;
  content: string;
};

export type AccountType = {
  account: string;
  bank_name: string;
  name: string;
};

export type WeekendAutoDataType = {
  start_week: string;
  start_time: string;
  end_week: string;
  end_time: string;
};

export type SemesterAutoDataType = {
  start_month: string;
  start_date: string;
  end_month: string;
  end_date: string;
};

export type WeekendManualSettingsType = {
  autoData: WeekendAutoDataType | undefined;
  setAutoData: (autoData: WeekendAutoDataType | undefined) => void;
  weekendKind: string;
  getWeekendApply: () => Promise<void>;
};

export type SemesterManualSettingsType = {
  autoData: SemesterAutoDataType | undefined;
  setAutoData: (autoData: SemesterAutoDataType | undefined) => void;
  semesterKind: string;
  getSemesterApply: () => Promise<void>;
};

export type WeekendListType = {
  id: string;
  payment: number;
  refund: number;
  sat: number;
  sun: number;
  user: {
    name: string;
    phone_number: string;
    student_id: string;
  };
  weekend_meal_type: {
    meal_type: string;
  };
};

export type SemesterListType = {
  id: string;
  payment: number;
  user: {
    name: string;
    phone_number: string;
    student_id: string;
  };
  semester_meal_type: {
    meal_type: string;
  };
};

export type WeekendDetailDataType = {
  id: string;
  refund: number;
  sat: number;
  sun: number;
  name: string;
  phone_number: string;
  student_id: string;
  meal_type: string;
};

export type SemesterDetailDataType = {
  id: string;
  name: string;
  phone_number: string;
  student_id: string;
  meal_type: string;
};
