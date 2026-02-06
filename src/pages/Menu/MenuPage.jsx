import { useState, useEffect } from "react";
import { getAllFoods } from "../../api/foods";
import { TypeFilter } from "../../common/filters/TypeFilter";
import { ProductList } from "../../components/products/ProductList";
import { Search } from "lucide-react";

export const MenuPage = () => {
  const [activeType, setActiveType] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allTypes, setAllTypes] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredProducts = products.filter((product) => {
    const matchesType =
      activeType === "All" ||
      (product.types && product.types.includes(activeType));
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Menu
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of delicious dishes, crafted with
            passion and delivered with love.
          </p>
        </div> */}

        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <TypeFilter
            types={allTypes}
            activeType={activeType}
            onChange={setActiveType}
          />

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-gray-500 text-lg">
              No items found matching your criteria.
            </p>
            <button
              onClick={() => {
                setActiveType("All");
                setSearchQuery("");
              }}
              className="mt-4 text-primary font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
