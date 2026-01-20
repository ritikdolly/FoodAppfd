import { useState } from "react";
import { productsData } from "../../data/productsData";
import { TypeFilter } from "../../common/filters/TypeFilter";
import { ProductList } from "../../components/products/ProductList";
import { Hero } from "../../common/hero/Hero";

export const Home = () => {
  const [activeType, setActiveType] = useState("veg");

  const filteredProducts = productsData.products.filter((product) =>
    product.types.includes(activeType),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* <h1 className="text-2xl font-bold mb-4">
        Explore Our Menu
      </h1> */}

      <Hero />

      <TypeFilter
        types={productsData.types}
        activeType={activeType}
        onChange={setActiveType}
      />

      <ProductList products={filteredProducts} />
    </div>
  );
};
