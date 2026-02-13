import { useState, useEffect } from "react";
import { User, Mail, Phone, Camera, Save, Edit2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useAuth } from "../../context/AuthContext";
import { getUser, updateUser } from "../../api/user";
import { Loading } from "../../common/Loading";
import toast from "react-hot-toast";

export const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    favorites: [],
    address: [],
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser?.id) {
        try {
          const userData = await getUser(currentUser.id);
          setUser({
            ...userData,
            // Ensure fields are not null for inputs
            bio: userData.bio || "",
            phone: userData.phone || "",
          });
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          toast.error("Failed to load profile");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateUser(user.id, user);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user.id) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#FF4B2B] to-[#FF416C] mb-8">
        My Profile
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="col-span-1 p-6 flex flex-col items-center h-fit">
          <div className="relative w-32 h-32 mb-6">
            <div className="w-full h-full rounded-full bg-orange-100 flex items-center justify-center text-4xl font-bold text-orange-600 border-4 border-white shadow-lg">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            {/* Camera button can be capable of uploading image in future */}
            <button className="absolute bottom-0 right-0 p-2 bg-[#FF4B2B] text-white rounded-full shadow-lg hover:bg-[#ff4b2bce] transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-xl font-bold mb-1 text-center">{user.name}</h2>
          <p className="text-gray-500 text-sm mb-4 capitalize">
            {currentUser?.role?.replace("ROLE_", "").toLowerCase()}
          </p>

          <div className="w-full space-y-2 mt-4">
            <div className="flex justify-between text-sm py-2 border-b">
              <span className="text-gray-500">Favorites</span>
              <span className="font-bold">
                {user.favorites ? user.favorites.length : 0}
              </span>
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
                isEditing
                  ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                  : ""
              }
              disabled={loading}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                </>
              )}
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
                  placeholder="Add phone number"
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
                disabled={true} // Email should generally not be editable directly or needs verification
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400">
                Email cannot be changed directly.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                placeholder="Tell us a bit about yourself..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FF4B2B] focus:ring-2 focus:ring-[#FF4B2B]/20 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 resize-none"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
