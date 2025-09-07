import { useEffect, useState } from "react";
import "./Toaster.css";

const Toaster = () => {
  const [messages, setMessages] = useState<
    { type: "success" | "error"; text: string }[]
  >([]);

  useEffect(() => {
    setTimeout(() => {
      setMessages([{ type: "success", text: "Product created successfully!" }]);
    }, 2000);
  }, []);

  return (
    <div className="toaster-container">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`toaster-message ${msg.type === "success" ? "toaster-success" : "toaster-error"}`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Toaster;
