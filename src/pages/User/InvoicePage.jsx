import { Printer, X } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export const InvoicePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Actions Header */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center no-print">
          <h2 className="font-bold">Order Invoice</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="text-white border-white hover:bg-white/10"
            >
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-10" id="invoice-content">
          <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#FF4B2B]">FoodApp</h1>
              <p className="text-gray-500 mt-2">123 Food Street, Flavor Town</p>
              <p className="text-gray-500">support@foodapp.com</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800">INVOICE</h2>
              <p className="text-gray-600 mt-1">#INV-2023-001</p>
              <p className="text-gray-500 text-sm mt-1">Date: Oct 24, 2023</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-2">Bill To:</h3>
            <p className="text-gray-600">Ritik Kumar</p>
            <p className="text-gray-600">123 Main St, Apartment 4B</p>
            <p className="text-gray-600">New Delhi, India</p>
          </div>

          <table className="w-full text-left mb-8">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="py-3 px-4 rounded-l-lg">Item Description</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 rounded-r-lg text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 px-4">Spicy Chicken Pizza</td>
                <td className="py-4 px-4 text-center">1</td>
                <td className="py-4 px-4 text-right">₹350.00</td>
                <td className="py-4 px-4 text-right font-medium">₹350.00</td>
              </tr>
              <tr>
                <td className="py-4 px-4">Coke (500ml)</td>
                <td className="py-4 px-4 text-center">2</td>
                <td className="py-4 px-4 text-right">₹50.00</td>
                <td className="py-4 px-4 text-right font-medium">₹100.00</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹450.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (5%):</span>
                <span>₹22.50</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-100 pt-2">
                <span>Total:</span>
                <span className="text-[#FF4B2B]">₹472.50</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 text-center text-gray-500 text-sm">
            <p>Thank you for ordering with FoodApp!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
