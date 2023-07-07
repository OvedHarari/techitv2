import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteProduct } from "../services/productsService";
import { successMsg } from "../services/feedbacksService";

interface DeleteProductModalProps {
  show: boolean;
  onHide: Function;
  productId: number;
  render: Function;
  productName: string;
}

const DeleteProductModal: FunctionComponent<DeleteProductModalProps> = ({
  show,
  onHide,
  productId,
  render,
  productName,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete product:
          <span className="fw-bold"> {productName}</span> ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() =>
              deleteProduct(productId)
                .then((res) => {
                  render();
                  onHide();
                  successMsg("The product was deleted successfully!");
                })
                .catch((err) => console.log(err))
            }
          >
            Yes
          </Button>
          <Button variant="danger" onClick={() => onHide()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
