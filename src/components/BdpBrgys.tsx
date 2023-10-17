import { useState, useEffect, useCallback } from "react";
import {
  ListGroup,
  ListGroupItem,
  Label,
  Input,
  Col,
  Spinner,
  UncontrolledAlert,
} from "reactstrap";

type Brgy = {
  id: number;
  barangay: string;
  city_municipality: string;
  province: string;
  region: string;
};

const url = import.meta.env.VITE_URL;

function BdpBrgys() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Brgy[]>([]);
  const [q, setQ] = useState("");
  const [filterParam, setFilterParam] = useState("All");

  const searchParam: (keyof Brgy)[] = ["barangay", "city_municipality"];

  const fetchBrgysData = useCallback(async () => {
    try {
      const resBdp = await fetch(`${url}:5000/api/v1/bdpbrgys`);
      const dataBdp: Brgy[] = await resBdp.json();
      setIsLoaded(true);
      setItems(dataBdp);
    } catch (error) {
      setIsLoaded(true);
      setError(error as Error);
    }
  }, []);

  useEffect(() => {
    fetchBrgysData();
  }, [fetchBrgysData]);

  function search(items: Brgy[]) {
    return items.filter((item: Brgy) => {
      if (filterParam === "All" || item.region === filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }
  if (error) {
    return (
      <Col className="mt-4 d-flex justify-content-center">
        <UncontrolledAlert
          color="warning"
          className="position-absolute top-0 start-50 translate-middle-x mt-2"
        >
          {error.name}: {error.message}
        </UncontrolledAlert>
      </Col>
    );
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
        <Col className="d-flex align-items-end gap-2">
          <Col md={6}>
            <Label for="search-form">Enter Barangay or City/Municipality</Label>
            <Input
              type="search"
              name="search-form"
              id="search-form"
              placeholder="Search BDP barangays"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
              }}
            />
          </Col>
          <Col md={6}>
            <Label for="select" />
            <Input
              type="select"
              name="select"
              id="select"
              onChange={(e) => setFilterParam(e.target.value)}
            >
              <option value="All">Filter by Region</option>
              <option value="X">Region 10</option>
              <option value="XI">Region 11</option>
              <option value="XIII">Region 13</option>
            </Input>
          </Col>
        </Col>

        <ListGroup className="mt-4">
          {search(items).map((item) => (
            <ListGroupItem key={item.id}>
              {[item.barangay, item.city_municipality, item.province].join(
                ", "
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
    );
  }
}

export default BdpBrgys;
