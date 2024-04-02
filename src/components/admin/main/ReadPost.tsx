import { useEffect, useState } from "react";
import ImageIcon from "../../../icons/ImageIcon";
import PostCardSlider from "../../post/PostCardSlider";
import CloseIcon from "../../../icons/CloseIcon";
import { ListBtn } from "../../master/UserList";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../../../services/customAxios";
import { NoticeType } from "../../../types/post";

function ReadPost() {
  // 글 ID 값
  const { id } = useParams<string>();
  // 사진 보여주기 상태
  const [onPicture, setOnPicture] = useState(false);
  // 게시글 데이터
  const [notice, setNotice] = useState<NoticeType>();
  const navigate = useNavigate();

  // 페이지 렌더링 시
  useEffect(() => {
    getNoticeData();
  }, []);

  // 게시글 가져오기
  const getNoticeData = async () => {
    try {
      const getNotice = await customAxios.get(`/api/notice/${id}`);
      setNotice(getNotice.data.notice);
    } catch (error) {
      console.log(error);
    }
  };

  // 게시글 삭제하기
  const deleteNotice = async () => {
    try {
      await customAxios.delete(`/api/notice/${id}`).then(() => {
        navigate("/main/admin");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex border-b-2 border-black items-end">
        <div className="flex-1 text-4xl font-bold tracking-tighter text-left p-4">
          제목 : {notice?.title}
        </div>

        <div className="flex flex-col p-2 font-bold text-right text-lg">
          <div>작성자 : {notice?.tag}</div>
          {notice?.urgent ? <div>태그 : 🚨 {notice.tag}</div> : null}
        </div>
      </div>

      <div className="bg-white rounded-xl relative border border-black/20 px-4 py-6 min-h-96 shadow-md">
        <div className="absolute right-1 top-1">
          {notice?.notice_images.length ? (
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
                    <PostCardSlider img={notice?.notice_images} />
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
        <div dangerouslySetInnerHTML={{ __html: notice?.content || "" }} />
      </div>
      <div className="flex gap-4">
        <ListBtn
          value="수정"
          color="bg-sky-500/90"
          onClick={() => {
            navigate(`/main/admin/modifying/${id}`, {
              state: { type: "Post" },
            });
          }}
        />
        <ListBtn value="삭제" color="bg-red-500/80" onClick={deleteNotice} />
        <div className="flex flex-1 justify-end">
          <ListBtn
            value="나가기"
            color="bg-pink-700/70"
            onClick={() => {
              navigate("/main/admin");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ReadPost;
