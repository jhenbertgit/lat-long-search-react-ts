import React, { useReducer } from "react";
import { Col, Spinner } from "reactstrap";
import ShowResults from "./ShowResults";
import Form from "./Form";

type Dataset = {
  lat: string;
  lng: string;
  address: string;
};

type State = {
  query: string;
  affirmative: boolean;
  status: string;
  dataset: Dataset;
};

type Action =
  | { type: "query"; payload: string }
  | { type: "affirmative"; affirmative: boolean }
  | { type: "status"; status: string }
  | { type: "dataset"; dataset: Dataset };

const initialState = {
  query: "",
  affirmative: false,
  status: "typing",
  dataset: {
    lat: "",
    lng: "",
    address: "",
  },
};

function LatLongSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const url = "https://trueway-geocoding.p.rapidapi.com";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_REACT_APP_RAPIDAPI_HOST,
    },
  };

  const onDismissed = () => {
    dispatch({ type: "affirmative", affirmative: false });
  };

  const fetchResults = async (query: string) => {
    dispatch({ type: "status", status: "loading" });

    if (query.trim() === "") {
      dispatch({ type: "affirmative", affirmative: true });
      dispatch({ type: "status", status: "typing" });
      return;
    }

    try {
      const response = await fetch(
        `${url}/Geocode?address=${query}&language=en`,
        options
      );
      const data = await response.json();
      const results = data.results[0] || {};

      const resRpsb = await fetch(
        "http://localhost:5000/api/v1/rpsbdeployment"
      );
      const dataRpsb = await resRpsb.json();
      const mappedItems = dataRpsb.map((item) =>
        [item.brgy, item.municipality, item.province].join(", ")
      );
      console.log(mappedItems);

      dispatch({
        type: "dataset",
        dataset: {
          lat: results.location.lat,
          lng: results.location.lng,
          address: results.address,
        } || {
          lat: "",
          lng: "",
          address: "",
        },
      });

      dispatch({ type: "status", status: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchResults(state.query);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "query",
      payload: event.target.value,
    });
    dispatch({ type: "status", status: "typing" });
  };

  const isSuccess = state.status === "success";
  const isLoading = state.status === "loading";

  return (
    <>
      <Col md={12} className="mt-5">
        <Form
          alertIsOpen={state.affirmative}
          alertToggle={onDismissed}
          query={state.query}
          inputOnChange={handleChange}
          btnDisabled={state.affirmative}
          btnOnClick={handleSearch}
          isLoading={isLoading}
        />
      </Col>
      <Col md={12} className="mt-5 d-flex flex-column align-items-center">
        {isLoading && (
          <Spinner
            color="primary"
            style={{ height: "7rem", width: "7rem" }}
          ></Spinner>
        )}
        {isSuccess && (
          <ShowResults
            latitude={state.dataset.lat}
            longitude={state.dataset.lng}
            address={state.dataset.address}
          />
        )}
      </Col>
    </>
  );
}
export default LatLongSearch;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "query": {
      return { ...state, query: action.payload };
    }

    case "affirmative": {
      return { ...state, affirmative: action.affirmative };
    }

    case "status": {
      return { ...state, status: action.status };
    }

    case "dataset": {
      return { ...state, dataset: action.dataset };
    }

    default: {
      throw new Error();
    }
  }
};
