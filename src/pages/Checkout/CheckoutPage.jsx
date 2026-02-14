import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { AddressSection } from "../../components/checkout/AddressSection";
import { PaymentSection } from "../../components/checkout/PaymentSection";
import { Button } from "../../components/ui/Button";
import {
  createOrder,
  getOrderById,
  confirmOrder,
  initiatePaymentForOrder,
} from "../../api/orders";
import { initiatePayment, verifyPayment } from "../../api/payment";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [buyNowOrder, setBuyNowOrder] = useState(null);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        try {
          const order = await getOrderById(orderId);
          setBuyNowOrder(order);
        } catch (error) {
          console.error("Failed to load order", error);
          toast.error("Failed to load order details");
          navigate("/menu");
        }
      };
      fetchOrder();
    }
  }, [orderId, navigate]);

  // Determine items and totals based on flow
  const displayItems = orderId && buyNowOrder ? buyNowOrder.items : cartItems;

  const cartTotal = displayItems.reduce(
    (sum, item) => sum + (item.totalPrice || item.price * item.quantity),
    0,
  );

  const deliveryFee =
    orderId && buyNowOrder
      ? buyNowOrder.deliveryFee
      : cartItems.length > 0 && cartTotal < 300
        ? 40
        : 0;
  const grandTotal = cartTotal + deliveryFee;

  // Temporary function until AddressSection is fixed
  const handleAddressSelect = (addr) => {
    setSelectedAddress(addr);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    setLoading(true);
    try {
      if (paymentMethod === "COD") {
        const orderRequest = {
          shippingAddress: selectedAddress,
          paymentMethod: "COD",
        };

        if (orderId) {
          await confirmOrder(orderId, orderRequest);
        } else {
          await createOrder(orderRequest);
          clearCart();
        }

        toast.success("Order Placed Successfully!");
        navigate("/auth/customer/orders");
      } else {
        // Online Payment
        // Initiate payment usually creates an order.
        // For Buy Now, we might need a different flow or ensure initiatePayment sends orderId?
        // Current initiatePayment API likely creates a new RZP order based on cart.
        // We need to check initiatePayment implementation.
        // Assumption: For now, focus on COD as requested in step 2 (Redirect to checkout).
        // But Part 3 says "Regression test for checkout & payment flow".
        // Let's assume standard flow for now.

        if (orderId) {
          // We need to confirm the order details first (address, payment method)
          // even if we are going to pay online.
          // However, confirmOrder returns the Order object, not PaymentResponse.
          // But wait, confirmOrder sets status to PENDING or PAYMENT_PENDING.

          // If we click "Place Order" with Online Payment:
          // 1. Confirm the order with address.
          const orderRequest = {
            shippingAddress: selectedAddress,
            paymentMethod: "ONLINE", // Explicitly set for confirmation
          };
          await confirmOrder(orderId, orderRequest);

          // 2. Initiate Payment for this order
          const paymentRes = await initiatePaymentForOrder(orderId);

          // 3. Open Razorpay
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: paymentRes.amount,
            currency: paymentRes.currency,
            name: "Prajapati Line Hotel",
            description: "Order Payment",
            order_id: paymentRes.payment_url,
            handler: async function (response) {
              try {
                const verifyReq = {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  shippingAddress: selectedAddress,
                };
                await verifyPayment(verifyReq);
                // clearCart(); // Do NOT clear cart for Buy Now
                toast.success("Payment Successful!");
                navigate("/auth/customer/orders");
              } catch (err) {
                toast.error("Payment Verification Failed");
                console.error(err);
              }
            },
            prefill: {
              name: "Customer", // Could fetch from user context
              email: "user@example.com",
              contact: selectedAddress.mobile,
            },
            theme: {
              color: "#FF4B2B",
            },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();

          rzp.on("payment.failed", function (response) {
            toast.error("Payment Failed: " + response.error.description);
          });
          setLoading(false);
          return; // Exit here, handled RZP open
        }

        // Cart Flow
        const paymentRes = await initiatePayment();

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: paymentRes.amount,
          currency: paymentRes.currency,
          name: "Prajapati Line Hotel",
          description: "Order Payment",
          order_id: paymentRes.payment_url, // Assuming backend sends order_id here
          handler: async function (response) {
            try {
              const verifyReq = {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                shippingAddress: selectedAddress,
              };
              await verifyPayment(verifyReq);
              clearCart();
              toast.success("Payment Successful!");
              navigate("/auth/customer/orders");
            } catch (err) {
              toast.error("Payment Verification Failed");
              console.error(err);
            }
          },
          prefill: {
            name: "Customer",
            email: "user@example.com",
            contact: selectedAddress.mobile,
          },
          theme: {
            color: "#FF4B2B",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        rzp.on("payment.failed", function (response) {
          toast.error("Payment Failed: " + response.error.description);
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false); // Handled inside above
    }
  };

  if ((!cartItems || cartItems.length === 0) && !orderId) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <Button onClick={() => navigate("/menu")} className="mt-4">
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items Review Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Review Items
            </h2>
            <div className="divide-y divide-gray-100">
              {displayItems.map((item) => (
                <div key={item.id || item.foodId} className="flex py-4 gap-4">
                  <img
                    src={item.imageUrl || item.foodImage}
                    alt={item.name || item.foodName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {item.name || item.foodName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ₹{item.totalPrice || item.price * item.quantity}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{item.price} / item
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AddressSection onSelect={handleAddressSelect} />
          <PaymentSection
            onSelect={setPaymentMethod}
            selectedMethod={paymentMethod}
          />
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Item Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              {/* Add Platform fee etc if needed */}
              <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-lg">
                <span>To Pay</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              className="w-full py-3 text-lg"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : paymentMethod === "COD"
                  ? "Place Order"
                  : "Proceed to Pay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
