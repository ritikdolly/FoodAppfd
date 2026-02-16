import { Search, Bell, LogOut, Menu } from "lucide-react";
import { WEBSITE_NAME, WEBSITE_SHORT_NAME } from "../../../constants";
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import toast from "react-hot-toast";

export const AdminHeader = ({ onMenuClick }) => {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const stompClientRef = useRef(null);

  useEffect(() => {
    // Connect to WebSocket
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    const onConnect = (frame) => {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/admin-notifications", (notification) => {
        const newNotification = JSON.parse(notification.body);
        setNotifications((prev) => [newNotification, ...prev]);
        toast.success("New Order Received!");
      });
    };

    const onError = (error) => {
      console.error("Error connecting to WebSocket", error);
    };

    stompClient.connect({}, onConnect, onError);

    // Fetch initial unread notifications
    fetchUnreadNotifications();

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, []);

  const fetchUnreadNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/notifications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        },
      );
      setNotifications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      // Optimistic update
      setNotifications((prev) => prev.filter((n) => n.id !== id));

      await axios.put(
        `http://localhost:8080/api/admin/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        },
      );
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200/50 px-4 md:px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="hidden sm:block text-2xl font-bold tracking-tight text-[#f00] bold ">
            {WEBSITE_NAME}
          </h1>
          <h1 className="sm:hidden text-xl font-bold text-[#FF4B2B]">
            {WEBSITE_SHORT_NAME}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">Notifications</h3>
                <span className="text-xs text-gray-500">
                  {notifications.length} Unread
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-gray-500 text-sm">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                    >
                      <p className="text-sm font-medium text-gray-800">
                        {notification.message}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {new Date(
                            notification.createdAt,
                          ).toLocaleTimeString()}
                        </span>
                        <span className="text-xs font-semibold text-[#FF4B2B]">
                          ₹{notification.totalAmount}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-gray-200"></div>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors group"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Logout
        </button>
      </div>
    </header>
  );
};
