import { useState, useEffect } from "react";
import { getAllFoods } from "../../api/foods";
import { ProductInfo } from "./ProductInfo";
import { ProductMeta } from "./ProductMeta";

import { RelatedProductCard } from "./RelatedProductCard";

export const ProductDetails = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const allFoods = await getAllFoods();
        // Filter out current product, maybe shuffle or pick same category
        // For now, simple filter
        const related = allFoods
          .filter((item) => item.id !== product.id)
          .slice(0, 8); // Limit to 8 items
        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to load related products", error);
      }
    };

    if (product) {
      fetchRelated();
    }
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50/50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* TOP SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* IMAGE / MEDIA (Left - 7 cols) */}
          <aside className="lg:col-span-7 relative">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden aspect-4/3 lg:aspect-video relative group">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {!product.availability && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      Currently Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* PRODUCT CONTENT (Right - 5 cols) */}
          <section className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl shadow-xs border border-gray-100 p-6 md:p-8">
              <ProductInfo product={product} />
            </div>

            <div className="bg-white rounded-3xl shadow-xs border border-gray-100 p-6">
              <ProductMeta product={product} />
            </div>
          </section>
        </section>

        {/* REVIEWS SECTION */}

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-gray-200 pt-16">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-2xl font-bold text-gray-900">
                You might also like
              </h3>
            </div>

            <div className="relative -mx-4 px-4 overflow-hidden">
              <div className="flex gap-4 overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x">
                {relatedProducts.map((item) => (
                  <div key={item.id} className="snap-start">
                    <RelatedProductCard product={item} />
                  </div>
                ))}
              </div>

              {/* Fade gradients for scroll indication (optional, visual polish) */}
              <div className="absolute top-0 bottom-8 left-0 w-8 bg-linear-to-r from-gray-50 to-transparent pointer-events-none md:hidden" />
              <div className="absolute top-0 bottom-8 right-0 w-8 bg-linear-to-l from-gray-50 to-transparent pointer-events-none md:hidden" />
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
