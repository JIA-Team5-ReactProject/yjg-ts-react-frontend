import { ListBtn } from "../master/UserList";
import { customAxios } from "../../services/customAxios";
import { useState } from "react";
import CateGoryList from "./CateGoryList";

function PriceCorrection() {
  // 더미 값
  const category = ["커트 시술", "펌 시술", "염색 시술"];

  // 카테고리 생성 명 입력 값
  let [categoryName, setCategoryName] = useState("");

  const createCategory = async () => {
    try {
      await customAxios.post("/api/admin/salon-category", {
        category_name: categoryName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex border-b-2 border-black">
        <div className="flex-1 text-4xl font-bold p-6 tracking-tighter text-left ">
          가격표 관리
        </div>
        <div className="flex gap-2 justify-end items-end pb-4">
          <div>
            <input
              type="text"
              className="p-2 w-32 text-center focus:outline-none focus:ring-2 focus:rounded-xl focus:ring-blue-500"
              placeholder="카테고리 명"
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
              value={categoryName}
            />
          </div>
          <div>
            <ListBtn
              value="생성"
              color="bg-blue-500"
              onClick={() => {
                createCategory();
                setCategoryName("");
              }}
            />
          </div>
        </div>
      </div>
      {category.map((v) => (
        <CateGoryList name={v} />
      ))}
    </div>
  );
}

export default PriceCorrection;
