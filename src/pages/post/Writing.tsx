import { useLocation } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import WritePost from "../../components/admin/main/WritePost";

function Writing() {
  const location = useLocation();
  const type = location.state.type;

  // type별 리턴 값 반환
  const switchComponent = () => {
    switch (type) {
      case "Post":
        return <WritePost />;
    }
  };

  return <MainContainer>{switchComponent()}</MainContainer>;
}

export default Writing;
