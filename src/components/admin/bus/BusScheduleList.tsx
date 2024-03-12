import { useEffect, useState } from "react";
import { BusScheduleListType, ScheduleType } from "../../../types/admin";
import { ListBtn, ListHead, UserList } from "../../master/UserList";
import PlusIcon from "../../../icons/PlusIcon";

function BusScheduleList(props: BusScheduleListType) {
  const { schedule, id, createScheduleFuc, deleteScheduleFuc, getScheduleFuc } =
    props;
  const headList = [
    { value: "역이름", col: "col-span-1" },
    { value: "시간", col: "col-span-1" },
    { value: "", col: "col-span-1" },
  ];
  const dataList = [
    { value: "station", col: "col-span-1" },
    { value: "bus_time", col: "col-span-1" },
    [
      {
        value: "삭제",
        color: "bg-red-400",
        onClick: (schedule: ScheduleType) => {
          deleteScheduleFuc(schedule.id).then(() => {
            getScheduleFuc();
          });
        },
      },
    ],
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
      <div className="relative grid grid-cols-3 mt-2 text-center border-x border-black/10 shadow-lg overflow-hidden rounded-2xl">
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
                color="bg-blue-500"
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

        {schedule.map((v: ScheduleType) => (
          <UserList user={v} dataList={dataList} />
        ))}
      </div>
    </>
  );
}

export default BusScheduleList;
