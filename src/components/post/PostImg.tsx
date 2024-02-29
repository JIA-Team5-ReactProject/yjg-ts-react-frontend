import React, { ChangeEvent } from "react";
import CloseIcon from "../../icons/CloseIcon";
import { PostImgType } from "../../types/post";

function PostImg(props: PostImgType) {
  const { selectedImg, setSelectedImg } = props;

  // 이미지 파일 선택 시
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const updatedImages = [...selectedImg];
    if (files)
      for (let i = 0; i < files.length; i++) {
        updatedImages.push(files[i]);
      }

    setSelectedImg(updatedImages);
  };

  // 선택된 이미지 삭제 시
  const handleImageDelete = (index: number) => {
    const updatedImages = [...selectedImg];
    updatedImages.splice(index, 1);
    setSelectedImg(updatedImages);
  };

  // 이미지 미리보기 생성
  const renderImagePreviews = () => {
    return selectedImg.map((imageFile, index) => (
      <div key={index} className="flex w-40 relative">
        <img
          src={URL.createObjectURL(imageFile)}
          alt={`Image ${index}`}
          className="object-contain h-60"
        />
        <div className="absolute text-black -right-4 top-[-20px] bg-sky-100 rounded-full">
          <CloseIcon
            onClick={() => {
              handleImageDelete(index);
            }}
          />
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="rounded-md h-fit mr-2 border border-blue-200 bg-white p-4 w-fit mb-2 shadow-md">
        <label
          htmlFor="upload"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 fill-white stroke-indigo-500"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </label>
        <input
          id="upload"
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {selectedImg.length > 0 && (
        <div className="border-4 border-sky-400 relative my-6 rounded-3xl p-6">
          {selectedImg.length > 0 && (
            <>
              <span className="absolute font-bold text-lg top-0 transform -translate-y-2/3 left-5 px-2 bg-white">
                추가 이미지
              </span>
              <div className="image-previews flex flex-wrap gap-4 p-3">
                {renderImagePreviews()}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PostImg;
