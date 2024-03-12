import { useEffect, useState } from "react";
import { ListBtn } from "../master/UserList";
import {
  SalonCategoryType,
  GetServiceType,
  SalonServiceType,
} from "../../types/salon";
import { customAxios } from "../../services/customAxios";
import SalonServiceList from "./SalonServiceList";
import { AxiosRequestConfig } from "axios";

function SalonCategoryList(props: SalonCategoryType) {
  const {
    id,
    category,
    gender,
    deleteCategoryFuc,
    modifyCategoryFuc,
    getCategoryFuc,
  } = props;
  // 카테고리 이름 수정 상태
  const [modify, setModify] = useState(false);
  // 수정 내용
  const [newName, setNewName] = useState("");
  // 서비스 드롭다운 상태
  const [dropdown, setDropdown] = useState(false);
  // 서비스 리스트
  const [service, setService] = useState<SalonServiceType[]>([]);

  // 성별 바뀔 시
  useEffect(() => {
    getServiceData({ category_id: id, gender: gender });
  }, [gender]);

  // 서비스 리스트 가져오기
  const getServiceData = async (data: GetServiceType) => {
    try {
      const config: AxiosRequestConfig = {
        params: data,
      };
      const serviceData = await customAxios.get("/api/salon/service", config);
      setService(serviceData.data.services);
    } catch (error) {
      console.log(error);
    }
  };

  // 서비스 리스트 추가하기
  const createService = async (id: string, service: string, price: string) => {
    try {
      await customAxios.post("/api/salon/service", {
        category_id: id,
        service_name: service,
        gender: gender,
        price: price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 서비스 리스트 삭제하기
  const deleteService = async (service_id: string) => {
    try {
      await customAxios.delete(`/api/salon/service/${service_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex gap-3 items-center border-2 border-gray-300 p-4 rounded-lg mt-10 text-2xl font-bold shadow-md">
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
              color="bg-sky-500"
              onClick={() => {
                setModify(false);
                modifyCategoryFuc(id, newName).then(() => {
                  getCategoryFuc();
                });
              }}
            />
            <ListBtn
              value="취소"
              color="bg-red-500"
              onClick={() => {
                setModify(false);
              }}
            />
          </>
        ) : (
          <>
            <div className="w-32 text-center">{category}</div>
            <ListBtn
              value="수정"
              color="bg-pink-500"
              onClick={() => {
                setModify(true);
              }}
            />
            <ListBtn
              value="삭제"
              color="bg-red-500"
              onClick={() => {
                deleteCategoryFuc(id).then(() => {
                  getCategoryFuc();
                });
              }}
            />
          </>
        )}
        <div className="flex-1 flex justify-end">
          <span
            className="text-sm items-center underline underline-offset-4 cursor-pointer text-gray-500"
            onClick={() => {
              setDropdown(!dropdown);
              if (!dropdown)
                getServiceData({ category_id: id, gender: gender });
            }}
          >
            {dropdown ? "닫기" : "열기"}
          </span>
        </div>
      </div>
      {dropdown ? (
        <SalonServiceList
          id={id}
          service={service}
          gender={gender}
          createServiceFuc={createService}
          deleteServiceFuc={deleteService}
          getServiceFuc={getServiceData}
        />
      ) : null}
    </div>
  );
}

export default SalonCategoryList;
