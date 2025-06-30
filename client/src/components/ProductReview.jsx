import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { Trash2Icon } from "lucide-react";

import ProductReviewLike from "./ProductReviewLike";
import useFetch from "../hooks/useFetch";
import { errorHandler, axios } from "../helper";

const ProductReview = () => {
  const { id: productId } = useParams();
  const { data } = useFetch(`/review/${productId}`);
  const [reviews, setReviews] = React.useState([]);
  const [newReview, setNewReview] = useState({ comment: "", rating: 5 });
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
      const res = await axios.delete(`/review/${id}`);
      if (res.data) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const addReviewHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/review`, {
        productId,
        ...newReview,
      });
      if (res.data) {
        setReviews((prev) => [res.data.review, ...prev]);
        setNewReview({ comment: "", rating: 5 });
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const reviewReplyItem = (item) => {
    const addReplyHandler = async (e) => {
      e.preventDefault();

      if (replyText.trim()) {
        if (!userId) return toast.error("Firstly login then write reply");
        try {
          const res = await axios.post(`/review/reply`, {
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
        <form onSubmit={addReplyHandler} className="items-center flex gap-2">
          <input
            className="border w-full border-indigo-300 px-4 py-2 rounded-lg text-sm"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            disabled={!replyText.trim()}
            className="w-fit text-sm btn bg-indigo-600 text-white disabled:opacity-50">
            Reply
          </button>
        </form>
        {/* Display Reply Review */}
        {item?.replies?.length > 0 &&
          item.replies.map((reply, index) => (
            <div
              key={index}
              className="mb-3 flex max-sm:flex-col gap-4 p-4 rounded-lg border border-gray-200">
              <div className="flex gap-2 items-start">
                <p className="px-3 py-1 rounded-full bg-gray-300 text-slate-800">
                  {(reply?.createdBy?.fullName || reply?.fullName)?.slice(0, 1)}
                </p>
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {reply?.createdBy?.fullName || reply?.fullName}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {format(new Date(reply?.createdAt), "dd MMM yyyy, h:mm a")}
                  </span>
                </div>
              </div>
              <p className="flex-1/2">{reply?.comment}</p>
            </div>
          ))}
      </>
    );
  };

  return (
    <div className="mx-auto py-5 max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 uppercase mb-5">
        Comment
      </h2>

      <div className="grid gap-4">
        {/* Review Form */}
        <form onSubmit={addReviewHandler} className="w-full card space-y-2">
          <label htmlFor="public_comment" className="font-medium">
            Public comment
          </label>
          <textarea
            rows={2}
            id="public_comment"
            className="w-full outline-none border border-indigo-300 rounded-lg mt-1 py-2 px-4"
            placeholder="Write your review..."
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
          />

          <button
            disabled={!newReview.comment.trim()}
            className="btn-primary !text-xs disabled:opacity-70">
            Post Comment
          </button>
        </form>

        {/* Review List */}
        {reviews?.map((item) => (
          <div key={item?._id} className="w-full card space-y-4">
            <div className="flex gap-5 max-sm:flex-col relative">
              <div className="flex gap-4 min-w-[200px] relative items-center">
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
                  <p className="font-semibold">{item?.createdBy?.fullName}</p>
                  <p className="text-gray-500 text-xs">
                    {format(new Date(item?.createdAt), "dd MMM yyyy, h:mm a")}
                  </p>
                </div>
              </div>
              <p>{item?.comment}</p>
              {item?.createdBy?._id === userId && (
                <button
                  onClick={() => deleteReviewHandler(item?._id)}
                  className="absolute bg-white top-0 right-0 cursor-pointer svg-btn p-2 text-red-600">
                  <Trash2Icon />
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
