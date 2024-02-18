import { ListBtn, ListHead } from "../master/UserList";
import CountCard from "../salon/CountCard";

function AdminMain() {
  const headList = ["제목", "태그", "작성자"];

  return (
    <div className="flex gap-40 mt-6 pr-10">
      <div className="flex flex-col ml-6">
        <CountCard header="금일 외박/외출" count={50} />
        <CountCard header="금일 회의실" count={6} />
        <CountCard header="미처리 A/S" count={26} />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-4  font-bold text-3xl pr-4">
          <div className="flex">공지사항</div>
          <div className="flex">
            <div className="relative text-gray-600 ">
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-4 mr-4"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-1"></div>
          <ListBtn value="작성" color="bg-cyan-600" onClick={() => {}} />
        </div>
        <div className="grid grid-cols-3 text-xl font-bold text-center">
          {<ListHead headList={headList} />}
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
