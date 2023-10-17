import { Modal, ModalBody, ModalHeader } from "reactstrap";
import FormEvents, { FormValue } from "../FormEvents";

interface Props {
  toggle(): void;
  modalOpen: boolean;
  isEditing: boolean;
  formOnChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void;
  formOnSubmit(e: React.FormEvent<HTMLFormElement>): void;
  formValue: FormValue;
}

function ModalEvents({
  toggle,
  modalOpen,
  isEditing,
  formOnChange,
  formOnSubmit,
  formValue,
}: Props) {
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
