import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getCart,
  addToCart as apiAddToCart,
  updateItemQuantity,
  removeItem,
  clearCart as apiClearCart,
} from "../api/cart";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth(); // Re-fetch cart when user changes

  /* eslint-disable react-hooks/exhaustive-deps */
  const fetchCart = useCallback(async () => {
    if (!currentUser) {
      setCartItems([]);
      return;
    }
    try {
      const cart = await getCart();
      if (cart && cart.items) {
        // Quick fix in frontend: calculate unit price.
        const mappedItems = cart.items.map((item) => ({
          id: item.foodId,
          name: item.name,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
          price: item.quantity > 0 ? item.price / item.quantity : 0, // Derive unit price
        }));
        setCartItems(mappedItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  }, [currentUser]); // currentUser is a dependency

  useEffect(() => {
    fetchCart();
  }, [currentUser, fetchCart]);

  const addToCart = async (product) => {
    if (!currentUser) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      await apiAddToCart({ foodId: product.id, quantity: 1 });
      toast.success("Added to cart");
      fetchCart();
    } catch (error) {
      console.error("Add to cart error:", error);
      if (
        error &&
        typeof error === "string" &&
        error.includes("already added")
      ) {
        toast.error(error);
      } else if (
        error &&
        error.message &&
        error.message.includes("already added")
      ) {
        toast.error(error.message);
      } else {
        const msg =
          error.response?.data?.message ||
          error.message ||
          "Failed to add to cart";
        toast.error(msg);
      }
    }
  };

  const removeFromCart = async (id) => {
    try {
      await removeItem(id);
      toast.success("Removed from cart");
      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  const updateQty = async (id, qty) => {
    try {
      if (qty < 1) return;
      await updateItemQuantity(id, qty);
      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    try {
      await apiClearCart();
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.log(error);
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
