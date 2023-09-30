import { useState, useEffect, useCallback } from "react";
import { ListGroup, ListGroupItem, Label, Input, Col } from "reactstrap";

interface Brgy {
  id: number;
  barangay: string;
  city_municipality: string;
  province: string;
  region: string;
}

function BdpBrgys() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Brgy[]>([]);
  const [q, setQ] = useState("");
  const [filterParam, setFilterParam] = useState("All");

  const searchParam = ["barangay", "city_municipality"];

  const fetchBrgysData = useCallback(async () => {
    try {
      const resBdp = await fetch("http://localhost:5000/api/v1/bdpbrgys");
      if (!resBdp.ok) {
        throw new Error("Fetching data failed");
      }
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
            item[newItem as keyof Brgy] //using type assertion
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
        // } else if (filterParam === "All") {
        //   return searchParam.some((newItem) => {
        //     return (
        //       item[newItem as keyof Brgy]
        //         .toString()
        //         .toLowerCase()
        //         .indexOf(q.toLowerCase()) > -1
        //     );
        //   });
      }
    });
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
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
