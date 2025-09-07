import { useEffect, useState } from "react";

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
    <div className="fixed bottom-4 right-4 space-y-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`px-4 py-2 rounded shadow ${
            msg.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Toaster;
