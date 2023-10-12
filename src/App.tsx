import { useState } from "react";

import { Row, Container, Col, Label, Input } from "reactstrap";
import LatLongSearch from "./components/LatLongSearch";
import BdpBrgys from "./components/BdpBrgys";
import RpsbDeployment from "./components/RpsbDeployment";
import Events from "./components/Events";

type Action = {
  status: "latLong" | "bdp" | "rpsb" | "events";
};

function App() {
  const [action, setAction] = useState<Action>({ status: "events" });

  let content;

  switch (action.status) {
    case "events":
      content = <Events />;
      break;

    case "latLong":
      content = <LatLongSearch />;
      break;

    case "bdp":
      content = <BdpBrgys />;
      break;

    case "rpsb":
      content = <RpsbDeployment />;
      break;

    default:
      content = <Events />;
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
      <Row>
        <Col md={12} className="mt-4">
          <Label for="select">Select Action</Label>

          {/**using type assertion to ensure that the e.target.value is the value
          for status property of type Action*/}
          <Input
            id="select"
            type="select"
            name="select"
            onChange={(e) =>
              setAction({ status: e.target.value as Action[keyof Action] })
            }
          >
            <option value="events">Show Events</option>
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
