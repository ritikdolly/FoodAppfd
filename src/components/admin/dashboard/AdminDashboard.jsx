export const AdminDashboard = () => {
  const stats = [
    { title: "Total Orders", value: 128 },
    { title: "Food Items", value: 24 },
    { title: "Active Offers", value: 5 },
    { title: "Revenue", value: "₹45,200" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow"
          >
            <p className="text-sm text-gray-500">
              {item.title}
            </p>
            <p className="text-2xl font-bold mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
