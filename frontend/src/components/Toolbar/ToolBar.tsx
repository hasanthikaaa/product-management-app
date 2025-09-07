import "./ToolBar.css";

type Props = {
  onAdd: () => void;
};

const Toolbar = ({ onAdd }: Props) => {
  return (
    <div className="toolbar">
      <button onClick={onAdd} className="btn-add">
        Add Product
      </button>
      <button className="btn-export">Export CSV</button>
      <button className="btn-import">Import CSV</button>
    </div>
  );
};

export default Toolbar;
