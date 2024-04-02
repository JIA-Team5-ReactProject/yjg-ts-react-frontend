import { useEffect, useState } from "react";
import { BusScheduleListType, ScheduleListType } from "../../../types/admin";
import { ListBtn, ListHead } from "../../master/UserList";
import PlusIcon from "../../../icons/PlusIcon";
import { customAxios } from "../../../services/customAxios";

function BusScheduleList(props: BusScheduleListType) {
  const { schedule, id, createScheduleFuc, deleteScheduleFuc, getScheduleFuc } =
    props;
  const headList = [
    { value: "역이름", col: "col-span-1" },
    { value: "시간", col: "col-span-1" },
    { value: "", col: "col-span-1" },
  ];

  // 스케줄 생성 상태
  const [createSchedule, setCreateSchedule] = useState(false);
  // 새로운 역 명
  const [newStation, setNewStation] = useState("");
  // 새로운 시간 값
  const [newTime, setNewTime] = useState("");

  // 생성 칸 열릴 시 초기화 작업
  useEffect(() => {
    setNewStation("");
    setNewTime("");
  }, [createSchedule]);

  return (
    <>
      <div className="bg-white relative grid grid-cols-3 mt-2 text-center border-x border-black/10 shadow-lg overflow-hidden rounded-2xl">
        {<ListHead headList={headList} />}
        <div className="absolute right-0 pt-1 pr-2">
          <PlusIcon
            onClick={() => {
              setCreateSchedule(true);
            }}
          />
        </div>
        {createSchedule ? (
          <>
            <input
              id="name"
              type="text"
              value={newStation}
              onChange={(e) => {
                setNewStation(e.target.value);
              }}
              className="p-2 mx-5 my-3 text-center font-bold text-xl border border-black rounded-md"
            />
            <input
              id="value"
              type="text"
              value={newTime}
              onChange={(e) => {
                setNewTime(e.target.value);
              }}
              className="p-2 mx-5 my-3 text-center font-bold text-xl border border-black rounded-md"
            />
            <div className="flex gap-3 items-center justify-center">
              <ListBtn
                value="생성"
                color="bg-blue-400"
                onClick={() => {
                  createScheduleFuc(id, newStation, newTime).then(() => {
                    getScheduleFuc();
                  });
                  setCreateSchedule(false);
                }}
              />
              <ListBtn
                value="취소"
                color="bg-red-500"
                onClick={() => {
                  setCreateSchedule(false);
                }}
              />
            </div>
          </>
        ) : null}
        {schedule.map((schedule) => {
          return (
            <ScheduleList
              schedule={schedule}
              getScheduleFuc={getScheduleFuc}
              deleteScheduleFuc={deleteScheduleFuc}
            />
          );
        })}
      </div>
    </>
  );
}

export default BusScheduleList;

function ScheduleList(props: ScheduleListType) {
  const { schedule, getScheduleFuc, deleteScheduleFuc } = props;
  // 수정 상태
  const [onModify, setOnModify] = useState(false);
  // 수정된 역이름
  const [newStation, setNewStation] = useState("");
  // 수정된 시간
  const [newTime, setNewTime] = useState("");

  // 댓글 수정하기
  const patchSchedule = async (id: string) => {
    try {
      await customAxios.patch(`/api/bus/schedule/update/${id}`, {
        station: newStation,
        bus_time: newTime,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {onModify ? (
        <>
          <div className="border-b border-r py-5 px-6 font-semibold text-lg">
            <input
              type="text"
              className="flex-1 border-b border-black/20 text-center outline-none"
              value={newStation}
              onChange={(e) => {
                setNewStation(e.target.value);
              }}
            />
          </div>
          <div className="border-b border-r py-5 px-6 font-semibold text-lg">
            <input
              type="text"
              className="flex-1 border-b border-black/20 text-center outline-none"
              value={newTime}
              onChange={(e) => {
                setNewTime(e.target.value);
              }}
            />
          </div>
          <div className="m-auto border-b py-4 w-full space-x-5 text-center">
            <ListBtn
              value="수정완료"
              color="bg-sky-400"
              onClick={() => {
                patchSchedule(schedule.id).then(() => {
                  setOnModify(false);
                  getScheduleFuc();
                });
              }}
            />
            <ListBtn
              value="취소"
              color="bg-red-500/80"
              onClick={() => {
                setOnModify(false);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="border-b border-r py-5 px-6 font-semibold text-lg">
            {schedule.station}
          </div>
          <div className="border-b border-r py-5 px-6 font-semibold text-lg">
            {schedule.bus_time}
          </div>
          <div className="m-auto border-b py-4 w-full space-x-5 text-center">
            <ListBtn
              value="수정"
              color="bg-sky-400"
              onClick={() => {
                setOnModify(true);
                setNewStation(schedule.station);
                setNewTime(schedule.bus_time);
              }}
            />
            <ListBtn
              value="삭제"
              color="bg-red-500/80"
              onClick={() => {
                deleteScheduleFuc(schedule.id).then(() => {
                  getScheduleFuc();
                });
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
