import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../helper/axiosInstance";
import { toast } from "react-toastify";
import { MessageSquare, ThumbsUp } from "lucide-react";

const ProductReviewLike = ({ reviewId, likes, replies, openReply }) => {
  const userId = useSelector((state) => state?.auth?.user?._id);
  const [like, setLike] = useState(userId ? likes?.includes(userId) : false);
  const [totalLike, setTotalLike] = useState(likes?.length);

  const handleLike = async () => {
    try {
      const res = await axiosInstance.patch(`/review/like`, { reviewId });
      if (res.data) {
        setLike((prev) => !prev);
        setTotalLike(res.data.likes);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={handleLike}
        className={`svg-btn text-xs flex gap-1 !w-16`}>
        <ThumbsUp size={16} color={like ? "#4F46E5" : "#111"} /> {totalLike}
      </button>
      <button onClick={openReply} className="svg-btn text-xs flex gap-1 !w-16">
        <MessageSquare size={16} />
        {replies}
      </button>
    </div>
  );
};

export default ProductReviewLike;
