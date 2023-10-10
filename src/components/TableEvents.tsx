import {
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Data } from "./Events";

type TableEventsProps = {
  currentData: Data[];
  onEdit(args: number): void;
  onDelete(args: number): void;
};

function TableEvents({ currentData, onEdit, onDelete }: TableEventsProps) {
  const dteOption: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  };
  return (
    <Table hover size="sm" responsive>
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
        {currentData.map((item) => (
          <tr key={item.id}>
            <td>{item.unit_reported}</td>
            <td>{item.enemy_unit}</td>
            <td>
              {new Intl.DateTimeFormat("fil-PH", dteOption).format(
                new Date(item.date_of_activity)
              )}
            </td>
            <td>{item.type_of_activity}</td>
            <td>{item.activity}</td>
            <td>{[item.brgy, item.municipality, item.province].join(", ")}</td>
            <td>{item.details_of_activity}</td>
            <td>
              <UncontrolledDropdown className="mt-4">
                <DropdownToggle caret color="primary">
                  Actions
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => onEdit(item.id)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem disabled onClick={() => onDelete(item.id)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableEvents;
