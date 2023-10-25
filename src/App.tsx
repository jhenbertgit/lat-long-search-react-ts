import { Route, Routes } from "react-router-dom";
import LatLongSearch from "./components/LatLongSearch";
import BdpBrgys from "./components/BdpBrgys";
import RpsbDeployment from "./components/RpsbDeployment";
import Events from "./components/Events";
import ErrorPage from "./components/ErrorPage";
import Header from "./components/UI/Header";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    //will be called whenever the URL changes
    const updateTitle = () => {
      const path = window.location.pathname;
      const fullPathName = path.split("/");
      const pathName = fullPathName[fullPathName.length - 1];
      const pageTitle = `ID APC-EM MIS | ${pathName}`;
      document.title = pageTitle;
    };
    //update the HTML title when the component mounts and the URL changes
    updateTitle();
    window.addEventListener("popstate", updateTitle);

    //clean up the event listener when the component unmounts
    return () => window.removeEventListener("popstate", updateTitle);
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Header>
            <Events />
          </Header>
        }
      />
      <Route
        path="/bdp"
        element={
          <Header>
            <BdpBrgys />
          </Header>
        }
      />
      <Route
        path="rpsb"
        element={
          <Header>
            <RpsbDeployment />
          </Header>
        }
      />
      <Route
        path="latlong"
        element={
          <Header>
            <LatLongSearch />
          </Header>
        }
      />
      <Route
        path="/*"
        element={
          <Header>
            <ErrorPage />
          </Header>
        }
      />
    </Routes>
  );
}

export default App;
