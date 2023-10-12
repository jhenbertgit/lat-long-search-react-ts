import { Card, CardBody, Form, FormGroup, Input, Label, Col } from "reactstrap";
import { CbState } from "../Events";

type FiltersProp = {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  checkboxState: CbState;
};

function Filters({ onChange, checkboxState }: FiltersProp) {
  return (
    <Col className="d-flex gap-3 mt-3">
      <Card className="mt-3" style={{ width: "20rem" }}>
        <CardBody>
          <Form>
            <FormGroup tag="fieldset">
              <legend>Filter by Threat Group</legend>
              <FormGroup check inline>
                <Input
                  id="nemrc"
                  type="checkbox"
                  checked={checkboxState.NEMRC}
                  name="NEMRC"
                  onChange={onChange}
                />
                <Label for="nemrc" check>
                  NEMRC
                </Label>
              </FormGroup>

              <FormGroup check inline>
                <Input
                  id="ncmrc"
                  type="checkbox"
                  checked={checkboxState.NCMRC}
                  name="NCMRC"
                  onChange={onChange}
                />
                <Label for="ncmrc" check>
                  NCMRC
                </Label>
              </FormGroup>

              <FormGroup check inline>
                <Input
                  id="smrc"
                  type="checkbox"
                  checked={checkboxState.SMRC}
                  name="SMRC"
                  onChange={onChange}
                />
                <Label for="smrc" check>
                  SMRC
                </Label>
              </FormGroup>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
      {/* <Card style={{ width: "20rem" }}>
        <CardBody>
          <FormGroup tag="fieldset">
            <legend>Filter by Type of Activity</legend>
            <Label for="select" />
            <Input id="select" type="select" name="select" onChange={onChange}>
              <option value="All">Select...</option>
              <option value="NON-VIOLENT">Non-Violent</option>
              <option value="VIOLENT">Violent</option>
              <option value="GTO">GTO</option>
            </Input>
          </FormGroup>
        </CardBody>
      </Card> */}
    </Col>
  );
}

export default Filters;
