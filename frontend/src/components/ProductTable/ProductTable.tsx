import type { IProduct } from "../../utils/types";

type Props = {
  products: IProduct[];
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
};

const ProductTable = ({ products, onEdit, onDelete }: Props) => {
  return (
    <table className="w-full border border-gray-200 shadow bg-white rounded-xl">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">ID</th>
          <th className="p-2">Category</th>
          <th className="p-2">Name</th>
          <th className="p-2">Quantity</th>
          <th className="p-2">Price</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.productId} className="border-t">
            <td className="p-2">{p.productId}</td>
            <td className="p-2">{p.category}</td>
            <td className="p-2">{p.name}</td>
            <td className="p-2">{p.quantity}</td>
            <td className="p-2">${p.price}</td>
            <td className="p-2">
              <button
                onClick={() => onEdit(p)}
                className="text-blue-600 hover:underline mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
