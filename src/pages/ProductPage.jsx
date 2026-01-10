import { useParams } from "react-router-dom";
import { productsData } from "../data/productsData";
import { ProductDetails } from "../components/products/ProductDetails";

export const ProductPage = () => {
  const { id } = useParams();

  const product = productsData.products.find(p => p.id === id);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  return <ProductDetails product={product} />;
};
