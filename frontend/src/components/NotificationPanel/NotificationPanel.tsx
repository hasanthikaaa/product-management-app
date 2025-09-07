import "./NotificationPanel.css";
import { useEffect, useState } from "react";
import { configurations } from "../../config";
import type { INotification } from "../../utils/types";
const NotificationPanel = () => {
  const [alerts, setAlerts] = useState<INotification[] | []>();

  useEffect(() => {
    const eventSource = new EventSource(`${configurations.baseUrl}/api/events`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data) as INotification;
      console.log(data);
      setAlerts([...(alerts ? alerts : []), data]);
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      eventSource.close();
    };

    return () => {
      setAlerts([]);
      eventSource.close();
    };
  }, [setAlerts]);

  return (
    <div className="notification-panel">
      <h2 className="notification-title">Notifications</h2>
      {alerts?.length === 0 ? (
        <p className="notification-empty">No notifications</p>
      ) : (
        <ul className="notification-list">
          {alerts?.map((alert) => (
            <li key={alert.productId} className="notification-item">
              Product <strong>{alert.name || alert.productId}</strong>{" "}
              {alert.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;
