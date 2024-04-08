import { useState } from "react";
import { ListBtn } from "../master/UserList";
import CloseIcon from "../../icons/CloseIcon";
import { privateApi } from "../../services/customAxios";
import { MealType } from "../../types/restaurant";

function WeekendMeal() {
  // 유형 모달 on/off
  const [onModal, setOnModal] = useState<boolean>(false);
  // 유형 작업 상태
  const [modalStatus, setModalStatus] = useState<string | null>();
  // 식수 유형 값
  const [mealType, setMealType] = useState<MealType[]>([]);
  // 선택 된 유형
  const [selectedType, setSelectedType] = useState<MealType>({
    meal_type: "",
    content: "",
    price: "",
  });
  // 새로운 유형 값
  const [newMealType, setNewMealType] = useState<MealType>({
    meal_type: "",
    content: "",
    price: "",
  });

  // 주말 식수 유형 가져오기
  const getWeekendMealTypeData = async () => {
    try {
      const weekendMealTypeData = await privateApi.get(
        "/api/restaurant/weekend/meal-type/get"
      );
      setMealType(weekendMealTypeData.data.semester_meal_type);
    } catch (error) {
      console.log(error);
    }
  };

  // 주말 식수 유형 생성하기
  const createWeekendMealTypeData = async () => {
    try {
      await privateApi.post("/api/weekend/meal-type", newMealType);
    } catch (error) {
      console.log(error);
    }
  };

  // 주말 식수 유형 삭제하기
  const deleteWeekendMealTypeData = async (id: string) => {
    try {
      await privateApi.delete(`/api/restaurant/weekend/m/delete/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 주말 식수 유형 수정하기
  const patchWeekendMealTypeData = async (id: string) => {
    try {
      await privateApi.patch(`/api/restaurant/weekend/m/update/${id}`, {
        meal_type: newMealType.meal_type,
        content: newMealType.content,
        price: newMealType.price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 유형 CRUD 상태에 따른 창 가져오기
  const onModalFuc = () => {
    if (modalStatus === null) {
      return;
    } else if (modalStatus === "create") {
      return (
        <div className="absolute right-0 bg-white w-7/12 mt-3 p-10 rounded-md shadow-lg">
          <div className="flex items-center gap-10 mb-7">
            <div className="font-bold text-2xl">유형 생성</div>
            <ListBtn
              value="추가완료"
              color="bg-sky-400/90"
              onClick={() => {
                createWeekendMealTypeData().then(() => {
                  setModalStatus(null);
                  getWeekendMealTypeData();
                });
              }}
            />
            <div className="absolute right-1 top-1">
              <CloseIcon
                onClick={() => {
                  setModalStatus(null);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <input
              type="text"
              placeholder="유형 이름 작성"
              value={newMealType.meal_type}
              onChange={(e) => {
                let copy = { ...newMealType };
                copy.meal_type = e.target.value;
                setNewMealType(copy);
              }}
              className="w-full p-2 outline-none border-b-2 border-black/50"
            />
            <input
              type="text"
              placeholder="유형 구성 작성"
              value={newMealType.content}
              onChange={(e) => {
                let copy = { ...newMealType };
                copy.content = e.target.value;
                setNewMealType(copy);
              }}
              className="w-full p-2 outline-none border-b-2 border-black/50"
            />
            <input
              type="text"
              placeholder="유형 가격 작성"
              value={newMealType.price}
              onChange={(e) => {
                let copy = { ...newMealType };
                copy.price = e.target.value;
                setNewMealType(copy);
              }}
              className="w-full p-2 outline-none border-b-2 border-black/50"
            />
          </div>
        </div>
      );
    } else if (modalStatus === "manage") {
      return (
        <div className="absolute right-0 bg-white w-fit mt-3 p-10 rounded-md shadow-lg">
          <div className="flex items-center gap-5 mb-7">
            <div className="font-bold text-2xl">유형 관리</div>

            <ListBtn
              value="수정완료"
              color="bg-blue-400/90"
              onClick={() => {
                if (selectedType.id) {
                  patchWeekendMealTypeData(selectedType.id).then(() => {
                    getWeekendMealTypeData();
                    setModalStatus(null);
                  });
                }
              }}
            />
            <ListBtn
              value="삭제"
              color="bg-red-400/90"
              onClick={() => {
                if (selectedType.id) {
                  deleteWeekendMealTypeData(selectedType.id).then(() => {
                    getWeekendMealTypeData();
                    setModalStatus(null);
                  });
                }
              }}
            />

            <div className="absolute right-1 top-1">
              <CloseIcon
                onClick={() => {
                  setModalStatus(null);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <input
              type="text"
              placeholder="유형 이름 수정"
              value={newMealType.meal_type}
              onChange={(e) => {
                let copy = { ...newMealType };
                copy.meal_type = e.target.value;
                setNewMealType(copy);
              }}
              className="w-full p-2 outline-none border-b-2 border-black/50"
            />
            <input
              type="text"
              placeholder="유형 구성 수정"
              value={newMealType.content}
              onChange={(e) => {
                let copy = { ...newMealType };
                copy.content = e.target.value;
                setNewMealType(copy);
              }}
              className="w-full p-2 outline-none border-b-2 border-black/50"
            />
            <input
              type="text"
              placeholder="유형 가격 수정"
              value={newMealType.price}
              onChange={(e) => {
                let copy = { ...newMealType };
                copy.price = e.target.value;
                setNewMealType(copy);
              }}
              className="w-full p-2 outline-none border-b-2 border-black/50"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="relative">
      {onModal ? (
        <div className="absolute right-0 w-1/2">
          <div className="bg-white w-full p-10 rounded-md shadow-lg">
            <div className="flex items-center gap-10 mb-7">
              <div className="font-bold text-2xl">주말 유형 식수 리스트</div>
              <div>
                <ListBtn
                  value="추가하기"
                  color="bg-blue-400/90"
                  onClick={() => {
                    setModalStatus("create");
                    setNewMealType({
                      meal_type: "",
                      content: "",
                      price: "",
                    });
                  }}
                />
              </div>
            </div>
            <div className="absolute right-1 top-1">
              <CloseIcon
                onClick={() => {
                  setOnModal(false);
                }}
              />
            </div>
            <div className="flex gap-7 w-full justify-start overflow-auto">
              {mealType.map((v) => {
                return (
                  <div
                    className="flex flex-col min-w-fit bg-white border border-black/20 p-5 tracking-tighter rounded-2xl font-bold shadow-md cursor-pointer"
                    onClick={() => {
                      setSelectedType(v);
                      setModalStatus("manage");
                      setNewMealType(v);
                    }}
                  >
                    <div className="text-xl text-cyan-600">
                      {v.meal_type}유형
                    </div>
                    <div className="flex flex-col gap-2 text-sm mt-2 text-gray-500 ">
                      <div>구성 : {v.content}</div>
                      <div>가격 : {v.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {onModalFuc()}
        </div>
      ) : null}
      <div className="text-right">
        <ListBtn
          value="주말 식수 유형"
          color="bg-cyan-500/90"
          onClick={() => {
            setOnModal(true);
            getWeekendMealTypeData();
          }}
        />
      </div>
    </div>
  );
}

export default WeekendMeal;
