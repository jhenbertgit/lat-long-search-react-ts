import { Row, Container } from "reactstrap";
import LatLongSearch from "./components/LatLongSearch";
import BdpBrgys from "./components/BdpBrgys";
import RpsbDeployment from "./components/RpsbDeployment";

function App() {
  return (
    <Container>
      <Row className="justifiy-content-center">
        <LatLongSearch />
        {/* <BdpBrgys /> */}
        <RpsbDeployment />
      </Row>
    </Container>
  );
}

export default App;
