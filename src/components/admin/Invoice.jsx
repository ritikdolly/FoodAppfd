import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderInvoice } from "../../api/orders";
import "./invoice.css";

export const Invoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    try {
      const data = await getOrderInvoice(id);
      setInvoice(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading)
    return <div className="p-10 text-center">Loading Invoice...</div>;
  if (!invoice)
    return (
      <div className="p-10 text-center text-red-500">Invoice not found</div>
    );

  return (
    <div className="invoice-page">
      <button onClick={handlePrint} className="print-btn no-print">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        Print Invoice
      </button>

      <div className="invoice-container">
        <div className="invoice-header">
          <div className="restaurant-info">
            <h2>My Food App</h2>
            <p>123 Delicious Street</p>
            <p>Foodie City, FC 12345</p>
          </div>
          <div className="invoice-details">
            <h1>INVOICE</h1>
            <p>
              <strong>Order ID:</strong> #
              {invoice.orderId ? invoice.orderId.substring(0, 8) : "N/A"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {invoice.orderDate
                ? new Date(invoice.orderDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {invoice.status}
            </p>
          </div>
        </div>

        <div className="customer-info">
          <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>Bill To:</h3>
          <p style={{ fontWeight: "600" }}>{invoice.customerName}</p>
          {invoice.customerPhone && <p>Phone: {invoice.customerPhone}</p>}
          {invoice.shippingAddress && (
            <p>
              {invoice.shippingAddress.street}, {invoice.shippingAddress.city},{" "}
              {invoice.shippingAddress.state} - {invoice.shippingAddress.pin}
            </p>
          )}
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th style={{ textAlign: "right" }}>Unit Price</th>
              <th style={{ textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items &&
              invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td style={{ textAlign: "right" }}>₹{item.unitPrice}</td>
                  <td style={{ textAlign: "right" }}>₹{item.totalPrice}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="invoice-summary">
          <div className="summary-box">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{invoice.subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>
                {invoice.deliveryFee === 0 ? (
                  <span style={{ color: "green" }}>Free</span>
                ) : (
                  `₹${invoice.deliveryFee}`
                )}
              </span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>₹{invoice.tax}</span>
            </div>
            <div className="summary-row total">
              <span>Grand Total:</span>
              <span>₹{invoice.grandTotal}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "50px",
            textAlign: "center",
            color: "#9ca3af",
            fontSize: "0.9em",
          }}
        >
          <p>Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};
