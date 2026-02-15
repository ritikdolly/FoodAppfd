import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { AddressSection } from "../../components/checkout/AddressSection";
import { PaymentSection } from "../../components/checkout/PaymentSection";
import { Button } from "../../components/ui/Button";
import { createOrder } from "../../api/orders";
import { initiatePayment, verifyPayment } from "../../api/payment";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Get buy-now item from router state (if coming from Buy Now button)
  const buyNowItem = location.state?.buyNowItem;

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  // Determine items to display: either buy-now item or cart items
  const displayItems = buyNowItem
    ? [
        {
          foodId: buyNowItem.foodId,
          foodName: buyNowItem.name,
          foodImage: buyNowItem.imageUrl,
          quantity: buyNowItem.quantity,
          price: buyNowItem.price,
          totalPrice: buyNowItem.price * buyNowItem.quantity,
        },
      ]
    : cartItems;

  const cartTotal = displayItems.reduce(
    (sum, item) => sum + (item.totalPrice || item.price * item.quantity),
    0,
  );

  const deliveryFee = cartTotal > 0 && cartTotal < 300 ? 40 : 0;
  const grandTotal = cartTotal + deliveryFee;

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
        // Create order with complete details
        const orderRequest = {
          shippingAddress: selectedAddress,
          paymentMethod: "COD",
        };

        // Include buy-now item if present
        if (buyNowItem) {
          orderRequest.buyNowItem = {
            foodId: buyNowItem.foodId,
            quantity: buyNowItem.quantity,
          };
        }

        await createOrder(orderRequest);

        // Clear cart only if this was a cart checkout
        if (!buyNowItem) {
          clearCart();
        }

        toast.success("Order Placed Successfully!");
        navigate("/auth/customer/orders");
      } else {
        // Online Payment Flow
        // Note: For buy-now with online payment, we need to create order after payment verification
        // For now, initiating payment from cart
        const paymentRes = await initiatePayment();

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

              // Clear cart only if not buy-now
              if (!buyNowItem) {
                clearCart();
              }

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
      setLoading(false);
    }
  };

  // Check if there are no items to checkout
  if ((!cartItems || cartItems.length === 0) && !buyNowItem) {
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
              {displayItems.map((item, index) => (
                <div
                  key={item.foodId || item.id || index}
                  className="flex py-4 gap-4"
                >
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
