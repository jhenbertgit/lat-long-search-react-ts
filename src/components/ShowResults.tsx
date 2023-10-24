import { useContext } from "react";
import { Table } from "reactstrap";
import { LatLongStateCtx } from "../context/LatLongCtx";

function ShowResults() {
  const state = useContext(LatLongStateCtx);
  return (
    <Table borderless hover>
      <tbody>
        <tr>
          <th scope="row">Latitude:</th>
          <td>{state.dataset.lat}</td>
        </tr>
        <tr>
          <th scope="row">Longitude:</th>
          <td>{state.dataset.lng}</td>
        </tr>
        <tr>
          <th scope="row">Address:</th>
          <td>{state.dataset.address}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ShowResults;
