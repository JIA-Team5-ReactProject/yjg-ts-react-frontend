import { useState } from "react";
import { CommentsType } from "../../../../types/admin";
import { useRecoilValue } from "recoil";
import { UserDataAtom } from "../../../../recoil/UserDataAtiom";
import { customAxios } from "../../../../services/customAxios";

function Comments(props: CommentsType) {
  const { comment, getComment, deleteComment } = props;
  // 수정 상태
  const [onModify, setOnModify] = useState(false);
  // 수정된 내용
  const [newComment, setNewComment] = useState("");
  // 접속 중인 유저 데이터
  const userData = useRecoilValue(UserDataAtom);

  // 댓글 수정하기
  const patchComment = async (id: string) => {
    try {
      await customAxios.patch(`/api/after-service/comment/${id}`, {
        comment: newComment,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {onModify ? (
        <div className="flex gap-3 border-b border-black/30 pt-2 pl-3 pb-1 font-bold">
          <div>▪</div>
          <input
            type="text"
            className="flex-1 border-b border-black pl-1 outline-none"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <div className="flex gap-2 text-sm items-end text-black/40">
            <div
              className="cursor-pointer text-blue-500/90 hover:text-blue-800"
              onClick={() => {
                patchComment(comment.id).then(() => {
                  setOnModify(false);
                  getComment();
                });
              }}
            >
              완료
            </div>
            <div
              className="cursor-pointer hover:text-black"
              onClick={() => {
                setOnModify(false);
              }}
            >
              취소
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 border-b border-black/30 pt-2 pl-3 pb-1 font-bold">
          <div>▪</div>
          <div className="flex-1">{comment.comment}</div>
          {String(userData.id) === String(comment.admin_id) ? (
            <div className="flex gap-2 text-sm items-end text-black/40">
              <div
                className="cursor-pointer hover:text-black"
                onClick={() => {
                  setNewComment(comment.comment);
                  setOnModify(true);
                }}
              >
                수정
              </div>
              <div
                className="cursor-pointer hover:text-black"
                onClick={() => {
                  deleteComment(comment.id).then(() => {
                    getComment();
                  });
                }}
              >
                삭제
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Comments;
