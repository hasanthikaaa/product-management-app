import { useEffect, useState } from "react";
import type { IDbProduct } from "./utils/types";
import ProductTable from "./components/ProductTable/ProductTable.tsx";
import Toolbar from "./components/Toolbar/ToolBar.tsx";
import NotificationPanel from "./components/NotificationPanel/NotificationPanel.tsx";
import ProductModal from "./components/ProductModal/ProductModal.tsx";
import DeleteModal from "./components/DeleteModal/DeleteModal.tsx";
import Toaster from "./components/Toaster/Toaster.tsx";
import "./App.css";
import useProduct from "./hooks/useProduct.ts";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IDbProduct | null>(null);
  const [toaster, setToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState<string | undefined>();

  const {
    loading,
    saveProduct,
    products,
    updateProduct,
    deleteProduct,
    importProducts,
  } = useProduct();

  useEffect(() => {
    if (toasterMsg) {
      const timer = setTimeout(() => {
        setShowDeleteModal(false);
        setShowModal(false);
        setToasterMsg(undefined);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [toasterMsg]);

  /* Handle add modal */
  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  /* Handle edit modal */
  const handleEdit = (product: IDbProduct) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  /* Handle delete modal */
  const handleDelete = (product: IDbProduct) => {
    setEditingProduct(product);
    setShowDeleteModal(true);
  };

  /* Add new product */
  const handleSave = async (product: IDbProduct) => {
    console.log("product", product);
    let result;
    if (editingProduct) {
      result = await updateProduct(product);
      setToasterMsg("Product updated successfully.");
    } else {
      result = await saveProduct(product);
      setToasterMsg("Product created successfully.");
    }

    console.log("result", result);
    if (result) {
      setToaster(true);
      setShowModal(false);
    }
  };

  /* Delete product */
  const confirmDelete = async (productId: string) => {
    if (!productId) {
      return;
    }

    const result = await deleteProduct(productId);
    if (result) {
      setToasterMsg("Product deleted successfully.");
      setToaster(true);
      setShowDeleteModal(false);
    }
  };

  const handleImportProducts = async (formData: FormData) => {
    await importProducts(formData);
  };
  return (
    <div className="app-container">
      <h1 className="title">📦 Product Management</h1>

      <Toolbar onAdd={handleAdd} handleImportProducts={handleImportProducts} />

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
              onConfirm={() => confirmDelete(editingProduct?.productId)}
              loading={loading}
            />
          </div>
        </div>
      )}
      {toaster && toasterMsg ? (
        <Toaster message={toasterMsg} type="success" />
      ) : null}
    </div>
  );
}

export default App;
