import { useEffect, useRef, useState } from "react";
import { customAxios } from "../../services/customAxios";
import { GetUserData, PrivilegeType } from "../../types/auth";
import { ListBtn, ListHead, UserList } from "./UserList";
import CheckIcon from "../../icons/CheckIcon";
import { GetApprovedData } from "../../types/master";
import { AxiosRequestConfig } from "axios";

function OVerallUser() {
  const headList = [
    { value: "이름", col: "col-span-1" },
    { value: "전화번호", col: "col-span-1" },
    { value: "메일", col: "col-span-2" },
    { value: "", col: "col-span-1" },
  ];
  const dataList = [
    { value: "name", col: "col-span-1" },
    { value: "phone_number", col: "col-span-1" },
    { value: "email", col: "col-span-2" },
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
  // 모달 ON / OFF ( 유저 데이터 유무로 확인 )
  const [onModal, setOnModal] = useState<GetUserData>();
  // 승인 유저들 데이터
  const [approvedUsers, setApprovedUsers] = useState<GetUserData[]>([]);
  // 모달 유저의 권한
  const [userPower, setUserPower] = useState<string[]>([]);
  // 권한 목록 데이터
  const [privilegesData, setPrivilegesData] = useState<PrivilegeType[]>([]);
  let userId = useRef(0);

  // 페이지 렌더링 시
  useEffect(() => {
    getData({ type: "approved" });
    getPrivilegeData();
  }, []);

  // 모달 접속 시 해당 유저 데이터 받아오기
  useEffect(() => {
    if (onModal) {
      let power: string[] = [];
      onModal.privileges.map((data) => {
        power.push(data.id);
      });
      setUserPower(power);
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
  const patchPower = async (data: string[]) => {
    try {
      await customAxios.patch("/api/admin/privilege", {
        admin_id: userId.current,
        privileges: userPower,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 권한 목록 가져오기
  const getPrivilegeData = async () => {
    try {
      const privilegeData = await customAxios.get("/api/admin/privilege");
      setPrivilegesData(privilegeData.data.privileges);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-10 h-full">
      {onModal ? (
        <div className="fixed flex items-center justify-center inset-0 bg-black/35">
          <div className="bg-white w-3/5 h-3/5 py-12 overflow-auto shadow-lg">
            <div className="grid grid-cols-3 p-6 text-center text-2xl font-bold gap-5">
              <div className="col-span-3 text-2xl text-left font-bold mb-10 ml-5">
                <span className="text-blue-700 text-5xl">{onModal.name} </span>
                님의 관리자 권한
              </div>
              <div className="text-lg">권한</div>
              <div className="text-lg">ON</div>
              <div className="text-lg">OFF</div>
              {privilegesData.map((v) => {
                return (
                  <CheckPower
                    power={v.id}
                    name={v.privilege}
                    userPower={userPower}
                    setUserPower={setUserPower}
                  />
                );
              })}
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
        <div className="flex-1 text-2xl font-bold tracking-tighter text-left">
          관리자 리스트
        </div>
        <div className="self-end text-right p-4 tracking-widest font-semibold">
          {approvedUsers.length}명
        </div>
      </div>
      <div className="bg-white p-4 h-5/6 rounded-2xl overflow-auto shadow-lg">
        <div className="grid grid-cols-5 text-center border-x border-black/10 shadow-lg overflow-hidden rounded-2xl">
          <ListHead headList={headList} />
          {approvedUsers.map((user) => {
            return <UserList user={user} dataList={dataList} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default OVerallUser;

function CheckPower(props: {
  power: string;
  name: string;
  userPower: string[];
  setUserPower: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { power, name, userPower, setUserPower } = props;

  const changePower = (power: string) => {
    if (userPower.includes(power)) {
      const filteredPower = userPower.filter((item) => item !== power);
      setUserPower(filteredPower);
    } else {
      const newPower = [...userPower, power];
      setUserPower(newPower);
    }
  };

  return (
    <>
      <div>{name}</div>
      {userPower.includes(power) ? (
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
