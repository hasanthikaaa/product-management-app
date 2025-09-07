import "./Toaster.css";

interface ToasterProps {
  message: string;
  type: "success" | "error";
}

const Toaster = ({ message, type }: ToasterProps) => {
  // const [messages, setMessages] = useState<
  //   { type: "success" | "error"; text: string }[]
  // >([]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMessages([{ type: "success", text: "Product created successfully!" }]);
  //   }, 2000);
  // }, []);

  return (
    <div className="toaster-container">
      {/*{messages.map((msg, idx) => (*/}
      <div
        key={message}
        className={`toaster-message ${type === "success" ? "toaster-success" : "toaster-error"}`}
      >
        {message}
      </div>
      {/*))}*/}
    </div>
  );
};

export default Toaster;
