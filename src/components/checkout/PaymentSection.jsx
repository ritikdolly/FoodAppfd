import { CreditCard, Banknote } from "lucide-react";

export const PaymentSection = ({ onSelect, selectedMethod }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="w-5 h-5 text-[#FF4B2B]" />
        <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* COD Option */}
        <div
          onClick={() => onSelect("COD")}
          className={`
            relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4
            ${
              selectedMethod === "COD"
                ? "border-[#FF4B2B] bg-orange-50/50"
                : "border-gray-100 hover:border-orange-200 hover:bg-gray-50"
            }
          `}
        >
          <div
            className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${selectedMethod === "COD" ? "bg-[#FF4B2B]/10 text-[#FF4B2B]" : "bg-gray-100 text-gray-500"}
          `}
          >
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
            <p className="text-xs text-gray-500">
              Pay when you receive the order
            </p>
          </div>
          {selectedMethod === "COD" && (
            <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-[#FF4B2B]" />
          )}
        </div>

        {/* Online Payment Option */}
        <div
          onClick={() => onSelect("ONLINE")}
          className={`
            relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4
            ${
              selectedMethod === "ONLINE"
                ? "border-[#FF4B2B] bg-orange-50/50"
                : "border-gray-100 hover:border-orange-200 hover:bg-gray-50"
            }
          `}
        >
          <div
            className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${selectedMethod === "ONLINE" ? "bg-[#FF4B2B]/10 text-[#FF4B2B]" : "bg-gray-100 text-gray-500"}
          `}
          >
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Online Payment</h3>
            <p className="text-xs text-gray-500">
              Credit/Debit Card, UPI, NetBanking
            </p>
          </div>
          {selectedMethod === "ONLINE" && (
            <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-[#FF4B2B]" />
          )}
        </div>
      </div>
    </div>
  );
};
