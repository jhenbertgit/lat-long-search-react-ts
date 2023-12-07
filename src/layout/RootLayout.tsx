import { Outlet } from "react-router-dom";
import Header from "../components/UI/Header";
import { Container } from "reactstrap";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
