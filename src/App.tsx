import Routing from "./routes/Routing";
import Echo from "laravel-echo";
import {WaveConnector} from "laravel-wave";

function App() {


  window.Echo = new Echo({
    broadcaster: WaveConnector,
    // 로컬에서 테스트하고자 할 때는 endpoint 백엔드 주소로 변경
    endpoint: '/api/wave',
  });

  /*
    e.data: 객체 형식으로 예약 정보가 담김
   */

  window.Echo.channel('salon')
    .listen("SalonEvent", (e: {data: object}) => {
    console.log(e.data);
  });

  window.Echo.channel('mtg-room')
    .listen("MtgRoomEvent", (e: {data: object}) => {
      console.log(e.data);
    });

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
