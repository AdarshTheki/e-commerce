import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { ArrowRightIcon, TrashIcon } from "lucide-react";

import ProductReviewLike from "./ProductReviewLike";
import axiosInstance from "../helper/axiosInstance";
import { StarSelected, StarRating } from "../utils";
import useFetch from "../hooks/useFetch";
import errorHandler from "../helper/errorHandler";

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

  const deleteReviewHandler = async (id) => {
    try {
      const res = await axiosInstance.delete(`/review/${id}`);
      if (res.data) {
        refetch();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const addReviewHandler = async () => {
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
      errorHandler(error);
    }
  };

  const reviewReplyItem = useCallback(
    (item) => {
      const addReplyHandler = async () => {
        if (replyText.trim()) {
          if (!userId) return toast.error("Firstly login then write reply");
          try {
            const res = await axiosInstance.post(`/review/reply`, {
              reviewId: item._id,
              comment: replyText,
            });
            if (res?.data) {
              setReviews(
                reviews.map((r) =>
                  r._id == item._id
                    ? {
                        ...r,
                        replies: [
                          ...r.replies,
                          {
                            fullName: "You",
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
          } catch (error) {
            errorHandler(error);
          }
        }
      };

      if (replyingTo !== item._id) return null;

      return (
        <>
          {/* Create Reply Review */}
          <div className="items-center flex gap-2">
            <input
              className="border w-full border-indigo-300 px-4 py-2 rounded-lg text-sm"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              disabled={!replyText.trim()}
              onClick={() => addReplyHandler(item._id)}
              className="w-fit text-sm btn bg-indigo-600 text-white disabled:opacity-50">
              Reply
            </button>
          </div>
          {/* Display Reply Review */}
          {item?.replies?.length > 0 &&
            item.replies.map((reply, index) => (
              <div
                key={index}
                className="text-sm mb-3 flex gap-4 p-4 rounded-lg border border-gray-200">
                <p className="flex flex-col">
                  <span className="font-semibold text-right">
                    {reply?.createdBy?.fullName || reply?.fullName}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {format(new Date(reply?.createdAt), "dd MMM, h:mm a")}
                  </span>
                </p>
                <p className="flex-1/2">{reply?.comment}</p>
              </div>
            ))}
        </>
      );
    },
    [replyText, replyingTo, reviews, userId]
  );

  return (
    <div className="mx-auto py-5 max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 uppercase mb-5">
        Comment
      </h2>

      <div className="grid gap-4">
        {/* Review Form */}
        <div className="w-full card">
          <textarea
            rows={4}
            className="w-full outline-none p-2"
            placeholder="Write your review..."
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
          />
          <div className="flex items-center w-full justify-between">
            <StarSelected
              defaultRating={newReview.rating}
              onChange={(val) => setNewReview({ ...newReview, rating: val })}
            />

            <button
              disabled={!newReview.comment.trim() || newReview.rating === 0}
              onClick={addReviewHandler}
              className="btn-primary flex gap-1 items-center disabled:opacity-50">
              Add <ArrowRightIcon />
            </button>
          </div>
        </div>

        {/* Review List */}
        {reviews?.map((item) => (
          <div key={item?._id} className="w-full card space-y-4">
            <div className="flex gap-5 max-sm:flex-col relative">
              <div className="flex gap-4 relative items-center">
                <img
                  src={
                    item?.createdBy?.avatar ||
                    "https://avatar.iran.liara.run/public"
                  }
                  alt="Customer"
                  className="w-10 h-10 rounded-full object-cover transition-opacity duration-300 opacity-100"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold">{item?.createdBy?.fullName}</h4>
                  <StarRating rating={item?.rating} />
                </div>
              </div>
              <div className="space-y-2">
                <p>{item?.comment}</p>
                <p className="text-gray-500 text-xs">
                  {format(new Date(item?.createdAt), "dd MMM yyyy, h:mm a")}
                </p>
              </div>
              {item?.createdBy?._id === userId && (
                <button
                  onClick={() => deleteReviewHandler(item?._id)}
                  className="absolute top-2 right-2 cursor-pointer svg-btn p-2 text-red-600">
                  <TrashIcon />
                </button>
              )}
            </div>

            {/* like and reply button */}
            <ProductReviewLike
              reviewId={item?._id}
              likes={item?.likes}
              replies={item?.replies?.length}
              openReply={() =>
                setReplyingTo(replyingTo === item._id ? null : item._id)
              }
            />

            {/* create review replay */}
            {reviewReplyItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
