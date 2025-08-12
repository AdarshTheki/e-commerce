import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User, Lock, LogOut, ListOrdered, PackageSearch } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useApi from '../hooks/useApi';
import { ForgotPassword } from '../components';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const { data, callApi } = useApi();

  useEffect(() => {
    callApi('/order/user', {}, 'get');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'password':
        return <PasswordTab />;
      case 'logout':
        return <LogoutTab />;
      case 'orders':
        return <OrdersTab orders={data || []} />;
      default:
        return null;
    }
  };

  const navList = [
    { name: 'profile', icon: <User size={18} /> },
    { name: 'password', icon: <Lock size={18} /> },
    { name: 'orders', icon: <ListOrdered size={18} /> },
    { name: 'logout', icon: <LogOut size={18} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto lg:p-8">
      <div className="bg-white shadow-lg overflow-hidden rounded-lg">
        <div className="md:flex">
          <div className="w-full md:w-1/4 bg-gray-50 p-6">
            <nav className="space-y-4">
              {navList.map((li) => (
                <button
                  key={li.name}
                  onClick={() => setActiveTab(li.name)}
                  className={`w-full flex gap-2 capitalize items-center p-2 px-4 font-medium text-left rounded-lg transition-colors duration-200 ${activeTab === li.name ? 'bg-indigo-600 text-white' : 'text-gray-00 hover:bg-gray-200'}`}>
                  {li.icon}
                  {li.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="w-full md:w-3/4 p-6 min-h-[80vh]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

const PasswordTab = () => {
  return (
    <div className="max-w-sm mx-auto">
      <ForgotPassword />
    </div>
  );
};

const ProfileTab = () => {
  const {
    user,
    handleUpdateProfile,
    handleUploadAvatar,
    handleResendVerifyUser,
    avatarLoading,
  } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phoneNumber?.split('-')[1] || '');

  const onAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadAvatar(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-sm mx-auto space-y-6">
      <h3 className="text-xl font-bold text-gray-800 text-center">
        Profile Information
      </h3>
      <div className="flex items-center flex-col">
        <img
          src={user?.avatar || 'https://avatar.iran.liara.run/public'}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <div>
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer w-80 text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
            {avatarLoading ? 'Uploading...' : 'Change Avatar'}
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
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700">
          Username / Full Name
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5"
          />
          <button
            onClick={() => handleUpdateProfile(fullName, '+91-' + phone)}
            disabled={user?.fullName === fullName}
            className="bg-indigo-600 rounded-lg text-sm block text-nowrap text-white w-40 text-center py-1.5 hover:bg-indigo-700 disabled:bg-indigo-300 transition">
            Save Change
          </button>
        </div>
      </div>
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            id="phoneNumber"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5"
          />
          <button
            onClick={() => handleUpdateProfile(fullName, '+91-' + phone)}
            disabled={user?.phoneNumber?.split('-')[1] == phone}
            className="bg-indigo-600 rounded-lg text-sm block text-nowrap text-white w-40 text-center py-1.5 hover:bg-indigo-700 disabled:bg-indigo-300 transition">
            Save Change
          </button>
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="flex gap-2">
          <input
            readOnly
            type="email"
            id="email"
            value={user?.email}
            className="border border-gray-300 cursor-not-allowed rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full px-4 py-1.5"
          />
          <button
            onClick={handleResendVerifyUser}
            disabled={user?.isEmailVerified}
            className="bg-indigo-600 rounded-lg block text-sm text-nowrap text-white w-40 py-1.5 hover:bg-indigo-700 disabled:bg-indigo-300 transition">
            {user?.isEmailVerified ? 'verified' : 'Verify'} Email
          </button>
        </div>
      </div>
    </div>
  );
};

const LogoutTab = () => {
  const { handleLogout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-sm mx-auto">
      <h3 className="text-xl text-center font-bold text-gray-800 mb-6">
        Logout
      </h3>
      <p className="text-gray-600 mb-4">
        Are you sure you want to log out of your account?
      </p>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200">
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

const OrdersTab = ({ orders = [] }) => {
  const orderStatusMessages = {
    pending:
      'Your order has been placed successfully and is pending confirmation.',
    shipped: 'Good news! Your order has been shipped and is on its way.',
    delivered:
      'Your order has been delivered. We hope you enjoy your purchase!',
    cancelled:
      'Your order has been cancelled. If this was a mistake, please contact support.',
  };

  return (
    <div className="container mx-auto">
      {!orders?.length && (
        <div className="flex items-center justify-center max-w-sm mx-auto">
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
      )}
      {orders?.map((order) => (
        <div key={order._id} className="border-b border-gray-300 pb-3 mb-6">
          <h2 className="text-xl font-semibold my-2">Id: {order._id}</h2>
          <div className="mb-2">
            <strong>Status:</strong>{' '}
            <span className="capitalize">
              {orderStatusMessages[order?.status]}
            </span>
          </div>

          <div className="mb-2">
            <strong>Payment:</strong> {order.payment.method} -{' '}
            {order.payment.status}
          </div>

          <div className="mb-2">
            <strong>Customer:</strong> {order.shipping_address.name} (
            {order.shipping_address.email})
          </div>

          <div className="mb-2">
            <strong>Shipping:</strong>
            <div className="text-sm ml-2">
              {order.shipping_address.line1}, {order.shipping_address.line2},
              <br />
              {order.shipping_address.city} -{' '}
              {order.shipping_address.postal_code},{' '}
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
      ))}
    </div>
  );
};
