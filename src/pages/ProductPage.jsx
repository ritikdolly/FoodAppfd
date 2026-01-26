import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { getFoodById } from "../api/foods";
import { ProductDetails } from "../components/products/ProductDetails";

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productRef = useRef(product);

  useEffect(() => {
    productRef.current = product;
  }, [product]);

  const fetchProduct = useCallback(async () => {
    try {
      // Don't set loading to true on refresh to avoid full page spinner
      if (!productRef.current) setLoading(true);
      const data = await getFoodById(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF4B2B]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Product not found"}
      </div>
    );
  }

  return <ProductDetails product={{ ...product, onUpdate: fetchProduct }} />;
};
