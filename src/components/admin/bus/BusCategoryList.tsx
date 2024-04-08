import { useEffect, useState } from "react";
import { BusCategoryListType, ScheduleType } from "../../../types/admin";
import { privateApi } from "../../../services/customAxios";
import { ListBtn } from "../../master/UserList";
import BusScheduleList from "./BusScheduleList";

function BusCategoryList(props: BusCategoryListType) {
  const {
    id,
    round,
    semester,
    weekend,
    bus_route_direction,
    getCategoryFuc,
    deleteCategoryFuc,
    modifyCategotyFuc,
  } = props;
  // 카테고리 이름 수정 상태
  const [modify, setModify] = useState(false);
  // 수정 내용
  const [newName, setNewName] = useState("");
  // 서비스 드롭다운 상태
  const [dropdown, setDropdown] = useState(false);
  // 스케줄 데이터
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);

  // 렌더링 시
  useEffect(() => {
    getScheduleData();
    setDropdown(false);
  }, [id]);

  // 수정할 시
  useEffect(() => {
    if (modify) {
      setNewName(round);
    }
  }, [modify]);

  // 스케줄 데이터 가져오기
  const getScheduleData = async () => {
    try {
      const scheduleData = await privateApi.get(
        `/api/bus/round/schedule/${id}`
      );
      setSchedule(scheduleData.data.schedules);
    } catch (error) {
      console.log(error);
    }
  };

  // 스케줄 생성하기
  const createSchedule = async (id: string, station: string, time: string) => {
    try {
      await privateApi.post("/api/bus/schedule", {
        round_id: id,
        station: station,
        bus_time: time,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 스케줄 삭제하기
  const deleteSchedule = async (id: string) => {
    try {
      await privateApi.delete(`/api/bus/schedule/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-white flex gap-3 items-center border-2 border-gray-300 p-4 rounded-lg mt-10 text-2xl font-bold shadow-md">
        {modify ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              className="w-32 text-center outline-none border-b-2 border-gray-400"
            />
            <ListBtn
              value="완료"
              color="bg-sky-400/90"
              onClick={() => {
                modifyCategotyFuc(id, newName).then(() => {
                  setModify(false);
                  getCategoryFuc({
                    semester: semester,
                    weekend: weekend,
                    bus_route_direction: bus_route_direction,
                  });
                });
              }}
            />
            <ListBtn
              value="취소"
              color="bg-red-400/90"
              onClick={() => {
                setModify(false);
              }}
            />
          </>
        ) : (
          <>
            <div className="min-w-32 text-center">{round}</div>
            <ListBtn
              value="수정"
              color="bg-orange-400/80"
              onClick={() => {
                setModify(true);
              }}
            />
            <ListBtn
              value="삭제"
              color="bg-red-400/90"
              onClick={() => {
                if (window.confirm("삭제하시겠습니까?")) {
                  alert("삭제되었습니다");
                  deleteCategoryFuc(id).then(() => {
                    getCategoryFuc({
                      semester: semester,
                      weekend: weekend,
                      bus_route_direction: bus_route_direction,
                    });
                  });
                } else {
                  alert("취소되었습니다.");
                }
              }}
            />
          </>
        )}
        <div className="flex-1 flex justify-end">
          <span
            className="text-sm items-center underline underline-offset-4 cursor-pointer text-gray-500"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            {dropdown ? "닫기" : "열기"}
          </span>
        </div>
      </div>
      {dropdown ? (
        <BusScheduleList
          id={id}
          schedule={schedule}
          createScheduleFuc={createSchedule}
          deleteScheduleFuc={deleteSchedule}
          getScheduleFuc={getScheduleData}
        />
      ) : null}
    </div>
  );
}

export default BusCategoryList;
