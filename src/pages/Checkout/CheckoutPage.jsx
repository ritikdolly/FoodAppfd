import { useState } from "react";
import { createOrder } from "../../api/orders";
import { createPaymentOrder } from "../../api/payment";
import { useCart } from "../../context/CartContext";
import { OrderItems } from "../../components/checkout/OrderItems";
import { AddressSection } from "../../components/checkout/AddressSection";
import { PaymentMethod } from "../../components/checkout/PaymentMethod";
import { OrderSummary } from "../../components/checkout/OrderSummary";

import { useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const orderPayload = {
      items: cartItems,
      address,
      paymentMethod,
      date: new Date().toISOString(),
      total: totalAmount, // Match backend field name 'total'
      status: "Processing",
    };

    try {
      if (paymentMethod === "Razorpay") {
        const order = await createPaymentOrder(totalAmount);

        const options = {
          key: "rzp_test_YOUR_KEY_ID", // Replace with your Key ID
          amount: order.amount,
          currency: "INR",
          name: "Food App",
          description: "Order Payment",
          order_id: order.id, // This is the order_id created in the backend
          handler: async function (response) {
            // Payment successful, now create the order in DB
            orderPayload.paymentId = response.razorpay_payment_id;
            orderPayload.status = "Paid"; // Or "Processing" depending on flow

            await createOrder(orderPayload);
            clearCart();
            navigate("/orders");
          },
          prefill: {
            name: "User Name", // valid user name
            email: "user@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#FF4B2B",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert("Payment Failed: " + response.error.description);
        });
        rzp1.open();
      } else {
        // COD or other methods
        await createOrder(orderPayload);
        clearCart();
        navigate("/orders");
      }
    } catch (error) {
      alert("Failed to place order. Please try again.");
      console.error("Order placement failed", error);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8">Place Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <OrderItems items={cartItems} />
            <AddressSection onSelect={setAddress} />
            <PaymentMethod
              method={paymentMethod}
              setMethod={setPaymentMethod}
            />
          </div>

          {/* RIGHT */}
          <OrderSummary items={cartItems} onPlaceOrder={handlePlaceOrder} />
        </div>
      </div>
    </main>
  );
};
