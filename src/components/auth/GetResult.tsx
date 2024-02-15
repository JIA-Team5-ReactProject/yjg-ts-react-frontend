import { useLocation, useNavigate } from "react-router-dom";
import { ListBtn } from "../master/UserList";

function GetResult() {
  const location = useLocation();
  const userData = location.state.user;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-14 bg-sky-200/90 rounded-3xl aspect-video p-10 min-w-96 max-w-fit m-auto">
      <div className="text-xl font-bold">
        <span className="text-3xl text-blue-800">{userData.name}</span>님의
        이메일은{" "}
      </div>
      <div className="font-bold text-5xl border-b-4 border-b-black pb-4">
        {userData.email}
      </div>
      <div className="text-center">
        <ListBtn
          value="확인"
          color="bg-red-500"
          onClick={() => {
            navigate("/login");
          }}
        />
      </div>
    </div>
  );
}

export default GetResult;
