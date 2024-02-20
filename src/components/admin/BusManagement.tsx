import { useState } from "react";
import ChoiceList from "./ChoiceList";

function BusManagement() {
  // 평일/주말 스테이트
  const [week, setWeek] = useState("weekday");
  // 노선 스테이트
  const [route, setRoute] = useState("campus");
  // 리스트
  const weekList = [
    {
      state: "weekday",
      head: "평일",
    },
    {
      state: "weekend",
      head: "주말",
    },
  ];
  const routeList = [
    { state: "campus", head: "복현캠퍼스 -> 영어마을" },
    { state: "english", head: "영어마을 -> 복현캠퍼스" },
  ];

  return (
    <div className="flex flex-col gap-10 p-8">
      <ChoiceList
        head="1. 평일/주말 선택"
        state={week}
        setState={setWeek}
        list={weekList}
      />
      <ChoiceList
        head="2. 노선 선택"
        state={route}
        setState={setRoute}
        list={routeList}
      />
    </div>
  );
}

export default BusManagement;
