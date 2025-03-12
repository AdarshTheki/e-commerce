import { toast } from "react-toastify";
import instance from "../helper/axiosInstance";

const Preference = () => {
  const logoutHandler = async () => {
    try {
      const res = await instance.post("/api/v1/user/logout");
      if (res.data) {
        toast.success("user logout success", { toastId: "logout-success" });
        setTimeout(() => {
          localStorage.setItem("token", null);
          window.location.href = "/";
        }, 3000);
      }
    } catch (error) {
      toast.error(error.response.data.message, { toastId: "logout-error" });
    }
  };

  return (
    <div className="space-y-4 pt-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-gray-700 font-medium">Email Notifications</h4>
          <p className="text-neutral-600 text-sm">
            Receive emails about your account activity
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-gray-700 font-medium">Order Updates</h4>
          <p className="text-neutral-600 text-sm">
            Get updates about your order status
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-gray-700 font-medium">Marketing Preferences</h4>
          <p className="text-gray-600 text-sm">
            Receive marketing emails and promotions
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>
      <button
        className="p-2 bg-red-600 text-white hover:opacity-85 px-4 rounded-lg"
        onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Preference;
