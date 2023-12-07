import { useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

function Navigation() {
  const location = useLocation();
  return (
    <Nav className="me-auto" navbar pills>
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
        <NavLink href="/latlong" active={location.pathname === "/latlong"}>
          Search LatLong
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/quote" active={location.pathname === "/quote"}>
          Parting Words
        </NavLink>
      </NavItem>
    </Nav>
  );
}

export default Navigation;
