import { useEffect, useState } from "react";
import * as S from "../../styles/calender";
import { customAxios } from "../../services/customAxios";
import { AxiosRequestConfig } from "axios";
import { ListHead, UserList } from "../master/UserList";
import CountCard from "./CountCard";
import dayjs from "dayjs";
import { ReservationUserType } from "../../types/salon";

function ReservationList() {
  //캘린더에서 선택한 DATE값
  const [clickDay, setClickDay] = useState<Value>(new Date());
  //예약이 승인된 유저 리스트
  const [reservationUser, setReservationUser] = useState<ReservationUserType[]>(
    []
  );
  //예약이 미승인된 유저 리스트
  const [unreservedUser, setUnreservedUser] = useState([]);
  //리스트 헤드, 데이터 틀
  const headList = ["이름", "시간", "시술유형"];
  const dataList = ["user_name", "reservation_date", "service_name"];

  useEffect(() => {
    // 날짜 변경 시 발생
    if (clickDay instanceof Date) {
      const formattedData = dayjs(clickDay).format("YYYY-MM-DD");
      getData({
        status: "C",
        start_date: formattedData,
        end_date: formattedData,
      });
      getData({
        status: "S",
        start_date: formattedData,
        end_date: formattedData,
      });
    }
  }, [clickDay]);

  //지정 날짜의 예약 리스트 가져오기
  const getData = async (data: GetTodayReservation) => {
    try {
      const config: AxiosRequestConfig = {
        params: data,
      };

      const reservationData = await customAxios.get(
        "/api/admin/salon-reservation",
        config
      );
      if (data.status === "C") {
        //예약 승인 값
        setReservationUser(reservationData.data.reservations);
      } else if (data.status === "S") {
        //예약 미승인 값
        setUnreservedUser(reservationData.data.reservations);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <div className="flex-col">
        <div className="flex justify-between px-3 gap-6">
          <CountCard header="확정 예약자" count={reservationUser.length} />
          <CountCard header="승인 대기자" count={unreservedUser.length} />
        </div>
        <S.CalendarBox className="flex-auto">
          <S.StyleCalendar
            locale="en"
            onChange={setClickDay}
            value={clickDay}
          />
        </S.CalendarBox>
      </div>

      <div className=" flex-1 h-fit grid grid-cols-3 p-12">
        <div className="col-span-3 text-4xl font-bold mb-10 tracking-tighter text-left">
          예약 확정 목록
        </div>
        <ListHead headList={headList} />
        {reservationUser.map((user) => {
          return <UserList user={user} dataList={dataList} />;
        })}
      </div>
    </div>
  );
}

export default ReservationList;
