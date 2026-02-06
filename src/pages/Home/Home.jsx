import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllFoods } from "../../api/foods";
import { Hero } from "../../common/hero/Hero";
import { FoodVerticalCard } from "../../components/products/FoodVerticalCard";
import { RestaurantReviews } from "../../components/reviews/RestaurantReviews";
import { ArrowRight } from "lucide-react";

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getAllFoods();
        // Just take first 4-8 items for featured section
        // In real app, you might want "popular" or specific featured flag
        setFeaturedProducts(data.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch foods", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Hero />

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              Top Picks
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Featured Items
            </h2>
          </div>
          <Link
            to="/menu"
            className="hidden md:flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors group"
          >
            View Full Menu{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <FoodVerticalCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            View Full Menu <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <RestaurantReviews />
        </div>
      </section>

      {/* Simple CTA Banner */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hungry? We've got you covered.
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Order from our wide range of delicious meals and get them delivered
            to your doorstep in minutes.
          </p>
          <Link
            to="/menu"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Browse Full Menu
          </Link>
        </div>
      </section>
    </div>
  );
};
