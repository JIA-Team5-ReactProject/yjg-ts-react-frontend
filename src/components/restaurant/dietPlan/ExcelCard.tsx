import excelLogo from "../../../assets/excel.png";

function ExcelCard() {
  return (
    <div className="flex w-72 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md overflow-auto">
      <div className="flex justify-center w-full bg-green-600/80">
        <img src={excelLogo} alt="excelLogo" />
      </div>
      <div className="flex flex-col font-bold p-4">
        <div>2023-11-첫째주</div>
      </div>
    </div>
  );
}

export default ExcelCard;
