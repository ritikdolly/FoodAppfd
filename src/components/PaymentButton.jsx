import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const PaymentButton = ({ amount, user, onSuccess, onFailure }) => {
  const handlePayment = async () => {
    try {
      // 1. Create order on backend
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      if (!token) {
        toast.error("Please login to proceed with payment");
        return;
      }

      const orderResponse = await axios.post(
        "http://localhost:8080/api/payment/create-order",
        {
          amount: amount,
          currency: "INR",
          receipt: "receipt_" + Date.now(),
          userId: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const order = orderResponse.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this is set in .env
        amount: order.amount,
        currency: order.currency,
        name: "Food App",
        description: "Test Transaction",
        image: "https://example.com/your_logo", // specific logo or empty
        order_id: order.razorpayOrderId,
        handler: async function (response) {
          try {
            // 3. Verify payment on backend
            const verifyResponse = await axios.post(
              "http://localhost:8080/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            if (verifyResponse.status === 200) {
              toast.success("Payment Successful!");
              if (onSuccess) onSuccess(verifyResponse.data);
            } else {
              toast.error("Payment Verification Failed");
              if (onFailure) onFailure(verifyResponse.data);
            }
          } catch (error) {
            console.error("Verification Error", error);
            toast.error("Payment Verification Failed");
            if (onFailure) onFailure(error);
          }
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
          contact: user?.phone || "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        toast.error("Payment Failed: " + response.error.description);
        if (onFailure) onFailure(response.error);
      });
      rzp1.open();
    } catch (error) {
      console.error("Payment Error", error);
      toast.error("Failed to initiate payment");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
    >
      Pay Now (₹{amount})
    </button>
  );
};

export default PaymentButton;
