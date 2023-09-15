import React, { useState } from "react";
import { Button, Col, Input, Label, Row, Spinner } from "reactstrap";

function LatLongSearch() {
  const [query, setQuery] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const API_URL = "https://geocode.maps.co";

  const fetchResults = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/search?q={${query}}`);
      const data = await response.json();
      const result = data[0] || {};
      setLatitude(result.lat || "");
      setLongitude(result.lon || "");
      setAddress(result.display_name || "");
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
          <div>
            <p className="fw-bold">
              Latitude: <span>{latitude}</span>
            </p>
            <p className="fw-bold">
              Longitude: <span>{longitude}</span>
            </p>
            <p className="fw-bold">
              BDP Status: <span>Result here</span>
            </p>
            <p className="fw-bold">
              R-PSB Deployment Status: <span>Result here</span>
            </p>
            <p className="fw-bold">
              Address: <span>{address}</span>
            </p>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default LatLongSearch;
