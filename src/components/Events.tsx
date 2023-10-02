import { useState, useEffect } from "react";
import { Button, Table, Spinner, Col } from "reactstrap";

const initialData = {
  id: 0,
  unit_reported: " ",
  source_of_report: " ",
  date_of_report: " ",
  date_of_activity: " ",
  evaluation: " ",
  type_of_activity: " ",
  activity: " ",
  enemy_unit: " ",
  strength: " ",
  leader: " ",
  position: " ",
  sitio: " ",
  brgy: " ",
  municipality: " ",
  province: " ",
  details_of_activity: " ",
  mgrs: " ",
  latitude: 0,
  longitude: 0,
  bdp_status: " ",
  gf_vertical_units: " ",
  type: " ",
  rpsb_deployment_status: " ",
};

function Events() {
  const [data, setData] = useState([initialData]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const onEdit = (id: number) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
          };
        } else {
          return item;
        }
      })
    );
  };

  let content;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const eventsData = await fetch("http://localhost:5000/api/v1/events");
        const response = await eventsData.json();
        setData(response);
        setIsLoading(false);
        setIsSuccess(true);
      } catch (error) {
        setError(error as Error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    content = <>Error: {error.message}</>;
  }

  if (isLoading) {
    content = (
      <Spinner
        color="primary"
        style={{ height: "7rem", width: "7rem" }}
      ></Spinner>
    );
  }

  if (isSuccess) {
    content = (
      <Col className="w-100">
        <Table hover>
          <thead>
            <tr>
              <th>Source of Information</th>
              <th>Threat Group</th>
              <th>Date of Activity</th>
              <th>Type of Activity</th>
              <th>Activity</th>
              <th>Location</th>
              <th>Details of Activity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.unit_reported}</td>
                <td>{item.enemy_unit}</td>
                <td>{item.date_of_activity}</td>
                <td>{item.type_of_activity}</td>
                <td>{item.activity}</td>
                <td>
                  {[item.brgy, item.municipality, item.province].join(", ")}
                </td>
                <td>{item.details_of_activity}</td>
                <td>
                  <Button onClick={() => onEdit(item.id)}>Edit</Button>
                  <Button onClick={() => onDelete(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    );
  }
  return <Col className="mt-4 d-flex justify-content-center">{content}</Col>;
}

export default Events;
