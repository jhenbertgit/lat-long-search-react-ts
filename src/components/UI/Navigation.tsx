import { useLocation } from "react-router-dom";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

interface Props {
  children: React.ReactNode;
}

function Navigation({ children }: Props) {
  const location = useLocation();
  return (
    <Container>
      <Row>
        <Col md={12} className="mt-4">
          <Nav justified pills>
            <NavItem>
              <NavLink href="/" active={location.pathname === "/"}>
                Events
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/bdp" active={location.pathname === "/bdp"}>
                Search BDP Brgy
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/rpsb" active={location.pathname === "/rpsb"}>
                Search R-PSB Deployment
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/latlong"
                active={location.pathname === "/latlong"}
              >
                Search LatLong
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}

export default Navigation;
