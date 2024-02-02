import adminEmo from "../../assets/sidebarImg/admin.png";

function SidePowerModal() {
  return (
    <div className=" bg-cyan-900/75 mx-4 flex-col rounded-xl cursor-pointer">
      <div className="bg-cyan-600/70 h-16 flex items-center justify-center text-white text-2xl rounded-t-xl shadow-md shadow-inherit">
        <img src={adminEmo} alt="emo" className="h-full" />
        <div>관리자</div>
        <DropDown />
      </div>
      <div className="h-16 flex items-center justify-center text-white/60 text-lg font-light border-b-2 border-dotted border-white/60">
        예약완료
      </div>
      <div className="h-16 flex items-center justify-center text-white/60 text-lg font-light border-b-2 border-dotted border-white/60">
        미승인 예약 목록
      </div>
      <div className="h-16 flex items-center  justify-center text-white/60 text-lg font-light">
        가격표 관리
      </div>
    </div>
  );
}

export default SidePowerModal;

const DropDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  );
};
