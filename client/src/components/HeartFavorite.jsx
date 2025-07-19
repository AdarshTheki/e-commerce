import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { errorHandler, axios } from "../helper";

const HeartFavorite = ({ id, className }) => {
  const router = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(!!user?.favorite.includes(id));

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!user?._id) return router("/login");

      const res = await axios.patch(`/user/favorite/${id}`);
      if (res.data) {
        const check = res.data?.data?.favorites.includes(id);
        setIsLiked(check);
        toast.success(`${check ? "Add Liked" : "Remove Liked"}`);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`${className} !bg-transparent`}
      title="favorite">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full border-t-2 border-blue-1 border-solid h-5 w-5"></div>
        </div>
      ) : (
        <Heart
          fill={`${isLiked ? "red" : "#ff01"}`}
          stroke="red"
          className="h-5 w-5"
        />
      )}
    </button>
  );
};

export default HeartFavorite;
