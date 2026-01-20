import { useState } from "react";
import { User, Mail, Phone, Camera } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

export const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "Ritik",
    email: "ritik@example.com",
    phone: "+91 98765 43210",
    bio: "Food enthusiast and admin",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to API
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#FF4B2B] to-[#FF416C] mb-8">
        My Profile
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="col-span-1 p-6 flex flex-col items-center">
          <div className="relative w-32 h-32 mb-6">
            <div className="w-full h-full rounded-full bg-orange-100 flex items-center justify-center text-4xl font-bold text-orange-600 border-4 border-white shadow-lg">
              {user.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-[#FF4B2B] text-white rounded-full shadow-lg hover:bg-[#ff4b2bce] transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-xl font-bold mb-1">{user.name}</h2>
          <p className="text-gray-500 text-sm mb-4">Silver Member</p>

          <div className="w-full space-y-2 mt-4">
            <div className="flex justify-between text-sm py-2 border-b">
              <span className="text-gray-500">Orders</span>
              <span className="font-bold">24</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b">
              <span className="text-gray-500">Reviews</span>
              <span className="font-bold">12</span>
            </div>
          </div>
        </Card>

        {/* Details Form */}
        <Card className="col-span-2 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Personal Details</h3>
            <Button
              variant="outline"
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={
                isEditing ? "bg-green-50 text-green-600 border-green-200" : ""
              }
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" /> Full Name
                </label>
                <input
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FF4B2B] focus:ring-2 focus:ring-[#FF4B2B]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone Number
                </label>
                <input
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FF4B2B] focus:ring-2 focus:ring-[#FF4B2B]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FF4B2B] focus:ring-2 focus:ring-[#FF4B2B]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FF4B2B] focus:ring-2 focus:ring-[#FF4B2B]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 resize-none"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
