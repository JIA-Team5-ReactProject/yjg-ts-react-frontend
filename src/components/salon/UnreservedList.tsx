import { useEffect, useState } from "react";
import * as S from "../../styles/calender";
import { ListHead, UserList } from "../master/UserList";
import dayjs from "dayjs";
import { AxiosRequestConfig } from "axios";
import { customAxios } from "../../services/customAxios";

function UnreservedList() {
  // 시간 더미 값
  const clock = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
  ];
  const week = [
    { day: "월", open: false },
    { day: "화", open: true },
    { day: "수", open: false },
    { day: "목", open: true },
    { day: "금", open: false },
  ];

  //캘린더에서 선택한 DATE값
  const [clickDay, setClickDay] = useState<Value>(new Date());
  //예약이 미승인된 유저 리스트
  const [unreservedUser, setUnreservedUser] = useState([]);
  //리스트 헤드, 데이터 틀
  const headList = ["이름", "시간", "시술유형", "승인처리"];
  const dataList = [
    "user_name",
    "reservation_date",
    "service_name",
    [
      {
        value: "승인",
        color: "bg-blue-400",
        onClick: () => {},
      },
      {
        value: "거절",
        color: "bg-red-400",
        onClick: () => {},
      },
    ],
  ];

  useEffect(() => {
    if (clickDay instanceof Date) {
      const formattedData = dayjs(clickDay).format("YYYY-MM-DD");
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

      const reservationData: any = await customAxios.get(
        "/api/admin/salon-reservation",
        config
      );
      //예약 미승인 값
      setUnreservedUser(reservationData.data.reservations);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-14">
      <div className="flex-none flex flex-col text-center">
        <div className=" text-black font-bold text-2xl">🕐 예약 목록 확인</div>
        <div className="flex flex-col gap-4 p-8 ml-10 mt-2 bg-sky-200 rounded-md ">
          <S.CalendarBox className="">
            <S.StyleCalendar
              locale="en"
              onChange={setClickDay}
              value={clickDay}
            />
          </S.CalendarBox>
          <div className="bg-white text-white rounded-lg grid grid-cols-4 text-center p-4 gap-4">
            {clock.map((v) => {
              return <div className="bg-cyan-500 p-1 rounded-md">{v}</div>;
            })}
          </div>
        </div>

        <div className="  text-black font-bold text-2xl mt-2">💈 영업 설정</div>
        <div className="flex flex-col gap-6 p-8 ml-10 mt-2 bg-sky-200 rounded-md">
          <div className="bg-white text-white rounded-lg grid grid-cols-5 text-center p-4 gap-4">
            {week.map((v) => {
              return (
                <div
                  className={`${
                    v.open ? "bg-cyan-500" : "text-black"
                  } p-1 rounded-md`}
                >
                  {v.day}
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-lg grid grid-cols-5 text-center p-4 gap-5">
            <div className="font-bold text-lg col-span-2">🔓 open</div>
            <input className="font-bold text-xl col-span-3 outline-none text-center" />
            <div className="font-bold text-lg col-span-2">🔒 close</div>
            <input className="font-bold text-xl col-span-3 outline-none text-center" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center pt-10">
        <div className="bg-sky-200 rounded-md min-w-fit w-3/4 min-h-24 h-5/6 p-12">
          <div className="text-3xl font-bold mb-10 tracking-tighter text-left">
            9 : 00
          </div>
          <div className="grid grid-cols-4 text-xl font-semibold text-center w-full">
            <ListHead headList={headList} />
            {unreservedUser.map((user) => {
              return <UserList user={user} dataList={dataList} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnreservedList;
