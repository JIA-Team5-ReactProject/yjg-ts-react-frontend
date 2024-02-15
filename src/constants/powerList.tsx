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
      name: "외박 외출 승인",
      path: basePath("admin/aNightOut"),
    },
    {
      name: "A/S",
      path: basePath("admin/repair"),
    },
    {
      name: "공지 게시판",
      path: basePath("admin/announcement"),
    },
    {
      name: "회의실 승인",
      path: basePath("admin/meetingRoom"),
    },
  ],
};

export const bus = {
  power: "버스",
  icon: <BusIcon />,
  path: basePath("admin"),
  list: [
    {
      name: "시간표 추가",
      path: basePath("admin/busTimetable"),
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
      path: basePath("restaurant/mealSchedule"),
    },
    {
      name: "주말 식수 현황",
      path: basePath("restaurant/weekendMeal"),
    },
    {
      name: "식수 신청 현황",
      path: basePath("restaurant/mealRequest"),
    },
  ],
};
