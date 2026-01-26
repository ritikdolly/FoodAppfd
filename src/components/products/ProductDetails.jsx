import { ProductInfo } from "./ProductInfo";
import { ProductMeta } from "./ProductMeta";
import { ProductReviews } from "./ProductReviews";

export const ProductDetails = ({ product }) => {
  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* TOP SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* IMAGE / MEDIA */}
          <aside className="relative">
            <div className="lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover"
                />
              </div>

              {!product.availability && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
          </aside>

          {/* PRODUCT CONTENT */}
          <section className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <ProductInfo product={product} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <ProductMeta product={product} />
            </div>
          </section>
        </section>

        {/* SEPARATOR */}
        <div className="my-16 border-t border-gray-200" />

        {/* REVIEWS */}
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <ProductReviews
            reviews={product.reviews || []}
            productId={product.id}
            onUpdate={product.onUpdate}
          />
        </section>
      </div>
    </main>
  );
};
