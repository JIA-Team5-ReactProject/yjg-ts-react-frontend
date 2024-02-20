import PeopleIcon from "../../icons/PeopleIcon";
import * as S from "../../styles/calender";
import { useState } from "react";

function RoomReservation() {
  //캘린더에서 선택한 DATE값
  const [clickDay, setClickDay] = useState<Value>(new Date());

  return (
    <div className="flex">
      <div className="flex-col">
        <S.CalendarBox className="flex-auto">
          <S.StyleCalendar
            locale="en"
            onChange={setClickDay}
            value={clickDay}
          />
        </S.CalendarBox>
        <div className="grid grid-cols-2 gap-6 px-10 text-center">
          <div className="col-span-2 font-bold text-xl"> 회의실 이용상황</div>
          <RoomState exist={true} />
          <RoomState exist={false} />
          <RoomState exist={false} />
          <RoomState exist={true} />
          <RoomState exist={true} />
          <RoomState exist={false} />
        </div>
      </div>

      <div className=" flex-1 h-fit grid grid-cols-3 p-12"></div>
    </div>
  );
}

export default RoomReservation;

function RoomState(props: any) {
  const { exist } = props;

  return (
    <div
      className={`${
        exist
          ? "border-4 border-blue-500 text-blue-500"
          : "border-2 border-gray-300 text-gray-400"
      } p-2 font-bold h-28`}
    >
      <div>204</div>
      {exist ? <PeopleIcon /> : null}
    </div>
  );
}
