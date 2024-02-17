import { DataListBtnType, UserListType } from "../../types/master";

//리스트 유저데이터
function UserList(props: UserListType) {
  const { user, dataList } = props;
  return (
    <>
      {dataList.map((v) => {
        return (
          <>
            {typeof v === "string" ? (
              <div
                className="border-b py-5 bg-white
              "
              >
                {user[v]}
              </div>
            ) : (
              <div className=" m-auto border-b py-4 w-full space-x-5 bg-white pr-3">
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
            )}
          </>
        );
      })}
    </>
  );
}

//리스트 헤더
function ListHead(props: { headList: string[] }) {
  const { headList } = props;
  return (
    <>
      {headList.map((v) => {
        return <div className="bg-blue-300/70 py-3">{v}</div>;
      })}
    </>
  );
}

//버튼
function ListBtn(props: DataListBtnType) {
  const { value, color, onClick, user } = props;
  return (
    <button
      className={`middle none center rounded-lg ${color} py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40  focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
      data-ripple-light="true"
      onClick={() => {
        onClick(user);
      }}
    >
      {value}
    </button>
  );
}

export { UserList, ListHead, ListBtn };
