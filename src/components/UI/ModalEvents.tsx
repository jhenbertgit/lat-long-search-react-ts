import { Modal, ModalBody, ModalHeader } from "reactstrap";
import FormEvents from "../FormEvents";

type ModalProps = {
  toggle(): void;

  formValue: {
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
  formOnChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void;
  formOnSubmit(e: React.FormEvent<HTMLFormElement>): void;
  modalOpen: boolean;
  isEditing: boolean;
};

function ModalEvents({
  toggle,
  modalOpen,
  isEditing,
  formOnChange,
  formOnSubmit,
  formValue,
}: ModalProps) {
  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {isEditing ? "Edit Events" : "Add Events"}
      </ModalHeader>
      <ModalBody>
        <FormEvents
          formValue={formValue}
          onChange={formOnChange}
          onSubmit={formOnSubmit}
          isEditing={isEditing}
          toggle={toggle}
        />
      </ModalBody>
    </Modal>
  );
}

export default ModalEvents;
