import { useReducer } from "react";
import { Col, Spinner } from "reactstrap";
import ShowResults from "./ShowResults";
import Form from "./Form";
import {
  LatLongDispatchCtx,
  LatLongStateCtx,
  reducer,
} from "../context/LatLongCtx";

const initialState = {
  query: "",
  isOpen: false,
  isEmpty: false,
  status: "init",
  dataset: {
    lat: "",
    lng: "",
    address: "",
  },
};

function LatLongSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isSuccess = state.status === "success";
  const isLoading = state.status === "loading";

  return (
    <>
      <Col md={12} className="mt-5">
        <LatLongStateCtx.Provider value={state}>
          <LatLongDispatchCtx.Provider value={dispatch}>
            <Form />
          </LatLongDispatchCtx.Provider>
        </LatLongStateCtx.Provider>
      </Col>
      <Col md={12} className="mt-5 d-flex flex-column align-items-center">
        {isLoading && (
          <Spinner
            color="primary"
            style={{ height: "7rem", width: "7rem" }}
          ></Spinner>
        )}
        {isSuccess && (
          <LatLongStateCtx.Provider value={state}>
            <ShowResults />
          </LatLongStateCtx.Provider>
        )}
      </Col>
    </>
  );
}
export default LatLongSearch;
