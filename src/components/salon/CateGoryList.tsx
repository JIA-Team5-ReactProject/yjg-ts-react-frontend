import { useState } from "react";
import PlusIcon from "../../icons/PlusIcon";
import { ListBtn, ListHead } from "../master/UserList";

function CateGoryList(props: any) {
  const { name } = props;
  // 카테고리 이름 수정 상태
  const [modify, setModify] = useState(false);
  // 수정 내용
  const [newName, setNewName] = useState("");
  // 서비스 드롭다운 상태
  const [dropdown, setDropdown] = useState(false);

  return (
    <div>
      <div className="flex gap-3 items-center border-2 border-gray-300 p-4 rounded-lg mt-10 text-2xl font-bold">
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
            <div className="w-32 text-center">{name}</div>
            <ListBtn
              value="수정"
              color="bg-pink-500"
              onClick={() => {
                setModify(true);
              }}
            />
            <ListBtn value="삭제" color="bg-red-500" onClick={() => {}} />
          </>
        )}
        <div className="flex-1 flex justify-end">
          <span
            className="text-sm items-center underline underline-offset-4 cursor-pointer text-gray-500"
            onClick={() => setDropdown(!dropdown)}
          >
            {dropdown ? "닫기" : "열기"}
          </span>
        </div>
      </div>
      <ServiceList dropdown={dropdown} />
    </div>
  );
}

function ServiceList(props: any) {
  const { dropdown } = props;
  const headList = ["시술명", "가격", "수정하기", "삭제하기"];
  const dataList = [];

  return (
    <>
      {dropdown ? (
        <div className="relative grid grid-cols-4 mt-4">
          {<ListHead headList={headList} />}
          <div className="absolute right-0 pt-1 pr-2">
            <PlusIcon />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CateGoryList;
