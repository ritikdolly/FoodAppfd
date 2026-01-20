export const OrderItems = ({ items }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Order Items</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
          {items.length} items
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            {/* Image */}
            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-gray-100">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {item.description?.slice(0, 40)}...
                </p>
                <div className="mt-2 text-xs font-medium text-gray-500">
                  Qty: {item.quantity} × ₹{item.price}
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-gray-900 block">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
