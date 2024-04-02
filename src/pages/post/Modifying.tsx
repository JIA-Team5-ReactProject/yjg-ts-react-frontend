import { useLocation } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import ModifyPost from "../../components/admin/main/ModifyPost";

function Modifying() {
  const location = useLocation();
  const type = location.state.type;

  // type별 리턴 값 반환
  const switchComponent = () => {
    switch (type) {
      case "Post":
        return <ModifyPost />;
    }
  };

  return <MainContainer>{switchComponent()}</MainContainer>;
}

export default Modifying;
