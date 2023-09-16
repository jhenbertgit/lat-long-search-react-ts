import React, { useState } from "react";
import { Alert, Button, Col, Input, Label, Row, Spinner } from "reactstrap";
import ShowResults from "./ShowResults";

function LatLongSearch() {
  const [query, setQuery] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const url = "https://trueway-geocoding.p.rapidapi.com";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_REACT_APP_RAPIDAPI_HOST,
    },
  };

  const onDismissed = () => {
    setVisible(false);
  };

  const fetchResults = async (query: string) => {
    setIsLoading(true);
    try {
      if (query === null || query.match(/^ *$/) !== null) {
        setVisible(true);
        setIsLoading(false);
        return;
      }
      const response = await fetch(
        `${url}/Geocode?address=${query}&language=en`,
        options
      );
      const data = await response.json();
      const results = data.results[0] || {};

      setLatitude(results.location.lat || "");
      setLongitude(results.location.lng || "");
      setAddress(results.address || "");
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
        <Alert color="warning" isOpen={visible} toggle={onDismissed}>
          Address field must not be empty.
        </Alert>
        <Label>Enter Postal Address</Label>
        <Input
          type="search"
          placeholder="e.g Brgy., Pasian, Mabini, Davao de Oro"
          value={query}
          onChange={handleChange}
        />
        <Button className="mt-3" color="primary" onClick={handleSearch}>
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
            latitude={latitude}
            longitude={longitude}
            address={address}
          />
        )}
      </Col>
    </Row>
  );
}

export default LatLongSearch;
