import { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";

const DUMMY_DATA = [
  {
    id: 1,
    unit: "PRO 13",
    enemy_unit: "NCMRC",
    date_of_activity: "2023-04-23",
    type_of_activiy: "non-violent",
    activity: "Sighting",
    location: "Brgy., Paho, Panabo City",
    details_of_activity:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt voluptatem vel, maiores delectus inventore quam alias praesentium velit cupiditate quod dicta sit sequi vitae quia, quidem reprehenderit. Blanditiis, expedita neque.",
  },
  {
    id: 2,
    unit: "PRO 10",
    enemy_unit: "NCMRC",
    date_of_activity: "2023-04-26",
    type_of_activiy: "non-violent",
    activity: "Sighting",
    location: "Brgy., Paho, Davao City",
    details_of_activity:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt voluptatem vel, maiores delectus inventore quam alias praesentium velit cupiditate quod dicta sit sequi vitae quia, quidem reprehenderit. Blanditiis, expedita neque.",
  },
];

const initialData = {
  id: 0,
  unit: "",
  enemy_unit: "",
  date_of_activity: "",
  type_of_activiy: "",
  activity: "",
  location: "",
  details_of_activity: "",
};

function Events() {
  const [data, setData] = useState([initialData]);

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

  useEffect(() => {
    const fetchData = () => {
      setData(DUMMY_DATA.map((item) => item));
    };
    fetchData();
  }, []);
  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>Source of Information</th>
            <th>Threat Group Unit</th>
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
              <td>{item.unit}</td>
              <td>{item.enemy_unit}</td>
              <td>{item.date_of_activity}</td>
              <td>{item.type_of_activiy}</td>
              <td>{item.activity}</td>
              <td>{item.location}</td>
              <td>{item.details_of_activity}</td>
              <td>
                <Button onClick={() => onEdit(item.id)}>Edit</Button>
                <Button onClick={() => onDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Events;
