import { useEffect, useState } from "react";
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

type FiltersProp = {
  filterOnChange(args: string): void;
};

function Filters({ filterOnChange }: FiltersProp) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {}, []);
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
                <Input
                  id="nemrc"
                  type="checkbox"
                  value="NEMRC"
                  onChange={(e) => filterOnChange(e.target.value)}
                />
                <Label for="nemrc">NEMRC</Label>
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
