import { PostContainer } from "../../styles/post";
import Slider, { Settings } from "react-slick";
import testImg from "../../assets/schoolImg/test.jpg";

function PostCardSlider() {
  const settings: Settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <PostContainer>
      <Slider {...settings}>
        <WaitingCard />
      </Slider>
    </PostContainer>
  );
}

export default PostCardSlider;

function WaitingCard() {
  return (
    <div className="w-full h-full flex justify-center">
      <img src={testImg} alt="logo" className="max-h-full object-contain" />
    </div>
  );
}
