export const FooterNewsletter = () => {
  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-6">Newsletter</h3>
      <p className="text-sm text-gray-400 mb-4">
        Subscribe to get special offers, free giveaways, and one-of-a-kind deals.
      </p>

      <form className="space-y-3" onSubmit={e => e.preventDefault()}>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-sm text-white focus:ring-2 focus:ring-orange-500 outline-none"
        />
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition">
          Subscribe
        </button>
      </form>
    </div>
  );
};
