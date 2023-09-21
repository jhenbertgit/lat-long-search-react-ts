import React, { useState } from "react";
import { Alert, Button, Col, Input, Label, Row, Spinner } from "reactstrap";
import ShowResults from "./ShowResults";

interface Dataset {
  lat: string;
  lng: string;
  address: string;
}

function LatLongSearch() {
  const [query, setQuery] = useState<string>("");
  const [dataset, setDataset] = useState<Dataset>({
    lat: "",
    lng: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [affirmative, setAffirmative] = useState<boolean>(false);

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
    setIsLoading(true);
    try {
      //form validation
      if (query === null || query.match(/^ *$/) !== null) {
        setAffirmative(true);
        setIsLoading(false);
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

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchResults(query);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Row>
      <Col className="mt-4">
        <Alert
          className="position-absolute top-0 start-50 translate-middle-x mt-2"
          color="warning"
          isOpen={affirmative}
          toggle={onDismissed}
        >
          <strong>Warning!</strong> Address field must not be empty
        </Alert>
        <Label for="searchBar">Enter Postal Address</Label>
        <Input
          id="searchBar"
          name="searchBar"
          type="search"
          placeholder="e.g Brgy., Pasian, Mabini, Davao de Oro"
          value={query}
          onChange={handleChange}
        />
        <Button
          disabled={affirmative}
          className="mt-3"
          color="primary"
          onClick={handleSearch}
        >
          {isLoading ? (
            <div>
              <Spinner size="sm">Loading...</Spinner>
              <span> Loading</span>
            </div>
          ) : (
            "Search"
          )}
        </Button>
      </Col>
      <Col className="mt-4">
        {isLoading ? (
          <Spinner
            color="primary"
            style={{ height: "7rem", width: "7rem" }}
          ></Spinner>
        ) : (
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
