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
      >
        <Modal.Header closeButton>
          <Modal.Title className="display-3">New Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddProduct onHide={onHide} render={render} />
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default NewProductModal;
