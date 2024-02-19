import { useState } from "react";
import ImageIcon from "../../icons/ImageIcon";
import PostCardSlider from "./PostCardSlider";
import CloseIcon from "../../icons/CloseIcon";

function ReadPost() {
  // 사진 보여주기 상태
  const [onPicture, setOnPicture] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex border-b-2 border-black items-end">
        <div className="flex-1 text-4xl font-bold tracking-tighter text-left p-4">
          게시글 제목
        </div>
        <div className="p-2 font-bold">작성자 : 김 현</div>
      </div>

      <div className="relative border border-black p-12">
        <div className="absolute right-1 top-1">
          <ImageIcon
            onClick={() => {
              setOnPicture(!onPicture);
            }}
          />
          {onPicture ? (
            <>
              <div className="absolute right-0 top-0 flex flex-col bg-white border border-black/20 rounded-lg overflow-hidden">
                <div className="w-full h-10 bg-cyan-500"></div>
                <div className="p-10 pb-14">
                  <div className="flex justify-center bg-black">
                    <PostCardSlider />
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
        호실 희망방문날짜 내용 등등
      </div>
    </div>
  );
}

export default ReadPost;
