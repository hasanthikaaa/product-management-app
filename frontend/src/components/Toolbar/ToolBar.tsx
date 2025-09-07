import "./ToolBar.css";
import { exportsProductsApi } from "../../services/api.ts";
import * as React from "react";

type Props = {
  onAdd: () => void;
  handleImportProducts: (formData: FormData) => void;
};

const Toolbar = ({ onAdd, handleImportProducts }: Props) => {
  const handleExportProducts = async () => {
    try {
      await exportsProductsApi();
    } catch (e) {
      console.error(e);
    }
  };

  const handleImportClick = () => {
    const input = document.getElementById("import-input");
    input?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    handleImportProducts(formData);
  };

  return (
    <div className="toolbar">
      <button onClick={onAdd} className="btn btn-add">
        + Add Product
      </button>

      <button onClick={handleExportProducts} className="btn btn-export">
        Export CSV
      </button>

      <input
        type="file"
        id="import-input"
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={handleImportClick} className="btn btn-import">
        Import CSV
      </button>
    </div>
  );
};

export default Toolbar;
