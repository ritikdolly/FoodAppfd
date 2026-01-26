import { useState, useEffect } from "react";
import { getAllFoods } from "../../api/foods";
import { TypeFilter } from "../../common/filters/TypeFilter";
import { ProductList } from "../../components/products/ProductList";
import { Hero } from "../../common/hero/Hero";

export const Home = () => {
  const [activeType, setActiveType] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTypes, setAllTypes] = useState(["All"]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getAllFoods();
        setProducts(data);

        // Extract unique types from products for filter
        const types = new Set(["All"]);
        data.forEach((p) => {
          if (Array.isArray(p.types)) {
            p.types.forEach((t) => types.add(t));
          }
        });
        setAllTypes(Array.from(types));
      } catch (error) {
        console.error("Failed to fetch foods", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredProducts =
    activeType === "All"
      ? products
      : products.filter(
          (product) => product.types && product.types.includes(activeType),
        );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4B2B]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Hero />

      <div id="menu" className="scroll-mt-24">
        <TypeFilter
          types={allTypes}
          activeType={activeType}
          onChange={setActiveType}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <div className="text-center py-12 text-gray-500">
          No items found for {activeType}
        </div>
      )}
    </div>
  );
};
