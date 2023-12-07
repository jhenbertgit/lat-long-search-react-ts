import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LatLongSearch from "./page/LatLongSearch";
import BdpBrgys from "./page/BdpBrgys";
import RpsbDeployment from "./components/RpsbDeployment";
import Events from "./page/Events";
import ErrorPage from "./page/ErrorPage";
import RootLayout from "./layout/RootLayout";
import PartingWords from "./page/PartingWords";

function App() {
  useEffect(() => {
    //will be called whenever the URL changes
    const updateTitle = () => {
      const path = window.location.pathname;
      const fullPathName = path.split("/");
      const pathName = fullPathName[fullPathName.length - 1];
      const pageTitle = `ID APC-EM MIS | ${pathName}`;
      document.title = pageTitle.toUpperCase();
    };
    //update the HTML title when the component mounts and the URL changes
    updateTitle();
    window.addEventListener("popstate", updateTitle);

    //clean up the event listener when the component unmounts
    return () => window.removeEventListener("popstate", updateTitle);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Events /> },
        { path: "bdp", element: <BdpBrgys /> },
        { path: "rpsb", element: <RpsbDeployment /> },
        { path: "latlong", element: <LatLongSearch /> },
        { path: "quote", element: <PartingWords /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
