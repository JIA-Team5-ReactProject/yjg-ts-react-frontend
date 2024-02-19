import { useState } from "react";
import { ListHead } from "../master/UserList";

function RepairList() {
  // 리스트종류 스테이트
  const [listKind, setListKind] = useState("completed");
  const kind = [
    {
      state: "completed",
      head: "처리완료",
      headList: ["제목", "작성자", "호수", "처리일자"],
    },
    {
      state: "repairing",
      head: "처리중",
      headList: ["제목", "작성자", "호수", "방문희망"],
    },
    {
      state: "unchecked",
      head: "미처리",
      headList: ["제목", "작성자", "호수", "작성일자"],
    },
  ];

  return (
    <div className="flex flex-col mx-10 mt-4">
      <div className="text-4xl font-bold mb-6">A/S 리스트</div>
      <div className="flex gap-3 pl-2 items-end tracking-tighter">
        {kind.map((v) => {
          return (
            <span
              className={`${
                listKind === v.state
                  ? "font-bold text-xl underline underline-offset-2"
                  : "text-gray-400"
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
      <div className="grid grid-cols-4 mt-2">
        {kind.map((v) =>
          listKind === v.state ? <ListHead headList={v.headList} /> : <></>
        )}
      </div>
    </div>
  );
}

export default RepairList;
