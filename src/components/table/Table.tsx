import { DataListBtnType, UserListType } from "../../types/master";
import { formatPhoneNumber } from "../../utils/formatPhoneNum";

//리스트 유저데이터
function UserList(props: UserListType) {
  const { user, dataList } = props;

  // 값에 따른 필터링
  const dataFilter = (data: { value: string; col: string; type?: string }) => {
    if (data.type === "phoneNum") {
      return (
        <div
          className={`m-auto py-5 px-6 bg-white font-semibold text-lg ${data.col}
              `}
        >
          {formatPhoneNumber(user[data.value])}
        </div>
      );
    } else {
      return (
        <div
          className={`m-auto py-5 px-6 bg-white font-semibold text-lg ${data.col}
              `}
        >
          {user[data.value]}
        </div>
      );
    }
  };

  return (
    <>
      {dataList.map((v) => {
        return (
          <>
            {v instanceof Array ? (
              <div className="flex items-center m-auto gap-2 flex-grow">
                {v.map((v) => {
                  return (
                    <ListBtn
                      value={v.value}
                      color={v.color}
                      onClick={v.onClick}
                      user={user}
                    />
                  );
                })}
              </div>
            ) : (
              dataFilter(v)
            )}
          </>
        );
      })}
    </>
  );
}

//리스트 헤더
function ListHead(props: { headList: { value: string; col: string }[] }) {
  const { headList } = props;
  return (
    <>
      {headList.map((v) => {
        return (
          <div
            className={`bg-blue-300/70 px-5 py-3 text-xl font-bold ${v.col}`}
          >
            {v.value}
          </div>
        );
      })}
    </>
  );
}

//버튼
function ListBtn(props: DataListBtnType) {
  const { value, color, onClick, user, type } = props;
  return (
    <button
      className={`middle none center rounded-lg ${color} py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40  focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
      data-ripple-light="true"
      type={type ? type : "button"}
      onClick={() => {
        onClick(user);
      }}
    >
      {value}
    </button>
  );
}

export { UserList, ListHead, ListBtn };
