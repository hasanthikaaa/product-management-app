type Props = {
  onAdd: () => void;
};

const Toolbar = ({ onAdd }: Props) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Add Product
      </button>
      <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
        Export CSV
      </button>
      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
        Import CSV
      </button>
    </div>
  );
};

export default Toolbar;
