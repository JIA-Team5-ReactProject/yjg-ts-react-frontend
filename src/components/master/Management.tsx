import { useEffect, useRef, useState } from "react";
import { customAxios } from "../../services/customAxios";
import { GetUserData, UserPower } from "../../types/auth";
import { ListBtn, ListHead, UserList } from "./UserList";
import CheckIcon from "../../icons/CheckIcon";

function Management() {
  const headList = ["이름", "전화번호", "메일", "관리"];
  const dataList = [
    "name",
    "phone_number",
    "email",
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
          deleteData(data.id);
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

  useEffect(() => {
    //페이지 접속 시 승인 유저 데이터 받아오기
    getData();
  }, []);

  useEffect(() => {
    // 모달 접속 시 해당 유저 데이터 받아오기
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

  const getData = async () => {
    try {
      // 승인 유저데이터 가져오기
      const approvedData = await customAxios.get("/api/admin/approved");
      setApprovedUsers(approvedData.data.admins);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async (data: number) => {
    try {
      // 유저데이터 삭제하기
      await customAxios.delete(`/api/admin/unregister/${data}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const patchPower = async (data: any) => {
    try {
      //선택된 유저 권한 변경 요청
      await customAxios.patch("/api/admin/privilege", {
        // id: Number(userId),
        id: userId.current,
        ...data,
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-auto h-screen pt-32 pr-6 pb-6 overflow-scroll">
      {onModal ? (
        <div className="fixed flex items-center justify-center inset-0 bg-black/35">
          <div className="bg-white w-3/5 h-3/5 py-12">
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
            <div className="flex justify-end mt-14 mr-6 gap-4">
              <ListBtn
                value="저장"
                color="bg-blue-500"
                onClick={() => {
                  patchPower(userPower);
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
      <div className="grid grid-cols-4 p-12 text-xl font-semibold text-center">
        <div className="col-span-3 text-3xl font-bold mb-10 tracking-tighter text-left">
          관리자 리스트
        </div>
        <div className="col-span-1 self-end text-right p-4 tracking-widest">
          {approvedUsers.length}명
        </div>
        <ListHead headList={headList} />
        {approvedUsers.map((user) => {
          return <UserList user={user} dataList={dataList} />;
        })}
      </div>
    </div>
  );
}

export default Management;

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
