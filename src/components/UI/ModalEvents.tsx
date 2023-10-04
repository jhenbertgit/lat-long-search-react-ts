import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import FormEvents from "../FormEvents";

type ModalProps = {
  toggle(): void;
  modalOpen: boolean;
};

function ModalEvents({ toggle, modalOpen }: ModalProps) {
  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Events</ModalHeader>
      <ModalBody>
        <FormEvents />
      </ModalBody>
      <ModalBody>
        <Button color="primary">Submit</Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  );
}

export default ModalEvents;
