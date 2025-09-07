import { useState } from "react";
import type { IDbProduct, IProduct } from "./utils/types";
import ProductTable from "./components/ProductTable/ProductTable.tsx";
import Toolbar from "./components/Toolbar/ToolBar.tsx";
import NotificationPanel from "./components/NotificationPanel/NotificationPanel.tsx";
import ProductModal from "./components/ProductModal/ProductModal.tsx";
import DeleteModal from "./components/DeleteModal/DeleteModal.tsx";
import Toaster from "./components/Toaster/Toaster.tsx";
import "./App.css";
import useProduct from "./hooks/useProduct.ts";

function App() {
  const [products, setProducts] = useState<IDbProduct[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [toaster, setToaster] = useState(false);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (product: IProduct) => {
    setEditingProduct(product);
    setShowDeleteModal(true);
  };

  const { loading, saveProduct } = useProduct();

  const handleSave = async (product: IProduct) => {
    console.log("product", product);
    const productId = await saveProduct(product);
    if (productId) {
      setToaster(true);
      setShowModal(false);
      setProducts([]);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">📦 Product Management</h1>

      <Toolbar onAdd={handleAdd} />

      <div className="content">
        <div className="main">
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <div className="sidebar">
          <NotificationPanel />
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <ProductModal
              product={editingProduct}
              onClose={() => setShowModal(false)}
              onSave={(p) => handleSave(p)}
              loading={loading}
            />
          </div>
        </div>
      )}

      {showDeleteModal && editingProduct && (
        <div className="modal-overlay">
          <div className="modal-container">
            <DeleteModal
              product={editingProduct}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={() => {
                // setProducts((prev) =>
                //   prev.filter((p) => p.productId !== editingProduct.productId),
                // );
                // setShowDeleteModal(false);
              }}
            />
          </div>
        </div>
      )}
      {toaster && (
        <Toaster message="Product created successfully." type="success" />
      )}
    </div>
  );
}

export default App;
