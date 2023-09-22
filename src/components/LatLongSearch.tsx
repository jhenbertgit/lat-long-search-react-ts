import React, { useState } from "react";
import { Col, Row, Spinner } from "reactstrap";
import ShowResults from "./ShowResults";
import Form from "./Form";

interface Dataset {
  lat: string;
  lng: string;
  address: string;
}

function LatLongSearch() {
  const [query, setQuery] = useState<string>("");
  const [status, setStatus] = useState<string>("typing");
  const [affirmative, setAffirmative] = useState<boolean>(false);
  const [dataset, setDataset] = useState<Dataset>({
    lat: "",
    lng: "",
    address: "",
  });

  const url = "https://trueway-geocoding.p.rapidapi.com";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_REACT_APP_RAPIDAPI_HOST,
    },
  };

  const onDismissed = () => {
    setAffirmative(false);
  };

  const fetchResults = async (query: string) => {
    setStatus("loading");
    try {
      //form validation
      if (query === null || query.match(/^ *$/) !== null) {
        setAffirmative(true);
        setStatus("typing");
        return;
      }
      const response = await fetch(
        `${url}/Geocode?address=${query}&language=en`,
        options
      );
      const data = await response.json();
      const results = data.results[0] || {};

      setDataset(
        {
          lat: results.location.lat,
          lng: results.location.lng,
          address: results.address,
        } || {
          lat: "",
          lng: "",
          address: "",
        }
      );
      setStatus("success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchResults(query);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setStatus("typing");
  };

  const isSuccess = status === "success";
  const isLoading = status === "loading";

  return (
    <Row className="justify-content-center">
      <Col md={8} className="mt-5">
        <Form
          alertIsOpen={affirmative}
          alertToggle={onDismissed}
          query={query}
          inputOnChange={handleChange}
          btnDisabled={affirmative}
          btnOnClick={handleSearch}
          isLoading={isLoading}
        />
      </Col>
      <Col md={8} className="mt-5 d-flex flex-column align-items-center">
        {isLoading && (
          <Spinner
            color="primary"
            style={{ height: "7rem", width: "7rem" }}
          ></Spinner>
        )}
        {isSuccess && (
          <ShowResults
            latitude={dataset.lat}
            longitude={dataset.lng}
            address={dataset.address}
          />
        )}
      </Col>
    </Row>
  );
}

export default LatLongSearch;
