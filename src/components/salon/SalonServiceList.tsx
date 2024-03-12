import { useEffect, useState } from "react";
import PlusIcon from "../../icons/PlusIcon";
import { ServiceListType, SalonServiceType } from "../../types/salon";
import { ListBtn, ListHead, UserList } from "../master/UserList";

function SalonServiceList(props: ServiceListType) {
  const {
    service,
    id,
    gender,
    createServiceFuc,
    deleteServiceFuc,
    getServiceFuc,
  } = props;
  const headList = [
    { value: "시술명", col: "col-span-1" },
    { value: "가격", col: "col-span-1" },
    { value: "", col: "col-span-1" },
  ];
  const dataList = [
    { value: "service", col: "col-span-1" },
    { value: "price", col: "col-span-1" },
    [
      {
        value: "삭제",
        color: "bg-red-400",
        onClick: (service: SalonServiceType) => {
          deleteServiceFuc(service.id).then(() => {
            getServiceFuc({ category_id: id, gender: gender });
          });
        },
      },
    ],
  ];
  // 서비스 생성 상태
  const [createService, setCreateService] = useState(false);
  // 새로운 서비스 명
  const [newName, setNewName] = useState("");
  // 새로운 서비스 값
  const [newValue, setNewValue] = useState("");

  // 생성 칸 열릴 시 초기화 작업
  useEffect(() => {
    setNewName("");
    setNewValue("");
  }, [createService]);

  return (
    <>
      <div className="relative grid grid-cols-3 mt-2 text-center border-x border-black/10 shadow-lg overflow-hidden rounded-2xl">
        {<ListHead headList={headList} />}
        <div className="absolute right-0 pt-1 pr-2">
          <PlusIcon
            onClick={() => {
              setCreateService(true);
            }}
          />
        </div>
        {createService ? (
          <>
            <input
              id="name"
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              className="p-2 mx-5 my-3 text-center font-bold text-xl border border-black rounded-md"
            />
            <input
              id="value"
              type="text"
              value={newValue}
              onChange={(e) => {
                setNewValue(e.target.value);
              }}
              className="p-2 mx-5 my-3 text-center font-bold text-xl border border-black rounded-md"
            />
            <div className="flex gap-3 items-center justify-center">
              <ListBtn
                value="생성"
                color="bg-blue-500"
                onClick={() => {
                  createServiceFuc(id, newName, newValue).then(() => {
                    getServiceFuc({ category_id: id, gender: gender });
                  });
                  setCreateService(false);
                }}
              />
              <ListBtn
                value="취소"
                color="bg-red-500"
                onClick={() => {
                  setCreateService(false);
                }}
              />
            </div>
          </>
        ) : null}

        {service.map((v: SalonServiceType) => (
          <UserList user={v} dataList={dataList} />
        ))}
      </div>
    </>
  );
}

export default SalonServiceList;
