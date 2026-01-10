export const TypeFilter = ({ types, activeType, onChange }) => {
  return (
    <div className="flex gap-3 flex-wrap mb-6 mt-5">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border
            ${activeType === type
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-white text-gray-600 hover:bg-orange-50"
            }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};
