import { Modal, ModalBody, ModalHeader } from "reactstrap";

interface Props {
  toggle(): void;
  modalOpen: boolean;
  title: string;
  children: React.ReactNode;
}

function ModalEvents({ toggle, modalOpen, title, children }: Props) {
  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}

export default ModalEvents;
