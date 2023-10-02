import { useState, useEffect, useCallback } from "react";
import { ListGroup, ListGroupItem, Input, Col, Spinner } from "reactstrap";

interface RpsbData {
  id: number;
  brgy: string;
  municipality: string;
  province: string;
  region: string;
}

function RpsbDeployment() {
  const [rpsbDeployment, setRpsbDeployment] = useState<RpsbData[]>([]);
  const [q, setQ] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchParam: (string | null)[] = ["brgy"];

  const fetchData = useCallback(async () => {
    try {
      const data = await fetch("http://localhost:5000/api/v1/rpsbdeployment");
      const response: RpsbData[] = await data.json();
      setIsLoaded(true);
      setRpsbDeployment(response);
    } catch (error) {
      setIsLoaded(true);
      setError(error as Error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function search(items: RpsbData[]) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem as keyof RpsbData]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Col className="mt-4 d-flex justify-content-center">
        <Spinner
          color="primary"
          style={{ height: "7rem", width: "7rem" }}
        ></Spinner>
      </Col>
    );
  } else {
    return (
      <Col md={12} className="mt-4">
        <Input
          type="search"
          name="search"
          id="search"
          placeholder="Search the brgy"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <ListGroup className="mt-3">
          {search(rpsbDeployment).map((item) => (
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
              ].join(", ")}{" "}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
    );
  }
}

export default RpsbDeployment;
