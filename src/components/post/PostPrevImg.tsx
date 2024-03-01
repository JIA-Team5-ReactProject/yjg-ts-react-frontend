import { useEffect, useState } from "react";
import CloseIcon from "../../icons/CloseIcon";
import { PostPrevImgType } from "../../types/post";

function PostPrevImg(props: PostPrevImgType) {
  const { prevImgData, prevImg, setPrevImg } = props;
  // 보여주는 이미지 파일
  const [img, setImg] = useState<{ image: string; id: string }[]>([]);

  // 컴포넌트 렌더링 시
  useEffect(() => {
    const imgData = prevImgData.map((data) => ({
      image: data.image,
      id: data.id,
    }));
    setImg(imgData);
  }, []);

  // 선택된 이미지 삭제 시
  const handleImageDelete = (index: number) => {
    let deletedImage = img[index].id;
    setPrevImg([...prevImg, deletedImage]);

    const updatedImages = [...img];
    updatedImages.splice(index, 1);
    setImg(updatedImages);
  };

  // 이미지 미리보기 생성
  const renderImagePreviews = () => {
    return img.map((imageURL, index) => (
      <div key={index} className="w-40 relative">
        <img
          src={imageURL.image}
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
    <>
      {img.length > 0 && (
        <div className="border-4 border-sky-400 relative my-6 rounded-3xl p-6 ">
          <>
            <span className="absolute font-bold text-lg top-0 transform -translate-y-2/3 left-5 px-2 bg-white">
              현재 이미지
            </span>
            <div className="image-previews flex flex-wrap gap-4 p-3">
              {renderImagePreviews()}
            </div>
          </>
        </div>
      )}
    </>
  );
}

export default PostPrevImg;
