import "./NotificationPanel.css";
const NotificationPanel = () => {
  // TODO: hook this up to WebSocket/SSE for real-time updates
  const lowStockAlerts: { productId: string; message: string }[] = [
    // { productId: "p1", message: "Laptop stock is low (5 left)" },
  ];

  return (
    <div className="notification-panel">
      <h2 className="notification-title">Notifications</h2>
      {lowStockAlerts.length === 0 ? (
        <p className="notification-empty">No notifications</p>
      ) : (
        <ul className="notification-list">
          {lowStockAlerts?.map((alert) => (
            <li key={alert.productId} className="notification-item">
              {alert.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPanel;
