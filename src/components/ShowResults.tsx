import React from "react";

type MyProps = {
  latitude: string;
  longitude: string;
  address: string;
};

function ShowResults(props: MyProps) {
  const { latitude, longitude, address } = props;
  return (
    <>
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
    </>
  );
}

export default ShowResults;
