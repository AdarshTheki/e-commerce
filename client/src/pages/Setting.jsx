import { useEffect, useState } from "react";
import { User, Lock, LogOut, ListOrdered, PackageSearch } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import { Loading } from "../utils";
import { NavLink } from "react-router-dom";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "password":
        return <PasswordTab />;
      case "logout":
        return <LogoutTab />;
      case "order":
        return <Orders />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="w-full md:w-1/4 bg-gray-50 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${activeTab === "profile" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
                <User className="mr-3" size={20} />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${activeTab === "password" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
                <Lock className="mr-3" size={20} />
                Password
              </button>
              <button
                onClick={() => setActiveTab("logout")}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${activeTab === "logout" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
                <LogOut className="mr-3" size={20} />
                Logout
              </button>
              <button
                onClick={() => setActiveTab("order")}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${activeTab === "order" ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
                <ListOrdered className="mr-3" size={20} />
                Order
              </button>
            </nav>
          </div>
          <div className="w-full md:w-3/4 p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

const ProfileTab = () => {
  const {
    user,
    handleUpdateProfile,
    handleUploadAvatar,
    fullNameAndEmailLoading,
    avatarLoading,
  } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");

  const onProfileSubmit = (e) => {
    e.preventDefault();
    handleUpdateProfile(email, fullName);
  };

  const onAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadAvatar(e.target.files[0]);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Profile Information
      </h3>
      <div className="flex items-center mb-6">
        <img
          src={user?.avatar || "https://avatar.iran.liara.run/public"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover mr-6"
        />
        <div>
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
            {avatarLoading ? "Uploading..." : "Change Avatar"}
          </label>
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            onChange={onAvatarChange}
            accept="image/*"
          />
        </div>
      </div>
      <form onSubmit={onProfileSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={fullNameAndEmailLoading}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
          {fullNameAndEmailLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

const PasswordTab = () => {
  const { handleChangePassword, passwordLoading } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onPasswordSubmit = (e) => {
    e.preventDefault();
    handleChangePassword(oldPassword, newPassword);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-6">Change Password</h3>
      <form onSubmit={onPasswordSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={passwordLoading}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
          {passwordLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

const LogoutTab = () => {
  const { handleLogout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-6">Logout</h3>
      <p className="text-gray-600 mb-4">
        Are you sure you want to log out of your account?
      </p>
      <button
        onClick={() => setShowModal(true)}
        className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
        Logout
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl">
            <h4 className="text-lg font-bold mb-4">Confirm Logout</h4>
            <p className="text-gray-600 mb-6">
              You will be returned to the login page.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Orders = () => {
  const { data, loading, callApi } = useApi();

  useEffect(() => {
    callApi("/order/user", {}, "get");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  if (!data || data?.length === 0) return <OrderEmpty />;

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-6">Order Listing</h1>
      {data?.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

const OrderEmpty = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="p-8 max-w-md text-center">
        <PackageSearch className="w-20 h-20 text-gray-400 mb-4 mx-auto" />
        <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
        <p className="text-gray-600 mb-6">
          You haven’t placed any orders. Start shopping to place your first
          order.
        </p>
        <NavLink
          to="/"
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition">
          Shop Now
        </NavLink>
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => {
  const orderStatusMessages = {
    pending:
      "Your order has been placed successfully and is pending confirmation.",
    shipped: "Good news! Your order has been shipped and is on its way.",
    delivered:
      "Your order has been delivered. We hope you enjoy your purchase!",
    cancelled:
      "Your order has been cancelled. If this was a mistake, please contact support.",
  };

  return (
    <div className="border-b border-gray-300 pb-3 mb-6">
      <h2 className="text-xl font-semibold my-2">Order ID: {order._id}</h2>
      <div className="mb-2">
        <strong>Status:</strong>{" "}
        <span className="capitalize">{orderStatusMessages[order?.status]}</span>
      </div>

      <div className="mb-2">
        <strong>Payment:</strong> {order.payment.method} -{" "}
        {order.payment.status}
      </div>

      <div className="mb-2">
        <strong>Customer:</strong> {order.shipping_address.name} (
        {order.shipping_address.email})
      </div>

      <div className="mb-2">
        <strong>Shipping:</strong>
        <div className="text-sm ml-2">
          {order.shipping_address.line1}, {order.shipping_address.line2},<br />
          {order.shipping_address.city} - {order.shipping_address.postal_code},{" "}
          {order.shipping_address.state}, {order.shipping_address.country}
        </div>
      </div>

      <div className="mt-2">
        <strong>Items:</strong>
        <ul className="ml-4 list-disc">
          {order.items.map((item, index) => (
            <li key={index} className="flex gap-3 items-center mt-2">
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="w-12 h-12 object-contain"
              />
              <div>
                <p>{item.product.title}</p>
                <p>Qty: {item.quantity}</p>
                <p>${item.product.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
