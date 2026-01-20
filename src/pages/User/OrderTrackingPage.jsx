import {
  ArrowLeft,
  CheckCircle,
  Circle,
  MapPin,
  Phone,
  Truck,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export const OrderTrackingPage = () => {
  const navigate = useNavigate();

  const steps = [
    { title: "Order Placed", date: "Oct 24, 12:30 PM", completed: true },
    { title: "Order Confirmed", date: "Oct 24, 12:35 PM", completed: true },
    { title: "Preparing", date: "Oct 24, 12:45 PM", completed: true },
    { title: "Out for Delivery", date: "Oct 24, 01:15 PM", completed: true },
    { title: "Delivered", date: "Oct 24, 01:45 PM", completed: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 pl-0 hover:bg-transparent hover:text-[#FF4B2B]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Orders
        </Button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Order</h1>
              <p className="text-gray-500">Order ID: #12345</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="text-xl font-bold text-[#FF4B2B]">25-35 mins</p>
            </div>
          </div>

          <div className="relative pl-4 border-l-2 border-gray-100 space-y-8 ml-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[25px] w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center
                  ${step.completed ? "border-[#FF4B2B] text-[#FF4B2B]" : "border-gray-300 text-gray-300"}`}
                >
                  {step.completed ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Circle className="w-3 h-3" />
                  )}
                </div>

                <div
                  className={`${step.completed ? "opacity-100" : "opacity-40"}`}
                >
                  <h3 className="font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.date}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gray-50 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Truck className="w-6 h-6 text-[#FF4B2B]" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Delivery Partner</p>
                <p className="text-sm text-gray-500">
                  John Doe • Honda Splendor
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
