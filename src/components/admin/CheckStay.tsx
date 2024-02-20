import { useEffect, useState } from "react";
import * as S from "../../styles/calender";
import CountCard from "../salon/CountCard";
import dayjs from "dayjs";
import { ListHead } from "../master/UserList";

function CheckStay() {
  const headList = ["학번", "이름", "사유", "비고"];
  //캘린더에서 선택한 DATE값
  const [clickDay, setClickDay] = useState<Value>(new Date());
  // 리스트종류 스테이트
  const [listKind, setListKind] = useState("stayOut");
  const kind = [
    {
      state: "stayOut",
      head: "외박 인원",
    },
    {
      state: "goingOut",
      head: "외출 인원",
    },
  ];

  useEffect(() => {
    // 날짜 변경 시 발생
    if (clickDay instanceof Date) {
      const formattedData = dayjs(clickDay).format("YYYY-MM-DD");
    }
  }, [clickDay]);

  return (
    <div className="flex">
      <div className="flex-col">
        <div className="flex justify-between px-3 gap-6">
          <CountCard header="금일 외박" count={9} />
          <CountCard header="금일 외출" count={9} />
        </div>
        <S.CalendarBox className="flex-auto">
          <S.StyleCalendar
            locale="en"
            onChange={setClickDay}
            value={clickDay}
          />
        </S.CalendarBox>
      </div>

      <div className=" flex-1 h-fit grid grid-cols-4 p-12">
        <div className="flex gap-4 items-end col-span-4 tracking-tighter text-left mb-6">
          {kind.map((v) => {
            return (
              <span
                className={`${
                  listKind === v.state
                    ? "font-bold text-3xl underline underline-offset-8"
                    : "text-gray-400 text-2xl"
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
        <ListHead headList={headList} />
      </div>
    </div>
  );
}

export default CheckStay;
