import { useState, useEffect } from "react";
import {
  Button,
  Table,
  Spinner,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ModalEvents from "./UI/ModalEvents";

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

const url = import.meta.env.VITE_URL;

function Events() {
  const [data, setData] = useState([initialData]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modal, setModal] = useState(false);
  const [curentPage, setCurrentPage] = useState(1);

  const dteOption: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  /**pagination */
  const itemPerPage = 5;

  //calculate total number of pages
  const totalPages = Math.ceil(data.length / itemPerPage);

  //calculate the start and end indices for the current page
  const startIndex = (curentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  //get the data for the current page
  const currentData = data.slice(startIndex, endIndex);

  //function to handle the change page
  const handlePageChange = (pagenumber: number) => setCurrentPage(pagenumber);

  //calculate the page range
  const pageRange = 10;
  const startPage = Math.max(
    1,
    Math.min(curentPage - Math.floor(pageRange / 2), totalPages - pageRange + 1)
  );

  const endPage = Math.min(startPage + pageRange - 1, totalPages);

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

  const toggle = () => setModal(!modal);

  let content;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const eventsData = await fetch(`${url}:5000/api/v1/events`);
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
        <Pagination>
          <PaginationItem disabled={curentPage === 1}>
            <PaginationLink first onClick={() => handlePageChange(1)} />
          </PaginationItem>

          <PaginationItem disabled={curentPage === 1}>
            <PaginationLink
              previous
              onClick={() => handlePageChange(curentPage - 1)}
            />
          </PaginationItem>

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
            <PaginationItem
              key={startPage + i}
              active={startPage + i === curentPage}
            >
              <PaginationLink onClick={() => handlePageChange(startPage + i)}>
                {startPage + i}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem disabled={curentPage === totalPages}>
            <PaginationLink
              next
              onClick={() => handlePageChange(curentPage + 1)}
            />
          </PaginationItem>

          <PaginationItem disabled={curentPage === totalPages}>
            <PaginationLink last onClick={() => handlePageChange(totalPages)} />
          </PaginationItem>
        </Pagination>

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
                  {new Intl.DateTimeFormat("en-US", dteOption).format(
                    new Date(item.date_of_activity)
                  )}
                </td>
                <td>{item.type_of_activity}</td>
                <td>{item.activity}</td>
                <td>
                  {[item.brgy, item.municipality, item.province].join(", ")}
                </td>
                <td>{item.details_of_activity}</td>
                <td>
                  <Button
                    color="primary"
                    disabled
                    className="mt-2"
                    onClick={() => onEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    disabled
                    className="mt-2"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    );
  }
  return (
    <>
      <Col className="mt-3">
        <Button color="primary" onClick={toggle}>
          Add Events
        </Button>
        <ModalEvents modalOpen={modal} toggle={toggle} />
      </Col>
      <Col md={12} className="mt-4 d-flex justify-content-center">
        {content}
      </Col>
    </>
  );
}

export default Events;
