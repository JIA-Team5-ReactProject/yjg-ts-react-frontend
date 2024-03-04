import { useNavigate } from "react-router-dom";
import { ListBtn, ListHead, UserList } from "../master/UserList";
import CountCard from "../salon/CountCard";
import { customAxios } from "../../services/customAxios";
import { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { NoticeListType } from "../../types/post";
import Pagination from "../post/page/Pagination";
import SearchBar from "../post/page/SearchBar";

function AdminMain() {
  const headList = [
    { value: "제목", col: "col-span-4" },
    { value: "태그", col: "col-span-1" },
    { value: "", col: "col-span-1" },
  ];
  const dataList = [
    { value: "title", col: "col-span-4" },
    { value: "tag", col: "col-span-1" },
    [
      {
        value: "조회",
        color: "bg-cyan-500",
        onClick: (user: NoticeListType) => {
          navigate(`/main/admin/post/reading/${user.id}`);
        },
      },
    ],
  ];
  // 공지사항 데이터 값
  const [noticeList, setNoticeList] = useState<NoticeListType[]>([]);
  // 검색 바 태그 값
  const [tag, setTag] = useState("");
  // 검색 바 제목 값
  const [search, setSearch] = useState("");
  // 공지사항 페이지 값
  const [page, setPage] = useState(1);
  // 공지사항 마지막 페이지 값
  const [lastPage, setLastPage] = useState(8);
  const navigate = useNavigate();

  // 페이지 렌더링 시
  useEffect(() => {
    getNoticeListData({ page: 1 });
  }, []);

  // 검색 바 데이터 변경 시
  useEffect(() => {
    if (page === 1) {
      let data: { page: number; tag?: string; title?: string } = { page: 1 };
      if (tag) {
        data = { ...data, tag: tag };
      }
      if (search) {
        data = { ...data, title: search };
      }
      getNoticeListData(data);
    }
    setPage(1);
  }, [tag, search]);

  // 페이지 변경 시
  useEffect(() => {
    let data: { page: number; tag?: string; title?: string } = { page: page };
    if (tag) {
      data = { ...data, tag: tag };
    }
    if (search) {
      data = { ...data, title: search };
    }
    getNoticeListData(data);
  }, [page]);

  // 공지사항 데이터 가져오기
  const getNoticeListData = async (data: any) => {
    try {
      const config: AxiosRequestConfig = {
        params: data,
      };
      const notice = await customAxios.get("/api/admin/notice", config);
      setNoticeList(notice.data.notices.data);
      setLastPage(notice.data.notices.last_page);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-10 pr-10">
      <div className="flex flex-col ml-6">
        <CountCard header="금일 외박/외출" count={50} />
        <CountCard header="금일 회의실" count={6} />
        <CountCard header="미처리 A/S" count={26} />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-4  font-bold text-3xl pr-4">
          <div>공지사항</div>
          <div className="flex-1 flex justify-center">
            <SearchBar tag={tag} setTag={setTag} setSearch={setSearch} />
          </div>
          <ListBtn
            value="작성"
            color="bg-cyan-600"
            onClick={() => {
              navigate("/main/admin/post/writing");
            }}
          />
        </div>
        <div className="grid grid-cols-6 border-x border-black/10 shadow-lg overflow-hidden rounded-2xl">
          {<ListHead headList={headList} />}
          {noticeList.map((user) => {
            return <UserList user={user} dataList={dataList} />;
          })}
        </div>
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
        <div className="text-center font-bold text-xs">{`1 - ${lastPage}`}</div>
      </div>
    </div>
  );
}

export default AdminMain;
