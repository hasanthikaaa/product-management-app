const NotificationPanel = () => {
  // TODO: hook this up to WebSocket/SSE for real-time updates
  const lowStockAlerts = [
    { productId: "p1", message: "⚠️ Laptop stock is low (5 left)" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 h-full">
      <h2 className="text-lg font-bold mb-3">Notifications</h2>
      <ul className="space-y-2">
        {lowStockAlerts.map((alert) => (
          <li key={alert.productId} className="text-sm text-red-600">
            {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
