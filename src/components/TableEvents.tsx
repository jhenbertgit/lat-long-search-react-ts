import { useState } from "react";
import { Table, Button } from "reactstrap";
import { Data } from "../page/Events";
import ModalEvents from "./UI/ModalEvents";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";

interface Props {
  currentData: Data[];
  onEdit(args: number): void;
  onDelete(args: number): void;
}

function TableEvents({ currentData, onEdit, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);

  const dteOption: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Manila",
  };

  const toggle = () => setIsOpen(!isOpen);

  const openModal = (item: Data) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  return (
    <>
      <Table hover size="sm" responsive>
        <thead>
          <tr>
            <th>Source of Information</th>
            <th>Threat Group</th>
            <th>Date of Activity</th>
            <th>Type of Activity</th>
            <th>Activity</th>
            <th>Location</th>
            <th>BDP Benificaiary Status</th>
            <th>R-PSB Deployment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.unit_reported}</td>
              <td>{item.enemy_unit}</td>
              <td>
                {new Intl.DateTimeFormat("en-PH", dteOption).format(
                  new Date(item.date_of_activity)
                )}
              </td>
              <td>{item.type_of_activity}</td>
              <td>{item.activity}</td>
              <td>
                {[item.brgy, item.municipality, item.province].join(", ")}
              </td>
              <td>{item.bdp_status}</td>
              <td>
                {item.rpsb_deployment_status &&
                typeof item.rpsb_deployment_status === "string"
                  ? item.rpsb_deployment_status
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")
                  : ""}
              </td>
              <td>
                <div className="d-flex flex-row gap-1">
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => onEdit(item.id)}
                  >
                    <AiFillEdit />
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => openModal(item)}
                  >
                    <AiFillEye />
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => onDelete(item.id)}
                    disabled
                  >
                    <AiFillDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedItem && (
        <ModalEvents
          modalOpen={isOpen}
          toggle={toggle}
          title="Details of Activity"
        >
          {selectedItem.details_of_activity}
        </ModalEvents>
      )}
    </>
  );
}

export default TableEvents;
