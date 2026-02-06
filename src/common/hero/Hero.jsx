import { Button } from "../../components/ui/Button";

export const Hero = () => {
  return (
    <section className="relative max-w-7xl mx-auto overflow-hidden pt-32 pb-20 bg-linear-to-br from-orange-50/50 to-white">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-orange-100/30 to-transparent rounded-bl-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <span className="bg-[#FF4B2B]/10 text-[#FF4B2B] px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                New
              </span>
              <span className="text-sm font-medium text-gray-600">
                Fast • Fresh • Delicious
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-[#2D3436]">
              Delicious Food <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF4B2B] to-[#FF416C]">
                Delivered.
              </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              Experience the best culinary delights from top chefs, delivered
              piping hot to your doorstep in minutes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="rounded-full px-8 py-4 text-lg shadow-xl shadow-[#FF4B2B]/25">
                Order Now
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-4 text-lg"
              >
                View Menu
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative hidden lg:block group">
            <div className="relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500">
              <img
                src="/hero-bg.png"
                alt="Delicious Spread"
                className="rounded-[2rem] shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
            {/* Decorative blob */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FF416C]/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF4B2B]/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
