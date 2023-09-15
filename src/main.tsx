import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>
);
