import AdminIcon from "../icons/AdminIcon";
import BusIcon from "../icons/BusIcon";
import MasterIcon from "../icons/MasterIcon";
import RestaurantIcon from "../icons/RestaurantIcon";
import SalonIcon from "../icons/SalonIcon";

const basePath = (address: string): string => {
  return "/main/" + address;
};

export const master = {
  power: "총관리자",
  icon: <MasterIcon />,
  path: basePath("master"),
  list: [
    {
      name: "전체 사용자 관리",
      path: basePath("master/management"),
    },
  ],
};

export const salon = {
  power: "미용실",
  icon: <SalonIcon />,
  path: basePath("salon"),
  list: [
    {
      name: "미승인 예약 목록",
      path: basePath("salon/pending"),
    },
    {
      name: "가격표 관리",
      path: basePath("salon/priceCorrection"),
    },
  ],
};

export const admin = {
  power: "행정",
  icon: <AdminIcon />,
  path: basePath("admin"),
  list: [
    {
      name: "외박 / 외출",
      path: basePath("admin/stayOut"),
    },
    {
      name: "A/S",
      path: basePath("admin/repair"),
    },
    {
      name: "회의실",
      path: basePath("admin/meetingRoom"),
    },
    {
      name: "버스 시간표",
      path: basePath("admin/busTimeTable"),
    },
  ],
};

export const restaurant = {
  power: "식수",
  icon: <RestaurantIcon />,
  path: basePath("restaurant"),
  list: [
    {
      name: "식단표 추가",
      path: basePath("restaurant/dietPlan"),
    },
    {
      name: "주말 식수 현황",
      path: basePath("restaurant/weekendMeal"),
    },
    {
      name: "학기 식수 현황",
      path: basePath("restaurant/semesterMeal"),
    },
  ],
};
