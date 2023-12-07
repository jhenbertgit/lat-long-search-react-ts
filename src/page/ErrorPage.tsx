import { Container } from "reactstrap";
import Header from "../components/UI/Header";

function ErrorPage() {
  return (
    <>
      <Header />
      <Container>
        <h1 className="mt-4">Error 404 Page not found</h1>
      </Container>
    </>
  );
}

export default ErrorPage;
