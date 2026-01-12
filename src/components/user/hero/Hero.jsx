import { Search } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-medium">
              🍔 Fast • Fresh • Delicious
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Delicious Food <br />
              Delivered <span className="text-orange-600">To Your Door</span>
            </h1>

            <p className="text-gray-600 text-base md:text-lg max-w-xl">
              Order from your favorite restaurants and enjoy hot, fresh meals
              delivered quickly to your home or office.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex gap-4 pt-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium transition">
                Order Now
              </button>
              <button className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-full font-medium transition">
                View Menu
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE / VISUAL */}
          <div className="relative hidden lg:block">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-60" />
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Delicious Food"
              className="relative rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
