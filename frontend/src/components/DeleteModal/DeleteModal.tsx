import type { IDbProduct } from "../../utils/types";
import "./DeleteModal.css";

type Props = {
  product: IDbProduct;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

const DeleteModal = ({ product, onClose, onConfirm, loading }: Props) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">
        <h2 className="delete-modal-title">Delete Product</h2>
        <p className="delete-modal-text">
          Are you sure you want to delete <b>{product.name}</b>?
        </p>
        <div className="delete-modal-actions">
          <button onClick={onClose} className="delete-modal-cancel">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="delete-modal-delete"
            disabled={loading}
          >
            {loading ? <span className="spinner">.</span> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
