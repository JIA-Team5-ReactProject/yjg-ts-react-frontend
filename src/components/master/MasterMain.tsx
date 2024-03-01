import { useEffect, useState } from "react";
import { customAxios } from "../../services/customAxios";
import { GetUserData } from "../../types/auth";
import { ListHead, UserList } from "./UserList";
import { GetApprovedData } from "../../types/master";
import { AxiosRequestConfig } from "axios";

function MasterMain() {
  const headList = [
    { value: "이름", col: "col-span-1" },
    { value: "전화번호", col: "col-span-1" },
    { value: "메일주소", col: "col-span-2" },
    { value: "승인처리", col: "col-span-1" },
  ];
  const dataList = [
    { value: "name", col: "col-span-1" },
    { value: "phone_number", col: "col-span-1" },
    { value: "email", col: "col-span-2" },
    [
      {
        value: "승인",
        color: "bg-blue-400",
        onClick: (data: GetUserData) => {
          approval(data.id);
        },
      },
      {
        value: "거절",
        color: "bg-red-400",
        onClick: (data: GetUserData) => {
          unapproval(data.id);
        },
      },
    ],
  ];
  const [unapprovedUsers, setUnapprovedUsers] = useState<GetUserData[]>([]);
  useEffect(() => {
    getData({ type: "unapproved" });
  }, []);

  // 미승인 유저데이터 가져오기
  const getData = async (data: GetApprovedData) => {
    try {
      const config: AxiosRequestConfig = {
        params: data,
      };
      const unapprovedData = await customAxios.get("/api/admin/list", config);
      setUnapprovedUsers(unapprovedData.data.admins);
    } catch (error) {
      console.log(error);
    }
  };

  // 유저 데이터 승인요청
  const approval = async (data: number) => {
    try {
      await customAxios.patch("/api/admin/approve", {
        admin_id: data,
        approve: true,
      });
      getData({ type: "unapproved" });
    } catch (error) {
      console.log(error);
    }
  };

  // 유저 데이터 거절요청
  const unapproval = async (data: number) => {
    try {
      await customAxios.patch("/api/admin/approve", {
        admin_id: data,
        approve: false,
      });
      getData({ type: "unapproved" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-10">
      <div className="flex mb-4">
        <div className="flex-1 text-3xl font-bold mb-10 tracking-tighter text-left">
          관리자 승인 대기 리스트
        </div>
        <div className="self-end text-right font-bold tracking-widest">
          {unapprovedUsers.length}명
        </div>
      </div>
      <div className="grid grid-cols-5 text-xl font-semibold text-center border-x border-black/10 shadow-lg overflow-hidden rounded-2xl">
        <ListHead headList={headList} />
        {unapprovedUsers.map((user) => {
          return <UserList user={user} dataList={dataList} />;
        })}
      </div>
    </div>
  );
}

export default MasterMain;
