import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { OrderItems } from "../../components/checkout/OrderItems";
import { AddressSection } from "../../components/checkout/AddressSection";
import { PaymentMethod } from "../../components/checkout/PaymentMethod";
import { OrderSummary } from "../../components/checkout/OrderSummary";

export const CheckoutPage = () => {
  const { cartItems } = useCart();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePlaceOrder = () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    const orderPayload = {
      items: cartItems,
      address,
      paymentMethod,
      date: new Date().toISOString(),
    };

    console.log("Order placed:", orderPayload);
    alert("Order placed successfully!");
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
