import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axiosInstance from "../helper/axiosInstance";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import { SpinnerBtn, StarSelected, StarRating } from "../utils";
import { format } from "date-fns";
import { X, MessageSquare, ThumbsUp } from "lucide-react";

const ProductReview = () => {
  const { id: productId } = useParams();
  const { data, refetch } = useFetch(`/review/${productId}`);
  const [reviews, setReviews] = React.useState();

  const [newReview, setNewReview] = useState({ comment: "", rating: 0 });
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const userId = useSelector((state) => state?.auth?.user?._id);

  useEffect(() => {
    if (data?.length > 0) {
      setReviews(data);
    }
  }, [data]);

  const handleDeleteReview = async (id) => {
    const res = await axiosInstance.delete(`/review/${id}`);
    if (res.data) {
      refetch();
    }
  };

  const addReplyHandler = async (id) => {
    if (replyText.trim()) {
      const res = await axiosInstance.post(`/review/reply`, {
        reviewId: id,
        comment: replyText,
      });
      if (res?.data) {
        setReviews(
          reviews.map((r) =>
            r._id == id
              ? {
                  ...r,
                  replies: [
                    ...r.replies,
                    {
                      username: "You",
                      comment: replyText,
                      createdAt: Date.now(),
                    },
                  ],
                }
              : r
          )
        );
        setReplyText("");
      }
    }
  };

  const addReviewHandler = async () => {
    if (!userId) return toast.error("Please login to submit a review");
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      return toast.error("Please fill all the fields");
    }
    try {
      const res = await axiosInstance.post(`/review`, {
        productId,
        ...newReview,
      });
      if (res.data) {
        setReviews(res.data.reviews);
        setNewReview({ comment: "", rating: 0 });
        toast.success("Review submitted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while submitting the review");
    }
  };

  return (
    <div className=" max-w-3xl mx-auto px-2 py-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800" id="product-review">
        Product Reviews
      </h2>

      {/* Review Form */}
      <div className="mb-4 flex flex-col">
        <textarea
          className="border p-2 rounded-lg outline-none"
          placeholder="Write your review..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
        />

        <div className="flex items-center gap-2 mt-2">
          <p>choose star:</p>
          <StarSelected
            defaultRating={newReview.rating}
            onChange={(val) => setNewReview({ ...newReview, rating: val })}
          />
        </div>

        <button
          disabled={!newReview.comment.trim() || newReview.rating === 0}
          onClick={addReviewHandler}
          className="mt-2 w-fit text-sm btn bg-gray-900 text-white disabled:opacity-50">
          Post Review
        </button>
      </div>

      {/* Review List */}
      {reviews?.map((item) => (
        <div
          key={item?._id}
          className="bg-white w-full p-4 rounded-lg shadow-sm mb-5">
          <div className="flex relative items-center mb-4">
            <img
              src={
                item?.userId?.avatar || "https://avatar.iran.liara.run/public"
              }
              alt="Customer"
              className="w-10 h-10 rounded-full object-cover transition-opacity duration-300 opacity-100"
              loading="lazy"
            />
            <div className="ml-4">
              <h4 className="font-semibold">{item.userId.username}</h4>
              <StarRating rating={item?.rating} />
            </div>
            {item?.userId?._id === userId && (
              <X
                className="absolute top-2 right-2 cursor-pointer svg-btn p-2"
                onClick={() => handleDeleteReview(item?._id)}
              />
            )}
          </div>
          <p>{item?.comment}</p>
          <p className="text-gray-500 text-xs mt-2">
            {format(new Date(item?.createdAt), "dd MMM yyyy, h:mm a")}
          </p>

          {/* like and reply button */}
          <div className="flex items-center space-x-4 mt-2">
            <ReviewLike reviewId={item?._id} likes={item?.likes} />
            <button
              className="svg-btn !w-fit px-4 !py-1 bg-gray-200 text-xs"
              onClick={() =>
                setReplyingTo(replyingTo === item._id ? null : item._id)
              }>
              <MessageSquare className="h-4 w-4 mr-1" />
              {item.replies?.length ? item.replies?.length : "replay"}
            </button>
          </div>

          {/* create review replay */}
          {replyingTo === item._id && (
            <div className="items-center flex gap-2 mt-2">
              <input
                className="border px-4 py-2 outline-none rounded-lg text-sm"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                disabled={!replyText.trim()}
                onClick={() => addReplyHandler(item._id)}
                className="w-fit text-sm btn bg-gray-900 text-white disabled:opacity-50">
                Reply
              </button>
            </div>
          )}

          {/* display review replay */}
          {item?.replies?.length > 0 && replyingTo === item?._id && (
            <div className="mt-2 space-y-2">
              {item?.replies?.map((reply, index) => (
                <div
                  key={index}
                  className="text-sm flex gap-2 px-2 rounded-lg py-1 bg-gray-100">
                  <p className="flex flex-col">
                    <span className="font-semibold">
                      {reply?.userId?.username || reply?.username}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {format(new Date(reply?.createdAt), "dd MMM, h:mm a")}
                    </span>
                  </p>
                  <p className="flex-1/2">{reply?.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductReview;

const ReviewLike = ({ reviewId, likes }) => {
  const userId = useSelector((state) => state?.auth?.user?._id);
  const [like, setLike] = useState(userId ? likes?.includes(userId) : false);
  const [totalLike, setTotalLike] = useState(likes?.length);

  const handleLike = async () => {
    const res = await axiosInstance.patch(`/review/like`, { reviewId });
    if (res.data) {
      setLike(!like);
      console.log(res);
      setTotalLike(res.data.likes);
    }
  };

  return (
    reviewId && (
      <button
        onClick={handleLike}
        className={`svg-btn !w-fit px-4 !py-1 bg-gray-200 text-xs ${like && "!bg-blue-600"}`}>
        <ThumbsUp className="h-4 w-4 mr-1" /> {totalLike}
      </button>
    )
  );
};
