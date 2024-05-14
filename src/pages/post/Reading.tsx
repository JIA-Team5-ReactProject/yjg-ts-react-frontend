import { useLocation } from "react-router-dom";
import ReadPost from "../../components/admin/notice/ReadPost";
import ReadAS from "../../components/admin/as/ReadAS";
import ReadAbsence from "../../components/admin/overNight/ReadAbsence";

function Reading() {
  const location = useLocation();
  const type = location.state.type;

  // type별 리턴 값 반환
  const switchComponent = () => {
    switch (type) {
      case "Post":
        return <ReadPost />;
      case "AS":
        return <ReadAS />;
      case "Absence":
        return <ReadAbsence />;
    }
  };

  return <>{switchComponent()}</>;
}

export default Reading;
