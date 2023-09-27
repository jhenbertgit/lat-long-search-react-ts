import { useState, useEffect, useCallback } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

interface RpsbData {
  id: number;
  brgy: string;
  municipality: string;
  province: string;
  region: string;
}

function RpsbDeployment() {
  const [rpsbDeployment, setRpsbDeployment] = useState<RpsbData[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetch("http://localhost:5000/api/v1/rpsbdeployment");
      const response: RpsbDeploymen[] = await data.json();
      setRpsbDeployment(response);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <ListGroup>
        {rpsbDeployment.map((item) => (
          <ListGroupItem key={item.id}>
            {[
              // check if data is string
              item.brgy && typeof item.brgy === "string"
                ? item.brgy
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")
                : "",
              item.municipality && typeof item.municipality === "string"
                ? item.municipality
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")
                : "",
              item.province && typeof item.province === "string"
                ? item.province
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")
                : "",
            ].join(", ")}
          </ListGroupItem>
        ))}
      </ListGroup>
    </>
  );
}

export default RpsbDeployment;
