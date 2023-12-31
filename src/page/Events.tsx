import { useState, useEffect } from "react";
import { Button, Spinner, Col, UncontrolledAlert, Input } from "reactstrap";
import ModalEvents from "../components/UI/ModalEvents";
import Paginations from "../components/UI/Paginations";
import TableEvents from "../components/TableEvents";
import Filters from "../components/UI/Filters";
import FormEvents from "../components/FormEvents";

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
  latitude: string;
  longitude: string;
  bdp_status: string;
  gf_vertical_units: string;
  type: string;
  rpsb_deployment_status: string;
};

export type Data = {
  id: number;
} & UpdatedData;

export type CbState = {
  NEMRC: boolean;
  NCMRC: boolean;
  SMRC: boolean;
};

type Action = {
  status: "loading" | "success" | "editing" | "error";
};

const initialData: Data = {
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
  latitude: " ",
  longitude: " ",
  bdp_status: " ",
  gf_vertical_units: " ",
  type: " ",
  rpsb_deployment_status: " ",
};
const initialFormData: UpdatedData = {
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
  latitude: " ",
  longitude: " ",
  bdp_status: " ",
  gf_vertical_units: " ",
  type: " ",
  rpsb_deployment_status: " ",
};

const url = import.meta.env.VITE_URL;

function Events() {
  const [data, setData] = useState<Data[]>([initialData]);
  const [error, setError] = useState<Error | null>(null);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<UpdatedData>(initialFormData);
  const [editedItem, setEditedItem] = useState<Data>(initialData);
  const [resMsg, setResMsg] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [q, setQ] = useState("");
  const [filterParam, setFilterParam] = useState("All");
  const [cbState, setCbState] = useState<CbState>({
    NEMRC: false,
    NCMRC: false,
    SMRC: false,
  });
  const [status, setStatus] = useState<Action>({ status: "loading" });

  /**button functions */
  const onDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const onEdit = (id: number) => {
    //data must not be null to avoid runtime error (non-null assertion)
    const itemToEdit: Data = data.find((item) => item.id === id)!;

    if (itemToEdit) {
      setEditedItem(itemToEdit);
      setFormData(itemToEdit);
      setModal(true);
      setStatus({ status: "editing" });
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
    if (status.status === "editing") {
      const { id } = editedItem;
      const message = await updateData(id, formData);
      setResMsg(message);
      setStatus({ status: "success" });
    } else {
      alert("submit button clicked");
    }
    setModal(false);
    setFormData(initialFormData);
    setTimeout(() => setIsSent(false), 3000);
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
  };

  const searchParam: (keyof Data)[] = ["brgy", "municipality", "province"];

  function search(items: Data[]) {
    return items.filter((item) => {
      if (
        filterParam.includes("All") ||
        filterParam.includes(item.enemy_unit)
      ) {
        return searchParam.some((newItem) => {
          const itemValue = item[newItem];
          if (itemValue !== null && itemValue !== undefined) {
            return (
              itemValue.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
            );
          }
          return false;
        });
      }
    });
  }

  /**pagination logic start */
  const itemPerPage = 10;

  //calculate total number of pages
  const totalPages = Math.ceil(data.length / itemPerPage);

  //calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  //get the data for the current page
  const currentData = search(data).slice(startIndex, endIndex);

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
  /**pagination logic end */

  //function to handle pagination on change
  const handlePageChange = (pagenumber: number) => setCurrentPage(pagenumber);

  //function to handle form on change
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //func to handle checkbox onChange
  const handleCbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const updatedState: CbState = {
      NEMRC: false,
      NCMRC: false,
      SMRC: false,
      [name]: checked,
    };
    setCbState(updatedState);
    setFilterParam(checked ? name : "All");
  };

  //modal toggle
  const toggle = () => {
    setModal(!modal);
    setFormData(initialFormData);
    setStatus({ status: "success" });
  };

  let content;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}:5000/api/v1/events`);
        const eventsData: Data[] = await response.json();
        if (response.ok) {
          setData(eventsData);
          setStatus({ status: "success" });
        }
      } catch (error) {
        setError(error as Error);
        setStatus({ status: "error" });
      }
    };
    fetchData();
  }, []);

  if (error) {
    content = (
      <>
        <UncontrolledAlert
          color="warning"
          className="position-absolute top-0 start-50 translate-middle-x mt-2"
        >
          {error.name}: {error.message}
        </UncontrolledAlert>
      </>
    );
  }

  if (status.status === "loading") {
    content = (
      <Spinner
        color="primary"
        style={{ height: "7rem", width: "7rem" }}
      ></Spinner>
    );
  }

  if (status.status === "success" || status.status === "editing") {
    content = (
      <Col className="w-100">
        <Paginations
          startPage={startPage}
          endPage={endPage}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <TableEvents
          currentData={currentData}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Col>
    );
  }
  return (
    <>
      <Col className="mt-3">
        {!!isSent && (
          <UncontrolledAlert
            color="info"
            className="position-absolute top-0 start-50 translate-middle-x mt-2"
          >
            {resMsg}
          </UncontrolledAlert>
        )}
        <Button className="mb-3" color="primary" onClick={toggle}>
          Add Events
        </Button>

        <Input
          type="search"
          name="search"
          id="search"
          placeholder="Search by brgy, municipality, province"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <Filters onChange={handleCbChange} checkboxState={cbState} />

        <ModalEvents
          modalOpen={modal}
          toggle={toggle}
          title={status.status === "editing" ? "Edit" : "Add"}
        >
          <FormEvents
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            formValue={formData}
            isEditing={status.status === "editing"}
            toggle={toggle}
          />
        </ModalEvents>
      </Col>
      <Col md={12} className="mt-4 d-flex justify-content-center">
        {content}
      </Col>
    </>
  );
}

export default Events;
