import { useState } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function Filters() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <UncontrolledDropdown className="mt-3">
        <DropdownToggle caret color="primary">
          Filter by
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={toggle}>Threat Group</DropdownItem>
          <DropdownItem>Region</DropdownItem>
          <DropdownItem>Type of Activity</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <Collapse isOpen={isOpen}>
        <Card className="mt-3" style={{ width: "20rem" }}>
          <CardBody>
            <Form>
              <FormGroup check inline>
                <Input type="checkbox" />
                <Label>NEMRC</Label>
              </FormGroup>

              <FormGroup check inline>
                <Input type="checkbox" />
                <Label>NCMRC</Label>
              </FormGroup>

              <FormGroup check inline>
                <Input type="checkbox" />
                <Label>SMRC</Label>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Collapse>
    </>
  );
}

export default Filters;
