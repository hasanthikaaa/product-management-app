import { useState } from "react";
import type { IProduct } from "../../utils/types";
import "./ProductModal.css";
import { mockCategories } from "../../utils/data/mock-data.ts";

type Props = {
  product: IProduct | null;
  onClose: () => void;
  onSave: (product: IProduct) => void;
  loading?: boolean;
};

const ProductModal = ({ product, onClose, onSave, loading }: Props) => {
  const [form, setForm] = useState<IProduct>(
    product ?? {
      categoryId: "",
      name: "",
      description: "",
      quantity: 0,
      price: 0,
    },
  );

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">
          {product ? "Edit Product" : "Add Product"}
        </h2>
        <div className="modal-form">
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="modal-input"
          >
            <option value="" disabled>
              Select Category
            </option>
            {mockCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="modal-input"
          />

          <textarea
            placeholder="Description"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="modal-input modal-textarea"
          />

          <input
            type="number"
            placeholder="Quantity"
            {...(form.quantity ? { value: form.quantity } : {})}
            onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
            className="modal-input"
          />
          <input
            type="number"
            placeholder="Price"
            {...(form.price ? { value: form.price } : {})}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
            className="modal-input"
          />
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel" disabled={loading}>
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="btn-save"
            disabled={loading}
          >
            {loading ? <span className="spinner">.</span> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
