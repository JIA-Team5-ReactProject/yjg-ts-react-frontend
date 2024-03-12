import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../../../services/customAxios";
import { ListBtn } from "../../master/UserList";
import { AbsenceType } from "../../../types/admin";

function ReadAbsence() {
  // 글 ID 값
  const { id } = useParams<string>();

  // 외박, 외출 데이터
  const [absence, setAbsence] = useState<AbsenceType>();
  const navigate = useNavigate();

  // 페이지 렌더링 시
  useEffect(() => {
    getAbsenceData();
  }, []);

  // 외박,외출 가져오기
  const getAbsenceData = async () => {
    try {
      const getNotice = await customAxios.get(`/api/absence/${id}`);
      setAbsence(getNotice.data.stay_out);
    } catch (error) {
      console.log(error);
    }
  };

  // 외출,외박 거절하기
  const patchAbsenceData = async (id: string) => {
    try {
      await customAxios.patch(`/api/absence/reject/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex border-b-2 border-black items-end">
        <div className="flex-1 text-4xl font-bold tracking-tighter text-left p-4">
          {absence?.type === "sleep" ? "외박" : "외출"}{" "}
          <span className="text-3xl">
            🗓 {absence?.start_date} ~ {absence?.end_date}
          </span>
        </div>

        <div className="flex flex-col p-2 font-bold text-right text-lg">
          <div>작성자 : {absence?.user.name}</div>
          <div>
            학번 :{" "}
            {absence?.user.student_id ? absence?.user.student_id : "미등록"}
          </div>
        </div>
      </div>

      <div className="relative border border-black px-4 py-6 min-h-96">
        <div dangerouslySetInnerHTML={{ __html: absence?.content || "" }} />
      </div>

      <div className="flex justify-end gap-4">
        <ListBtn
          value="외출 취소"
          color="bg-pink-500"
          onClick={() => {
            if (id) {
              patchAbsenceData(id).then(() => {
                navigate("/main/admin/stayOut");
              });
            }
          }}
        />
        <ListBtn
          value="닫기"
          color="bg-red-500"
          onClick={() => {
            navigate("/main/admin/stayOut");
          }}
        />
      </div>
    </div>
  );
}

export default ReadAbsence;
