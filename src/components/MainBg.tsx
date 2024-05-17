import dormitoryImg from "../assets/schoolImg/dormitoryImg.jpg";

function MainBg() {
  return (
    <div
      className="h-full bg-cover bg-center"
      style={{ backgroundImage: "url(" + dormitoryImg + ")" }}
    >
      <div className="h-full bg-white/80" />
    </div>
  );
}

export default MainBg;
