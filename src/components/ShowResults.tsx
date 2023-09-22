import { Table } from "reactstrap";

type Props = {
  latitude: string;
  longitude: string;
  address: string;
};

function ShowResults(props: Props) {
  const { latitude, longitude, address } = props;
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
          <th scope="row">BDP Status:</th>
          <td>Result here</td>
        </tr>
        <tr>
          <th scope="row">R-PSB Deployment Status:</th>
          <td>Result here</td>
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
