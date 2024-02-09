import { useEffect, useState } from "react";
import { customAxios } from "../../services/customAxios";
import { GetUserData } from "../../types/auth";
import { ListHead, UserList } from "./UserList";

function MasterMain() {
  const headList = ["이름", "전화번호", "메일주소", "승인처리"];
  const dataList = [
    "name",
    "phone_number",
    "email",
    [
      {
        value: "승인",
        color: "bg-blue-300",
        onClick: (data: GetUserData) => {
          approval(data.id);
        },
      },
      {
        value: "거절",
        color: "bg-red-300",
        onClick: (data: GetUserData) => {
          unapproval(data.id);
        },
      },
    ],
  ];
  const [unapprovedUsers, setUnapprovedUsers] = useState<GetUserData[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // 미승인 유저데이터 가져오기
      const unapprovedData = await customAxios.get("/api/admin/unapproved");
      setUnapprovedUsers(unapprovedData.data.admins);
    } catch (error) {
      console.log(error);
    }
  };

  const approval = async (data: number) => {
    try {
      // 유저 데이터 승인요청
      await customAxios.patch("/api/admin/approve", {
        admin_id: data,
        approve: true,
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const unapproval = async (data: number) => {
    try {
      // 유저 데이터 거절요청
      await customAxios.patch("/api/admin/approve", {
        admin_id: data,
        approve: false,
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-4 p-12 text-xl font-semibold text-center">
      <div className="col-span-3 text-4xl font-bold mb-10 tracking-tighter text-left">
        관리자 승인 대기 리스트
      </div>
      <div className="col-span-1 self-end text-right p-4 tracking-widest">
        {unapprovedUsers.length}명
      </div>
      <ListHead headList={headList} />
      {unapprovedUsers.map((user) => {
        return <UserList user={user} dataList={dataList} />;
      })}
    </div>
  );
}

export default MasterMain;
