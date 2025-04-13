import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../helper/axiosInstance";

const Avatar = () => {
  const user = useSelector((state) => state.auth.user);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadAvatar = async (e) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", e.target.files[0]); // 'image' is the name expected by your server

      const res = await axiosInstance.patch(
        "/api/v1/user/update-avatar",
        formData
      );

      if (res.data) {
        toast.success("upload avatar image succeed");
        setAvatar(res.data.avatar);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center sm:gap-5 gap-2 justify-center mt-6 p-4 bg-white shadow-md rounded-lg">
      <div className="w-32 relative h-32 rounded-full border-4 border-neutral-600/30 overflow-hidden">
        {loading && (
          <span className=" absolute inset-0 flex items-center justify-center bg-neutral-600/70">
            <svg
              className="animate-spin h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        {avatar ? (
          <img
            src={avatar}
            alt="Profile"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <img
            src={user?.avatar || "https://avatar.iran.liara.run/public"}
            alt="Profile"
            className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
            loading="lazy"
          />
        )}
      </div>

      <label className="mt-4 flex flex-col gap-4 cursor-pointer px-4 py-2 rounded-md">
        <small>JPG, GIF and PNG Max Size of 2MB</small>
        <input
          onChange={handleUploadAvatar}
          type="file"
          name="images"
          className="w-[180px] p-2 cursor-pointer hover:bg-indigo-200 border border-gray-300 rounded-lg text-sm"
        />
      </label>
    </div>
  );
};

export default Avatar;
