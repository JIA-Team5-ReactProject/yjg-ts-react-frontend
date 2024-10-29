import Routing from "./routes/Routing";
import Echo from "laravel-echo";
import {WaveConnector} from "laravel-wave";

function App() {

  window.Echo = new Echo({
    namespace: 'test.sse',
    broadcaster: WaveConnector,
    debug: true,
    endpoint: process.env.REACT_APP_SERVER_URI + '/wave',
    authEndpoint: process.env.REACT_APP_SERVER_URI + '/broadcasting/auth',
  })

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
