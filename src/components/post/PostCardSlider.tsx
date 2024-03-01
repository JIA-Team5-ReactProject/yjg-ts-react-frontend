import { PostContainer } from "../../styles/post";
import Slider, { Settings } from "react-slick";
import testImg from "../../assets/schoolImg/test.jpg";

function PostCardSlider(props: { img?: { image: string }[] }) {
  const { img } = props;
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
        {img?.map((img, index) => (
          <WaitingCard key={index} image={img} />
        ))}
      </Slider>
    </PostContainer>
  );
}

export default PostCardSlider;

function WaitingCard(props: { image: { image: string } }) {
  const { image } = props;

  return (
    <div className="w-full h-full flex justify-center">
      <img src={image.image} alt="logo" className="max-h-full object-contain" />
    </div>
  );
}
