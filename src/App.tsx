import { Route, Routes } from "react-router-dom";

import LatLongSearch from "./components/LatLongSearch";
import BdpBrgys from "./components/BdpBrgys";
import RpsbDeployment from "./components/RpsbDeployment";
import Events from "./components/Events";
import Navigation from "./components/UI/Navigation";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigation>
            <Events />
          </Navigation>
        }
      />
      <Route
        path="/bdp"
        element={
          <Navigation>
            <BdpBrgys />
          </Navigation>
        }
      />
      <Route
        path="rpsb"
        element={
          <Navigation>
            <RpsbDeployment />
          </Navigation>
        }
      />
      <Route
        path="latlong"
        element={
          <Navigation>
            <LatLongSearch />
          </Navigation>
        }
      />
      <Route
        path="*"
        element={
          <Navigation>
            <ErrorPage />
          </Navigation>
        }
      />
    </Routes>
  );
}

export default App;
