import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import AddProduct from "./AddProduct";

interface NewProductModalProps {
  show: boolean;
  onHide: Function;
  render: Function;
}

const NewProductModal: FunctionComponent<NewProductModalProps> = ({
  show,
  onHide,
  render,
}) => {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={() => onHide()}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="display-3">New Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddProduct onHide={onHide} render={render} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NewProductModal;
