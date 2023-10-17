import { Table } from "reactstrap";

interface Props {
  latitude: string;
  longitude: string;
  address: string;
}

function ShowResults({ latitude, longitude, address }: Props) {
  return (
    <Table borderless hover>
      <tbody>
        <tr>
          <th scope="row">Latitude:</th>
          <td>{latitude}</td>
        </tr>
        <tr>
          <th scope="row">Longitude:</th>
          <td>{longitude}</td>
        </tr>
        <tr>
          <th scope="row">Address:</th>
          <td>{address}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ShowResults;
