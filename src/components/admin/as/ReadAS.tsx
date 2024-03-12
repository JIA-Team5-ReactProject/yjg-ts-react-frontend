import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../../../services/customAxios";
import { useEffect, useState } from "react";
import { AfterServiceType } from "../../../types/post";
import PostCardSlider from "../../post/PostCardSlider";
import CloseIcon from "../../../icons/CloseIcon";
import { ListBtn } from "../../master/UserList";
import ImageIcon from "../../../icons/ImageIcon";

function ReadAS() {
  // 글 ID 값
  const { id } = useParams<string>();
  // 사진 보여주기 상태
  const [onPicture, setOnPicture] = useState(false);
  // AS 데이터
  const [afterService, setAfterService] = useState<AfterServiceType>();
  const navigate = useNavigate();

  // 페이지 렌더링 시
  useEffect(() => {
    getASData();
  }, []);

  // AS글 가져오기
  const getASData = async () => {
    try {
      const getAS = await customAxios.get(`/api/after-service/${id}`);
      setAfterService(getAS.data.afterService);
    } catch (error) {
      console.log(error);
    }
  };

  // AS 상태 변경하기
  const patchASData = async () => {
    try {
      await customAxios.patch(`/api/after-service/status/${id}`);
      navigate("/main/admin/repair");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex border-b-2 border-black items-end">
        <div className="flex-1 text-4xl font-bold tracking-tighter text-left p-4">
          제목 : {afterService?.title}
        </div>

        <div className="flex flex-col p-2 font-bold text-right text-lg">
          <div>작성자 : {afterService?.user.name}</div>
        </div>
      </div>
      <div className="flex gap-10 text-xl font-bold">
        <div>
          장소: <span>{afterService?.visit_place}</span>
        </div>
        <div>
          희망처리일자: <span>{afterService?.visit_date}</span>
        </div>
      </div>
      <div className="relative border border-black px-4 py-6 min-h-96">
        <div className="absolute right-1 top-1">
          {afterService?.after_service_images?.length ? (
            <ImageIcon
              onClick={() => {
                setOnPicture(!onPicture);
              }}
            />
          ) : null}
          {onPicture ? (
            <>
              <div className="absolute right-0 top-0 flex flex-col bg-white border border-black/20 rounded-lg overflow-hidden">
                <div className="w-full h-10 bg-cyan-500"></div>
                <div className="p-10 pb-14">
                  <div className="flex justify-center bg-black">
                    <PostCardSlider img={afterService?.after_service_images} />
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-0">
                <CloseIcon
                  onClick={() => {
                    setOnPicture(!onPicture);
                  }}
                />
              </div>
            </>
          ) : null}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: afterService?.content || "" }}
        />
      </div>
      {afterService?.status ? null : (
        <div className="flex justify-end gap-4">
          <ListBtn value="A/S 완료" color="bg-sky-500" onClick={patchASData} />
          <ListBtn
            value="닫기"
            color="bg-red-500"
            onClick={() => {
              navigate("/main/admin/repair");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ReadAS;
