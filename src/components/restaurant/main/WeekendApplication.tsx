import { useState } from "react";
import CountCard from "../../salon/CountCard";

function WeekendApplication() {
  // 리스트종류 스테이트
  const [listKind, setListKind] = useState<string>("sat");
  const kind = [
    {
      state: "sat",
      head: "토요일",
    },
    {
      state: "sun",
      head: "일요일",
    },
  ];

  return (
    <div>
      <div className="font-bold text-lg pl-4 pb-2">• 주말 식수 신청 현황</div>
      <div className="flex flex-col gap-6 shadow-lg px-10 py-5 border border-black/10 rounded-xl">
        <div className="flex gap-4 items-end">
          {kind.map((v) => {
            return (
              <span
                className={`${
                  listKind === v.state
                    ? "font-bold text-xl text-blue-600"
                    : "text-gray-400"
                } cursor-pointer`}
                onClick={() => {
                  setListKind(v.state);
                }}
              >
                {v.head}
              </span>
            );
          })}
        </div>
        <div className="flex gap-7">
          <CountCard header="A유형" count={19} />
          <CountCard header="A유형" count={19} />
          <CountCard header="A유형" count={19} />
        </div>
      </div>
    </div>
  );
}

export default WeekendApplication;
