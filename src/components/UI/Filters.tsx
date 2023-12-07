import { Card, CardBody, Form, FormGroup, Input, Label, Col } from "reactstrap";
import { CbState } from "../../page/Events";

interface Props {
  checkboxState: CbState;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

function Filters({ onChange, checkboxState }: Props) {
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
    </Col>
  );
}

export default Filters;
