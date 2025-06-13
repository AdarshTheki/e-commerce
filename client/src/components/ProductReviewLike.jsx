import React, { useState } from "react";
import { useSelector } from "react-redux";
import { errorHandler, axios } from "../helper";
import { MessageSquare, ThumbsUp } from "lucide-react";

const ProductReviewLike = ({ reviewId, likes, replies, openReply }) => {
  const userId = useSelector((state) => state?.auth?.user?._id);
  const [like, setLike] = useState(userId ? likes?.includes(userId) : false);
  const [totalLike, setTotalLike] = useState(likes?.length);

  const handleLike = async () => {
    try {
      const res = await axios.patch(`/review/like`, { reviewId });
      if (res.data) {
        setLike(!like);
        console.log(res.data);
        setTotalLike(res.data.likes);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={handleLike}
        className={`svg-btn text-xs flex gap-1 !w-16 ${like && "bg-indigo-200"}`}>
        <ThumbsUp size={16} /> {totalLike}
      </button>
      <button onClick={openReply} className="svg-btn text-xs flex gap-1 !w-16">
        <MessageSquare size={16} />
        {replies}
      </button>
    </div>
  );
};

export default ProductReviewLike;
