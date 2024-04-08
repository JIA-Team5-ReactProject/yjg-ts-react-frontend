import { HTMLProps, useEffect, useRef, useState } from "react";
import * as S from "../../../styles/calender";
import CountCard from "../../salon/CountCard";
import dayjs from "dayjs";
import { ListHead, UserList } from "../../master/UserList";
import { privateApi } from "../../../services/customAxios";
import { AxiosRequestConfig } from "axios";
import { AbsenceListType, GetAbsenceDataType } from "../../../types/admin";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../post/page/SearchBar";
import Pagination from "../../post/page/Pagination";

function CheckStay() {
  const headList = [
    { value: "학번", col: "col-span-1" },
    { value: "이름", col: "col-span-1" },
    { value: "외출일", col: "col-span-2" },
    { value: "", col: "col-span-1" },
  ];
  const dataList = [
    { value: "student_id", col: "col-span-1" },
    { value: "user_name", col: "col-span-1" },
    { value: "start_date", col: "col-span-2" },
    [
      {
        value: "조회",
        color: "bg-cyan-500",
        onClick: (user: AbsenceListType) => {
          navigate(`/main/admin/reading/${user.id}`, {
            state: { type: "Absence" },
          });
        },
      },
    ],
  ];
  //캘린더에서 선택한 DATE값
  const [clickDay, setClickDay] = useState<Value>(new Date());
  const formattedDate = useRef<string>("2024-01-01");
  // 리스트종류 스테이트
  const [listKind, setListKind] = useState("sleep");
  const kind = [
    {
      state: "sleep",
      head: "외박 인원",
    },
    {
      state: "go",
      head: "외출 인원",
    },
  ];
  // 외박,외출 데이터 값
  const [absence, setAbsence] = useState<AbsenceListType[]>([]);
  // 태그 리스트
  const tagList = [{ value: "name", name: "이름" }];
  // 검색 바 태그 값
  const [tag, setTag] = useState("");
  // 검색 바 제목 값
  const [search, setSearch] = useState("");
  // A/S 글 페이지 값
  const [page, setPage] = useState(1);
  // A/S 마지막 페이지 값
  const [lastPage, setLastPage] = useState(1);
  // 해당 일 외박 신청 수
  const [sleepMember, setSleepMember] = useState(0);
  // 해당 일 외출 신청 수
  const [goMember, setGoMember] = useState(0);
  const navigate = useNavigate();

  // 외박, 외출 상태 변경 시
  useEffect(() => {
    setPage(1);
    setSearch("");
    getAbsenceData({
      type: listKind,
      page: 1,
      date: formattedDate.current,
    });
  }, [listKind]);

  // 날짜 변경 시 발생
  useEffect(() => {
    if (clickDay instanceof Date) {
      formattedDate.current = dayjs(clickDay).format("YYYY-MM-DD");
      getAbsenceData({
        type: listKind,
        page: 1,
        date: formattedDate.current,
      });
      getCountData({ date: formattedDate.current });
    }
  }, [clickDay]);

  // 검색 바 데이터 변경 시
  useEffect(() => {
    if (page === 1) {
      let data: GetAbsenceDataType = {
        page: 1,
        type: listKind,
        date: formattedDate.current,
      };
      if (search) {
        data = { ...data, user_name: search };
      }
      getAbsenceData(data);
    }
    setPage(1);
  }, [search]);

  // 페이지 변경 시
  useEffect(() => {
    let data: GetAbsenceDataType = {
      page: page,
      type: listKind,
      date: formattedDate.current,
    };

    if (search) {
      data = { ...data, user_name: search };
    }
    getAbsenceData(data);
  }, [page]);

  // 외출,외박 목록 가져오기
  const getAbsenceData = async (data: GetAbsenceDataType) => {
    try {
      const config: AxiosRequestConfig = {
        params: data,
      };
      const AbsenceData = await privateApi.get("/api/absence", config);
      setAbsence(AbsenceData.data.absence_lists.data);
      setLastPage(AbsenceData.data.absence_lists.last_page);
    } catch (error) {
      console.log(error);
    }
  };

  // 외출, 외박 신청자 수 가져오기
  const getCountData = async (data: { date: string }) => {
    try {
      const config: AxiosRequestConfig = { params: data };
      const countData = await privateApi.get("/api/absence/count", config);
      setGoMember(countData.data.go_count);
      setSleepMember(countData.data.sleep_count);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-7">
      <div className="flex-col">
        <div className="flex justify-between px-3 gap-6">
          <CountCard header="외박 신청" count={sleepMember} />
          <CountCard header="외출 신청" count={goMember} />
        </div>
        <S.CalendarBox className="flex-auto">
          <S.StyleCalendar
            locale="en"
            onChange={setClickDay}
            value={clickDay}
            calendarType="US"
          />
        </S.CalendarBox>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex">
          <div className="flex gap-4 items-end tracking-tighter text-left mb-6">
            {kind.map((v) => {
              return (
                <span
                  className={`${
                    listKind === v.state
                      ? "font-bold text-3xl underline underline-offset-8"
                      : "text-gray-400 text-2xl"
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
          <div className="flex-1 flex items-center justify-end">
            <SearchBar
              tagList={tagList}
              tag={tag}
              setTag={setTag}
              setSearch={setSearch}
            />
          </div>
        </div>
        <div className="bg-white flex flex-col gap-2 p-4 h-full rounded-2xl overflow-auto shadow-lg">
          <div className="grid grid-cols-5 mb-5 border-x border-black/10 shadow-lg overflow-hidden rounded-2xl text-center">
            <ListHead headList={headList} />
            {absence.map((user) => {
              return <UserList user={user} dataList={dataList} />;
            })}
          </div>
          <div className="flex-1 justify-end flex flex-col gap-2">
            <Pagination page={page} setPage={setPage} lastPage={lastPage} />
            <div className="text-center font-bold text-xs">{`1 - ${lastPage}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckStay;
