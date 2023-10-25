import { useState } from "react";
import {
  Container,
  Row,
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
} from "reactstrap";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactNode;
}

function Header({ children }: Props) {
  const [isOPen, setIsOPen] = useState(false);
  const toggle = () => setIsOPen(!isOPen);
  return (
    <>
      <Navbar color="dark" expand="md" dark>
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="/apcem.png"
            style={{
              height: 70,
              width: 70,
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOPen} navbar>
          <Navigation />
        </Collapse>
      </Navbar>
      <Container>
        <Row> {children}</Row>
      </Container>
    </>
  );
}

export default Header;
