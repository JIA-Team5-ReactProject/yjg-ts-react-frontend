import { ListBtn } from "../master/UserList";
import { customAxios } from "../../services/customAxios";
import { useEffect, useState } from "react";
import CateGoryList from "./CateGoryList";
import { CategoryType } from "../../types/salon";
import PriceIcon from "../../icons/PriceTag";
import PriceTag from "./PriceTag";

function PriceCorrection() {
  // 전체 가격표 상태
  const [priceTag, setPriceTag] = useState(false);
  // 카테고리 데이터
  const [category, setCategory] = useState<CategoryType[]>([]);
  // 카테고리 생성 명 입력 값
  const [newCategoryName, setNewCategoryName] = useState("");
  // 리스트종류 스테이트
  const [listKind, setListKind] = useState("male");
  const kind = [
    {
      state: "male",
      head: "남자",
    },
    {
      state: "female",
      head: "여자",
    },
  ];

  // 카테고리 리스트 가져오기
  const getCategoryData = async () => {
    try {
      const categoryData = await customAxios.get("/api/admin/salon-category");
      setCategory(categoryData.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // 카테고리 생성
  const createCategory = async () => {
    try {
      await customAxios.post("/api/admin/salon-category", {
        category_name: newCategoryName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 카테고리 이름 수정하기
  const modifyCategory = async (id: string, newName: string) => {
    try {
      await customAxios.patch("/api/admin/salon-category", {
        category_id: id,
        category_name: newName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 카테고리 삭제
  const deleteCategory = async (id: string) => {
    try {
      await customAxios.delete(`/api/admin/salon-category/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 페이지 렌더링할 시
  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <div>
      <PriceTag
        priceTag={priceTag}
        setPriceTag={setPriceTag}
        category={category}
      />
      <div className="flex border-b-2 border-black">
        <div className="flex bg-cyan-400 rounded-lg my-auto p-2 shadow-lg text-black/50 hover:bg-cyan-400/80 hover:text-black">
          <PriceIcon
            onClick={() => {
              setPriceTag(true);
            }}
          />
        </div>
        <div className="flex items-end gap-2 flex-1 text-4xl font-bold p-4 tracking-tighter text-left">
          <span className="mr-6">가격표 관리</span>
          {kind.map((v) => {
            return (
              <span
                className={`${
                  listKind === v.state
                    ? "font-bold text-2xl text-purple-500"
                    : "text-gray-400 text-xl"
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
        <div className="flex gap-2 justify-end items-end pb-4">
          <div>
            <input
              type="text"
              className="p-2 w-32 text-center focus:outline-none focus:ring-2 focus:rounded-xl focus:ring-blue-500"
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
              color="bg-blue-500"
              onClick={() => {
                createCategory().then(() => {
                  getCategoryData();
                });
                setNewCategoryName("");
              }}
            />
          </div>
        </div>
      </div>
      {category.map((v) => (
        <CateGoryList
          id={v.id}
          category={v.category}
          gender={listKind}
          getCategoryFuc={getCategoryData}
          deleteCategoryFuc={deleteCategory}
          modifyCategoryFuc={modifyCategory}
        />
      ))}
    </div>
  );
}

export default PriceCorrection;
