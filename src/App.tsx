import { Row } from "reactstrap";
import LatLongSearch from "./components/LatLongSearch";
import BdpBrgys from "./components/BdpBrgys";

function App() {
  return (
    <Row className="justifiy-content-center">
      <LatLongSearch />
      <BdpBrgys />
    </Row>
  );
}

export default App;
