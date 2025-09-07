import { useState } from "react";
import type { IProduct } from "../../utils/types";
import "./ProductModal.css";

type Props = {
  product: IProduct | null;
  onClose: () => void;
  onSave: (product: IProduct) => void;
};

const ProductModal = ({ product, onClose, onSave }: Props) => {
  const [form, setForm] = useState<IProduct>(
    product ?? { productId: "", category: "", name: "", quantity: 0, price: 0 },
  );

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">
          {product ? "Edit Product" : "Add Product"}
        </h2>
        <div className="modal-form">
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="modal-input"
          />
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="modal-input"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
            className="modal-input"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
            className="modal-input"
          />
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button onClick={() => onSave(form)} className="btn-save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
