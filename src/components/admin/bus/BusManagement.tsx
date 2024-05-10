import { useEffect, useState } from "react";
import ChoiceList from "./ChoiceList";
import { ListBtn } from "../../table/Table";
import { privateApi } from "../../../services/customAxios";
import { AxiosRequestConfig } from "axios";
import { BusCategotyType, GetBusCategoryType } from "../../../types/admin";
import BusCategoryList from "./BusCategoryList";

function BusManagement() {
  // 카테고리 생성 명 입력 값
  const [newCategoryName, setNewCategoryName] = useState("");
  // 카테고리 데이터
  const [category, setCategory] = useState<BusCategotyType[]>([]);
  // 학기/방학 스테이트
  const [semester, setSemester] = useState<number>(1);
  // 평일/주말 스테이트
  const [weekend, setWeekend] = useState<number>(1);
  // 노선 스테이트
  const [route, setRoute] = useState<string>("s_bokhyun");
  // 리스트
  const semesterList = [
    {
      state: 1,
      head: "학기",
    },
    {
      state: 0,
      head: "방학",
    },
  ];
  const weekendList = [
    {
      state: 0,
      head: "평일",
    },
    {
      state: 1,
      head: "주말",
    },
  ];
  const routeList = [
    { state: "s_bokhyun", head: "복현캠퍼스 -> 영어마을" },
    { state: "s_english", head: "영어마을 -> 복현캠퍼스" },
  ];

  // 노선 종류 선택할 시
  useEffect(() => {
    getCategoryData({
      semester: semester,
      weekend: weekend,
      bus_route_direction: route,
    });
  }, [semester, weekend, route]);

  // 카테고리 리스트 가져오기
  const getCategoryData = async (data: GetBusCategoryType) => {
    try {
      const config: AxiosRequestConfig = {
        params: data,
      };
      const categoryData = await privateApi.get("/api/bus/round", config);
      setCategory(categoryData.data.roundDate);
    } catch (error) {
      console.log(error);
    }
  };

  //카테고리 추가하기
  const createCategory = async () => {
    try {
      await privateApi.post("/api/bus/round", {
        round: newCategoryName,
        weekend: weekend,
        semester: semester,
        bus_route_direction: route,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 카테고리 삭제하기
  const deletteCategory = async (id: string) => {
    try {
      await privateApi.delete(`/api/bus/round/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 카테고리 이름 수정하기
  const modifyCategory = async (id: string, newName: string) => {
    try {
      await privateApi.patch(`/api/bus/round/${id}`, {
        round: newName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex gap-10">
        <ChoiceList
          head="1. 학기/방학 선택"
          state={semester}
          setState={setSemester}
          list={semesterList}
        />
        <ChoiceList
          head="2. 평일/주말 선택"
          state={weekend}
          setState={setWeekend}
          list={weekendList}
        />
      </div>
      <ChoiceList
        head="3. 노선 선택"
        state={route}
        setState={setRoute}
        list={routeList}
      />
      <div>
        <div className="flex">
          <div className="flex-1 text-xl font-bold p-4 tracking-tighter">
            노선 관리
          </div>
          <div className="flex gap-2 justify-end items-end">
            <div>
              <input
                type="text"
                className="p-2 w-32 rounded-lg text-center focus:outline-none focus:ring-2 focus:rounded-xl focus:ring-blue-500 shadow-md"
                placeholder="카테고리 명"
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                }}
                value={newCategoryName}
              />
            </div>
            <div>
              <ListBtn
                value="생성"
                color="bg-blue-400/90"
                onClick={() => {
                  createCategory().then(() => {
                    getCategoryData({
                      semester: semester,
                      weekend: weekend,
                      bus_route_direction: route,
                    });
                  });
                  setNewCategoryName("");
                }}
              />
            </div>
          </div>
        </div>
        {category.map((v) => {
          return (
            <BusCategoryList
              id={v.id}
              round={v.round}
              semester={semester}
              bus_route_direction={route}
              weekend={weekend}
              getCategoryFuc={getCategoryData}
              deleteCategoryFuc={deletteCategory}
              modifyCategotyFuc={modifyCategory}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BusManagement;
