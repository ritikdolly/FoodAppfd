export const PaymentMethod = ({ method, setMethod }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-semibold">Payment Method</h2>

      {["COD", "UPI", "Card"].map((m) => (
        <label
          key={m}
          className="flex items-center gap-3 cursor-pointer"
        >
          <input
            type="radio"
            name="payment"
            value={m}
            checked={method === m}
            onChange={() => setMethod(m)}
          />
          <span>{m}</span>
        </label>
      ))}
    </div>
  );
};
