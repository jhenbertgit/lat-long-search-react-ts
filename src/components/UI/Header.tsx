import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar, NavbarBrand, Collapse, NavbarToggler } from "reactstrap";
import Navigation from "./Navigation";

function Header() {
  const [isOPen, setIsOPen] = useState(false);
  const toggle = () => setIsOPen(!isOPen);
  return (
    <>
      <Navbar color="dark" expand="md" dark>
        <NavbarBrand href="/">
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
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
    </>
  );
}

export default Header;
