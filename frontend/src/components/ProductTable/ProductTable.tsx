import type { IDbProduct } from "../../utils/types";
import "./ProductTable.css";
type Props = {
  products: IDbProduct[];
  onEdit: (product: IDbProduct) => void;
  onDelete: (product: IDbProduct) => void;
};

const ProductTable = ({ products, onEdit, onDelete }: Props) => {
  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.productId}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.description}</td>
              <td>{p.quantity}</td>
              <td>${p.price}</td>
              <td>
                <button className="btn-edit" onClick={() => onEdit(p)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => onDelete(p)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
