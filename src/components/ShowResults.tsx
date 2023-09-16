import React from "react";

type MyProps = {
  latitude: string;
  longitude: string;
  address: string;
};

function ShowResults(props: MyProps) {
  return (
    <>
      <p className="fw-bold">
        Latitude: <span>{props.latitude}</span>
      </p>
      <p className="fw-bold">
        Longitude: <span>{props.longitude}</span>
      </p>
      <p className="fw-bold">
        BDP Status: <span>Result here</span>
      </p>
      <p className="fw-bold">
        R-PSB Deployment Status: <span>Result here</span>
      </p>
      <p className="fw-bold">
        Address: <span>{props.address}</span>
      </p>
    </>
  );
}

export default ShowResults;
