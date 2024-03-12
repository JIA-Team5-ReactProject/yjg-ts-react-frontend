import { customAxios } from "../../../services/customAxios";
import * as S from "../../../styles/calender";
import { useEffect, useState } from "react";
import { ListBtn } from "../../master/UserList";
import { AxiosRequestConfig } from "axios";
import { GetReservationDataType, ReservationList } from "../../../types/admin";
import dayjs from "dayjs";
import RoomState from "./RoomState";

function RoomReservation() {
  // 캘린더에서 선택한 DATE값
  const [clickDay, setClickDay] = useState<Value>(new Date());
  // 회의실 목록
  const [rooms, setRooms] = useState<{ room_number: string; id: string }[]>([]);
  // 선택된 회의실
  const [room, setRoom] = useState("");
  // 카테고리 생성 명 입력 값
  const [newRoomName, setNewRoomName] = useState("");
  // 선택된 회의실, 날짜에 맞는 예약 리스트
  const [reservationList, setReservationList] = useState<ReservationList[]>([]);
  // 전체 시간 값
  const allTime: string[] = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  // 페이지 렌더링 시
  useEffect(() => {
    getRoomData();
  }, []);

  // 회의실 선택할 시
  useEffect(() => {
    if (clickDay instanceof Date) {
      const formattedDate = dayjs(clickDay).format("YYYY-MM-DD");
      if (room) {
        getReservationData({ date: formattedDate, room_number: room });
      }
    }
  }, [clickDay, room]);

  // 전체 회의실 얻을 시
  useEffect(() => {
    if (rooms.length > 0) {
      setRoom(rooms[0].room_number);
    }
  }, [rooms]);

  // 회의실 목록 가져오기
  const getRoomData = async () => {
    try {
      const roomData = await customAxios.get("/api/meeting-room");
      setRooms(roomData.data.meeting_rooms);
    } catch (error) {
      console.log(error);
    }
  };

  // 회의실 목록 추가하기
  const createRoomData = async () => {
    try {
      await customAxios.post("/api/meeting-room", {
        room_number: newRoomName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 회의실 삭제하기
  const deleteRoomData = async () => {
    try {
      await customAxios.delete(`/api/meeting-room/${room}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 회의실 예약자 리스트 가져오기
  const getReservationData = async (data: GetReservationDataType) => {
    try {
      const config: AxiosRequestConfig = {
        params: data,
      };
      const reservationData = await customAxios.get(
        "/api/meeting-room/reservation",
        config
      );
      setReservationList(reservationData.data.reservations.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 회의시 예약자 거절하기
  const patchReservation = async (id: string) => {
    try {
      await customAxios.patch(`/api/meeting-room/reservation/reject/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 예약시간에 맞는 이름 반환
  const reservations = () => {
    return allTime.map((time) => {
      const matchingReservation = reservationList.find((reservation) => {
        const sTime = parseInt(reservation.reservation_s_time.split(":")[0]);
        const eTime = parseInt(reservation.reservation_e_time.split(":")[0]);
        const currentTime = parseInt(time.split(":")[0]);
        return sTime <= currentTime && eTime > currentTime;
      });
      if (matchingReservation) {
        return (
          <div className="flex items-center gap-5 font-bold text-xl">
            <div className="bg-yellow-200 rounded-md p-1">⏰ {time}</div>
            <div>{matchingReservation.user.name}</div>
          </div>
        );
      } else {
        return (
          <div className="flex gap-5 font-bold text-xl">
            <div>⏰ {time}</div>
            <div></div>
          </div>
        );
      }
    });
  };

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
        <div className="relative h-[440px] p-2 py-4 border-4 border-purple-700">
          <div className="absolute bg-white right-24 -translate-y-9 font-bold text-xl px-4">
            회의실 이용상황
          </div>
          <div className="grid grid-cols-2 gap-6 px-6 py-2 text-center overflow-auto max-h-full">
            {rooms.map((v) => {
              return <RoomState name={v.room_number} setRoom={setRoom} />;
            })}
          </div>
        </div>
        <div className="flex gap-2 justify-center items-end pt-2">
          <div>
            <input
              type="text"
              className="p-2 w-32 text-center ring-2 rounded-2xl focus:outline-none focus:ring-2 focus:rounded-xl focus:ring-blue-500"
              placeholder="회의실 호실"
              onChange={(e) => {
                setNewRoomName(e.target.value);
              }}
              value={newRoomName}
            />
          </div>
          <div>
            <ListBtn
              value="생성"
              color="bg-blue-500"
              onClick={() => {
                if (typeof newRoomName === "number") {
                  createRoomData().then(() => {
                    setNewRoomName("");
                    getRoomData();
                  });
                } else {
                  setNewRoomName("");
                  alert("숫자 값만 입력 가능합니다");
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className=" flex-1 h-fit min-h-[750px] p-10 mx-16 my-4 bg-cyan-300 rounded-md">
        <div className="flex border-b-4 border-blue-600 mb-10 p-2">
          <div className="flex-1 font-bold text-2xl">
            <span className="text-blue-700 text-3xl">{room}호</span> 예약자
            리스트
          </div>
          <ListBtn
            value="회의실 삭제"
            color="bg-red-500"
            onClick={() => {
              deleteRoomData().then(() => {
                getRoomData();
              });
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-10">{reservations()}</div>
      </div>
    </div>
  );
}

export default RoomReservation;
