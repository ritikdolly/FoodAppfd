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

  const fetchCart = useCallback(async () => {
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
      // toast.error("Failed to load cart"); // Maybe too noisy on load
    }
  }, []); // Empty dependency array because getCart and setCartItems are stable

  useEffect(() => {
    fetchCart();
  }, [currentUser, fetchCart]); // Refresh when user logs in/out, and fetchCart is stable

  const addToCart = async (product) => {
    try {
      // Optimistic update or wait? Wait is safer for consistency.
      await apiAddToCart({ foodId: product.id, quantity: 1 });
      toast.success("Added to cart");
      fetchCart();
    } catch (error) {
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
        toast.error("Failed to add to cart");
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
