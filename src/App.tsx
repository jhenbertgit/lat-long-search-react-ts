import { useState } from "react";

import { Row, Container, Col, Label, Input } from "reactstrap";
import LatLongSearch from "./components/LatLongSearch";
import BdpBrgys from "./components/BdpBrgys";
import RpsbDeployment from "./components/RpsbDeployment";

type Action = {
  latLong: string;
  bdp: string;
  rpsb: string;
};

function App() {
  const [action, setAction] = useState<Action>("latLong");

  let content;

  if (action === "latLong") {
    content = <LatLongSearch />;
  }
  if (action === "bdp") {
    content = <BdpBrgys />;
  }

  if (action === "rpsb") {
    content = <RpsbDeployment />;
  }

  return (
    <Container>
      <Row className="justifiy-content-center">
        <Col className="mt-4">
          <Label for="select">Select Action</Label>
          <Input
            type="select"
            name="select"
            id="select"
            onChange={(e) => setAction(e.target.value)}
          >
            <option value="latLong">Search Lat Long</option>
            <option value="bdp">Search BDP Brgy</option>
            <option value="rpsb">Search barangay with R-PSB deployment</option>
          </Input>
        </Col>
        {content}
      </Row>
    </Container>
  );
}

export default App;
