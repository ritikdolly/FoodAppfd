import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { productsData } from "../../data/productsData";

export const FavoritesPage = () => {
  const { addToCart } = useCart();
  // Mock favorite functionality using first 4 products
  const favorites = productsData.products.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#FF4B2B] to-[#FF416C] mb-8">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 text-lg">No favorite items yet.</p>
          <Button className="mt-4" variant="outline">
            Browse Food
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none ring-1 ring-gray-100 p-0"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2">
                  <button className="p-2 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="font-bold text-[#FF4B2B]">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {item.description}
                </p>

                <Button
                  onClick={() => addToCart(item)}
                  className="w-full bg-gray-900 hover:bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
