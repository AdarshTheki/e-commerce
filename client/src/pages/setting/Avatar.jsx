import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../helper/constant";

const Avatar = () => {
  const user = useSelector((state) => state.auth.user);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    setAvatar(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUploadAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar); // 'image' is the name expected by your server

      const res = await axios.patch(
        baseUrl + "/api/v1/user/update-avatar",
        formData
      );
      if (res.data) {
        toast.success("upload avatar image succeed");
        setPreview(null);
        setAvatar(res.data.avatar);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center gap-5 justify-center p-4 border border-gray-200 rounded-lg my-5">
      <div className="w-32 h-32 rounded-full border-4 border-neutral-600/30 overflow-hidden">
        <img
          src={avatar || "https://avatar.iran.liara.run/public"}
          alt="Profile"
          className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
          loading="lazy"
        />
      </div>

      <label className="mt-4 flex flex-col gap-4 cursor-pointer px-4 py-2 rounded-md">
        <small>JPG, GIF and PNG Max Size of 2MB</small>
        <input
          onChange={handleImageChange}
          type="file"
          name="images"
          className="w-[180px] p-2 cursor-pointer hover:bg-indigo-200 border border-gray-300 rounded-lg text-sm"
        />
      </label>
    </div>
  );
};

export default Avatar;
