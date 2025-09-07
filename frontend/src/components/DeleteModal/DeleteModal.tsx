import type { IProduct } from "../../utils/types";

type Props = {
  product: IProduct;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({ product, onClose, onConfirm }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-bold mb-4">Delete Product</h2>
        <p>
          Are you sure you want to delete <b>{product.name}</b>?
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
