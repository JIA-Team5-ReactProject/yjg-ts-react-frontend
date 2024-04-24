import { useEffect, useState } from "react";
import cook from "../../../assets/cook.png";
import { ListBtn } from "../../master/UserList";
import ExcelCard from "./ExcelCard";
import ModalAddPlan from "./ModalAddPlan";
import { privateApi } from "../../../services/customAxios";

function DietPlanManagement() {
  // 모달창 상태
  const [onModal, setOnModal] = useState<boolean>(false);
  // 시간 데이터
  const [year, setYear] = useState<string[]>([]);
  // 선택된 년도
  const [selectedYear, setSelectedYear] = useState<string>();
  // 리스트종류 스테이트
  const [month, setMonth] = useState<string>("01");
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  // 페이지 랜더링할 시
  useEffect(() => {
    getYearData();
  }, []);

  // 식단표 년도 가져오기
  const getYearData = async () => {
    try {
      const yearData = await privateApi.get("/api/restaurant/menu/get/year");
      console.log(yearData);
      setYear(yearData.data.years);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      {onModal ? <ModalAddPlan setOnModal={setOnModal} /> : null}
      <div className="flex gap-10 mt-4 ml-4 items-center">
        <div className="font-bold text-3xl">식단표 관리</div>
        <select
          className="outline-none focus:outline-none px-4 py-1 bg-transparent font-bold text-xl border-b-2 border-black"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
          }}
        >
          {year.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </select>
        <div className="flex gap-3 items-end">
          {months.map((v) => {
            return (
              <div className="relative">
                <span
                  className={`${
                    month === v
                      ? "relative font-bold text-3xl text-purple-500"
                      : "text-gray-400 text-2xl hover:text-purple-400"
                  } cursor-pointer`}
                  onClick={() => {
                    setMonth(v);
                  }}
                >
                  {v}
                </span>
                <div className="absolute -right-2 top-0 -translate-y-10 w-12">
                  {month === v ? (
                    <img src={cook} className="h-full w-full" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 text-right">
          <ListBtn
            value="식단표 추가"
            color="bg-blue-400/90"
            onClick={() => {
              setOnModal(true);
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-7 p-10 mt-12">
        <ExcelCard />
        <ExcelCard />
        <ExcelCard />
      </div>
    </div>
  );
}

export default DietPlanManagement;
