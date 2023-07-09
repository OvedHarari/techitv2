import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import UpdateProduct from "./UpdateProduct";

interface UpdateProductModalProps {
  show: boolean;
  onHide: Function;
  render: Function;
  productId: number;
  productName: string;
}

const UpdateProductModal: FunctionComponent<UpdateProductModalProps> = ({
  show,
  onHide,
  render,
  productId,
  productName,
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
        <Modal.Header>
          <Modal.Title className="display-3">Update Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UpdateProduct
            onHide={onHide}
            render={render}
            productId={productId}
          />
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default UpdateProductModal;
