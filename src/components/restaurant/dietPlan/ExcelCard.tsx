import { useMutation, useQueryClient } from "@tanstack/react-query";
import excelLogo from "../../../assets/excel.png";
import CloseIcon from "../../../icons/CloseIcon";
import { privateApi } from "../../../services/customAxios";
import { ExcelPlanType } from "../../../types/restaurant";

function ExcelCard(props: {
  data: ExcelPlanType[];
  index: number;
  year?: string;
  month: string;
  setSelctedData: (data: ExcelPlanType[]) => void;
}) {
  const { data, index, year, month, setSelctedData } = props;
  const queryClient = useQueryClient();

  // 식단표 delete Api
  const deletePlanApi = async (id: string) => {
    const response = await privateApi.delete(`/api/restaurant/menu/d/${id}`);

    return response.data;
  };

  // 식단 delete mutation
  const { mutate: deletePlanMutation } = useMutation({
    mutationFn: deletePlanApi,
    // Api 연결 성공
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["weekPlan"] });
    },
  });

  return (
    <div
      className="relative flex w-72 flex-col rounded-xl bg-clip-border text-gray-700 shadow-md overflow-auto cursor-pointer"
      onClick={() => {
        setSelctedData(data);
      }}
    >
      <div
        className="absolute right-1 top-1"
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("삭제하시겠습니까?")) {
            alert("삭제되었습니다");
            deletePlanMutation(data[0].date_id);
          } else {
            alert("취소되었습니다");
          }
        }}
      >
        <CloseIcon onClick={() => {}} />
      </div>
      <div className="flex justify-center w-full bg-green-600/80">
        <img src={excelLogo} alt="excelLogo" />
      </div>
      <div className="flex flex-col bg-white font-bold p-4">
        <div>{`${year}-${month}  ${index + 1}주차`}</div>
      </div>
    </div>
  );
}

export default ExcelCard;
