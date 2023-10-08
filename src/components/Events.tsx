import { useState, useEffect } from "react";
import { Button, Table, Spinner, Col, UncontrolledAlert } from "reactstrap";
import ModalEvents from "./UI/ModalEvents";
import Paginations from "./UI/Paginations";

type UpdatedData = {
  unit_reported: string;
  source_of_report: string;
  date_of_report: string;
  date_of_activity: string;
  evaluation: string;
  type_of_activity: string;
  activity: string;
  enemy_unit: string;
  strength: string;
  leader: string;
  position: string;
  sitio: string;
  brgy: string;
  municipality: string;
  province: string;
  details_of_activity: string;
  mgrs: string;
  latitude: number;
  longitude: number;
  bdp_status: string;
  gf_vertical_units: string;
  type: string;
  rpsb_deployment_status: string;
};

type Data = {
  id: number;
} & UpdatedData;

const initialData = {
  id: 0,
  unit_reported: " ",
  source_of_report: " ",
  date_of_report: "",
  date_of_activity: "",
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
const initialFormData = {
  unit_reported: " ",
  source_of_report: " ",
  date_of_report: "",
  date_of_activity: "",
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
  const [data, setData] = useState<Data[]>([initialData]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<UpdatedData>(initialFormData);
  const [editedItem, setEditedItem] = useState<Data>(initialData);
  const [resMsg, setResMsg] = useState("");
  const [isSent, setIsSent] = useState(false);

  const dteOption: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  };

  /**button functions */
  const onDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const onEdit = (argsid: number) => {
    //data must no be null to avoid runtime error (non-null assertion)
    const itemToEdit: Data = data.find((item) => item.id === argsid)!;
    const { id, ...formEditData } = itemToEdit;
    if (itemToEdit) {
      setEditedItem(itemToEdit);
      setFormData({ ...formEditData });
      setModal(true);
      setIsEditing(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData((prevData) =>
      prevData.map((item) =>
        item.id === editedItem.id ? { ...item, ...formData } : item
      )
    );
    //sending updated data to database
    if (isEditing) {
      const { id } = editedItem;
      const message = await updateData(id, formData);
      setResMsg(message);
    } else {
      alert("submit button clicked");
    }

    setIsEditing(false);
    setModal(false);
  };

  //function to update the data in database
  const updateData = async (id: number, updatedData: UpdatedData) => {
    try {
      const response = await fetch(`${url}:5000/api/v1/events/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        setIsSent(true);
      }
      const { message } = await response.json();
      return message;
    } catch (error) {
      setError(error as Error);
    }
    setIsSent(false);
  };

  /**pagination logic start */
  const itemPerPage = 5;

  //calculate total number of pages
  const totalPages = Math.ceil(data.length / itemPerPage);

  //calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  //get the data for the current page
  const currentData = data.slice(startIndex, endIndex);

  //calculate the page range
  const pageRange = 10;
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(pageRange / 2),
      totalPages - pageRange + 1
    )
  );
  const endPage = Math.min(startPage + pageRange - 1, totalPages);
  /**pagination logic start */

  //function to handle the change page
  const handlePageChange = (pagenumber: number) => setCurrentPage(pagenumber);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggle = () => {
    setModal(!modal);
    setIsEditing(false);
  };

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
        {isSent && (
          <UncontrolledAlert
            color="info"
            className="position-absolute top-0 start-50 translate-middle-x mt-2"
          >
            {resMsg}
          </UncontrolledAlert>
        )}
        <Paginations
          startPage={startPage}
          endPage={endPage}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

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
                <td>
                  {[item.brgy, item.municipality, item.province].join(", ")}
                </td>
                <td>{item.details_of_activity}</td>
                <td>
                  <Button
                    color="primary"
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
        <ModalEvents
          modalOpen={modal}
          toggle={toggle}
          isEditing={isEditing}
          formOnChange={isEditing ? handleFormChange : () => {}}
          formValue={isEditing ? formData : initialFormData}
          formOnSubmit={handleFormSubmit}
        />
      </Col>
      <Col md={12} className="mt-4 d-flex justify-content-center">
        {content}
      </Col>
    </>
  );
}

export default Events;
