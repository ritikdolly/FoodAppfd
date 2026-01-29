// import { CreditCard, Wallet, Banknote } from "lucide-react";

// export const PaymentMethod = ({ method, setMethod }) => {
//   const methods = [
//     {
//       id: "Razorpay",
//       name: "Online Payment",
//       description: "Credit/Debit Card, UPI, NetBanking",
//       icon: <CreditCard className="w-6 h-6 text-white" />,
//       color: "bg-blue-500",
//     },
//     {
//       id: "COD",
//       name: "Cash on Delivery",
//       description: "Pay with cash upon receipt",
//       icon: <Banknote className="w-6 h-6 text-white" />,
//       color: "bg-green-500",
//     },
//     {
//       id: "UPI",
//       name: "UPI",
//       description: "Google Pay, PhonePe, Paytm",
//       icon: <Wallet className="w-6 h-6 text-white" />,
//       color: "bg-purple-500",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
//       <div className="flex items-center gap-2 mb-4">
//         <CreditCard className="w-5 h-5 text-[#FF4B2B]" />
//         <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
//       </div>

//       <div className="space-y-3">
//         {methods.map((m) => (
//           <div
//             key={m.id}
//             onClick={() => setMethod(m.id)}
//             className={`
//               relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4
//               ${
//                 method === m.id
//                   ? "border-[#FF4B2B] bg-orange-50/50"
//                   : "border-gray-100 hover:border-orange-200 hover:bg-gray-50"
//               }
//             `}
//           >
//             <div
//               className={`w-12 h-12 rounded-full ${m.color} flex items-center justify-center shadow-md`}
//             >
//               {m.icon}
//             </div>

//             <div className="flex-1">
//               <h3 className="font-bold text-gray-900">{m.name}</h3>
//               <p className="text-sm text-gray-500">{m.description}</p>
//             </div>

//             <div
//               className={`
//                 w-5 h-5 rounded-full border-2 flex items-center justify-center
//                 ${
//                   method === m.id
//                     ? "border-[#FF4B2B] bg-[#FF4B2B]"
//                     : "border-gray-300"
//                 }
//               `}
//             >
//               {method === m.id && (
//                 <div className="w-2 h-2 bg-white rounded-full" />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React from 'react'

const PaymentMethod = () => {
  return (
    <div>
        <h2>Payment Method</h2>
    </div>
  )
}

export default PaymentMethod
