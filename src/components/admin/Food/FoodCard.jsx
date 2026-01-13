export const FoodCard = ({ food }) => (
  <div className="border rounded-lg p-4 bg-white">
    <h3 className="font-medium">{food.name}</h3>
    <p>₹{food.price}</p>
    <span className="text-sm text-green-600">{food.status}</span>
  </div>
);
