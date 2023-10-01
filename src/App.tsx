import { useState } from "react";

import { Row, Container, Col, Label, Input } from "reactstrap";
import LatLongSearch from "./components/LatLongSearch";
import BdpBrgys from "./components/BdpBrgys";
import RpsbDeployment from "./components/RpsbDeployment";

type Action = {
  status: "latLong" | "bdp" | "rpsb";
};

function App() {
  const [action, setAction] = useState<Action>({ status: "latLong" });

  let content;

  switch (action.status) {
    case "bdp":
      content = <BdpBrgys />;
      break;

    case "rpsb":
      content = <RpsbDeployment />;
      break;

    default:
      content = <LatLongSearch />;
      break;
  }

  // if (action.status === "latLong") {
  //   content = <LatLongSearch />;
  // }
  // if (action.status === "bdp") {
  //   content = <BdpBrgys />;
  // }

  // if (action.status === "rpsb") {
  //   content = <RpsbDeployment />;
  // }

  return (
    <Container>
      <Row className="justifiy-content-center">
        <Col className="mt-4">
          <Label for="select">Select Action</Label>

          {/**using type assertion to ensure that the e.target.value is the value
          for status property of type Action*/}
          <Input
            type="select"
            name="select"
            id="select"
            onChange={(e) =>
              setAction({ status: e.target.value as Action[keyof Action] })
            }
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
