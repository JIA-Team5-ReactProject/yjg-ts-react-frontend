import { useEffect, useRef, useState } from "react";
import { customAxios } from "../../services/customAxios";
import { GetUserData, UserPower } from "../../types/auth";
import { ListBtn, ListHead, UserList } from "./UserList";
import CheckIcon from "../../icons/CheckIcon";
import { GetApprovedData } from "../../types/master";
import { AxiosRequestConfig } from "axios";

function OVerallUser() {
  const headList = [
    { value: "이름", col: "col-span-1" },
    { value: "전화번호", col: "col-span-1" },
    { value: "메일", col: "col-span-1" },
    { value: "", col: "col-span-1" },
  ];
  const dataList = [
    { value: "name", col: "col-span-1" },
    { value: "phone_number", col: "col-span-1" },
    { value: "email", col: "col-span-1" },
    [
      {
        value: "권한설정",
        color: "bg-blue-400",
        onClick: (data: GetUserData) => {
          setOnModal(data);
        },
      },
      {
        value: "삭제",
        color: "bg-red-400",
        onClick: (data: GetUserData) => {
          deleteData(data.id).then(() => {
            getData({ type: "approved" });
          });
        },
      },
    ],
  ];
  //모달 ON / OFF ( 유저 데이터 유무로 확인 )
  const [onModal, setOnModal] = useState<GetUserData>();
  //승인 유저들 데이터
  const [approvedUsers, setApprovedUsers] = useState<GetUserData[]>([]);
  //모달 유저의 데이터
  const [userPower, setUserPower] = useState<UserPower>({
    salon_privilege: false,
    restaurant_privilege: false,
    admin_privilege: false,
  });
  let userId = useRef(0);

  //페이지 접속 시 승인 유저 데이터 받아오기
  useEffect(() => {
    getData({ type: "approved" });
  }, []);

  // 모달 접속 시 해당 유저 데이터 받아오기
  useEffect(() => {
    if (onModal) {
      let copy = {
        salon_privilege: onModal.salon_privilege,
        restaurant_privilege: onModal.restaurant_privilege,
        admin_privilege: onModal.admin_privilege,
      };
      setUserPower({ ...copy });
      userId.current = onModal.id;
    }
  }, [onModal]);

  // 승인 유저데이터 가져오기
  const getData = async (data: GetApprovedData) => {
    try {
      const config: AxiosRequestConfig = {
        params: data,
      };
      const approvedData = await customAxios.get("/api/admin/list", config);
      setApprovedUsers(approvedData.data.admins);
    } catch (error) {
      console.log(error);
    }
  };

  // 유저데이터 삭제하기
  const deleteData = async (data: number) => {
    try {
      await customAxios.delete(`/api/admin/master/${data}`);
    } catch (error) {
      console.log(error);
    }
  };

  //선택된 유저 권한 변경 요청
  const patchPower = async (data: UserPower) => {
    try {
      await customAxios.patch("/api/admin/privilege", {
        admin_id: userId.current,
        ...data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-10">
      {onModal ? (
        <div className="fixed flex items-center justify-center inset-0 bg-black/35">
          <div className="bg-white w-3/5 h-3/5 py-12 overflow-auto">
            <div className="grid grid-cols-3 p-6 text-center text-2xl font-bold gap-5">
              <div className="col-span-3 text-2xl text-left font-bold mb-10 ml-5">
                <span className="text-blue-700 text-5xl">{onModal.name} </span>
                님의 관리자 권한
              </div>
              <div className="text-lg">권한</div>
              <div className="text-lg">ON</div>
              <div className="text-lg">OFF</div>
              <CheckPower
                power="salon_privilege"
                name="미용"
                userPower={userPower}
                setUserPower={setUserPower}
              />
              <CheckPower
                power="admin_privilege"
                name="행정"
                userPower={userPower}
                setUserPower={setUserPower}
              />
              <CheckPower
                power="restaurant_privilege"
                name="식당"
                userPower={userPower}
                setUserPower={setUserPower}
              />
            </div>
            <div className="flex justify-end mt-20 mr-14 gap-4">
              <ListBtn
                value="저장"
                color="bg-blue-500"
                onClick={() => {
                  patchPower(userPower).then(() => {
                    getData({ type: "approved" });
                  });
                  setOnModal(undefined);
                }}
              />
              <ListBtn
                value="취소"
                color="bg-red-500"
                onClick={() => {
                  setOnModal(undefined);
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex">
        <div className="flex-1 text-3xl font-bold mb-10 tracking-tighter text-left">
          관리자 리스트
        </div>
        <div className="self-end text-right p-4 tracking-widest font-semibold">
          {approvedUsers.length}명
        </div>
      </div>
      <div className="grid grid-cols-4 border-x border-black/10 shadow-lg overflow-hidden rounded-2xl">
        <ListHead headList={headList} />
        {approvedUsers.map((user) => {
          return <UserList user={user} dataList={dataList} />;
        })}
      </div>
    </div>
  );
}

export default OVerallUser;

function CheckPower(props: {
  power: keyof UserPower;
  name: string;
  userPower: UserPower;
  setUserPower: React.Dispatch<React.SetStateAction<UserPower>>;
}) {
  const { power, name, userPower, setUserPower } = props;

  const changePower = (power: keyof UserPower) => {
    let copy = { ...userPower };
    copy[power] = !copy[power];
    setUserPower(copy);
  };

  return (
    <>
      <div>{name}</div>
      {userPower[power] ? (
        <>
          <CheckIcon />
          <div
            className="cursor-pointer"
            onClick={() => {
              changePower(power);
            }}
          ></div>
        </>
      ) : (
        <>
          <div
            className="cursor-pointer"
            onClick={() => {
              changePower(power);
            }}
          ></div>
          <CheckIcon />
        </>
      )}
    </>
  );
}
