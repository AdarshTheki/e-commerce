import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../helper/constant";
import errorHandler from "../helper/errorHandler";

const HeartFavorite = ({ id, className }) => {
  const router = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(!!user?.favorite.includes(id));

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!user?._id) {
        router("/login");
        return;
      } else {
        const res = await axios.patch(`${baseUrl}/api/v1/user/favorite/${id}`);
        if (res.data) {
          const check = res.data.favorites.includes(id);
          setIsLiked(check);
          toast.success(
            `${check ? "👍 Added to favorites" : "👎 removed to favorites"}`
          );
        }
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} className={`${className}`} title="favorite">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full border-t-2 border-blue-1 border-solid h-5 w-5"></div>
        </div>
      ) : (
        <Heart fill={`${isLiked ? "red" : "#ff01"}`} stroke="red" />
      )}
    </button>
  );
};

export default HeartFavorite;
