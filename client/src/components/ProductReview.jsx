import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import axiosInstance from "../helper/axiosInstance";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { SpinnerBtn } from "../utils";

const tempData = [
  {
    _id: "67eff14dc66410dec0",
    productId: "67b063b6c9bd3905e2a2e8d6",
    userId: {
      _id: "67ee359789dcf847c2b2",
      username: "temp user",
    },
    comment:
      "Data Review is the process of collecting data, reflecting on it, and distilling it into actionable insights. This process is how you can turn data into knowledge and knowledge into action.",
    rating: 4,
    likes: [],
    replies: [],
    reports: [],
    createdAt: "2025-04-04T14:48:45.055Z",
    updatedAt: "2025-04-04T14:48:45.062Z",
    __v: 0,
  },
  {
    _id: "67eff14dc66410dec0432",
    productId: "67b063b6c9bd3905e2a2e8d6",
    userId: {
      _id: "67ee359789dcf847c2b2",
      username: "temp user",
    },
    comment:
      "Creating a regular routine for Data Review helps your program institutionalize a focus on learning This is a two comment on the static",
    rating: 2,
    likes: [],
    replies: [],
    reports: [],
    createdAt: "2025-04-04T14:48:45.055Z",
    updatedAt: "2025-04-04T14:48:45.062Z",
    __v: 0,
  },
];

const ProductReview = () => {
  const { id } = useParams();
  const { data, loading, refetch } = useFetch(`/api/v1/review/${id}`);
  const [reviews, setReviews] = React.useState();
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state?.auth?.user?._id);

  useEffect(() => {
    if (data?.length > 0) {
      setReviews(data);
    } else {
      setReviews(tempData);
    }
  }, [data]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    if (!formObject.comment || !formObject.rating) {
      return toast.error("Please fill all the fields");
    }

    if (!userId) return toast.error("Please login to submit a review");

    try {
      setIsLoading(true);
      const res = await axiosInstance.post(`/api/v1/review`, {
        productId: id,
        ...formObject,
      });
      if (res.data) {
        setReviews(res.data.reviews);
        e.target.reset();
        toast.success("Review submitted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while submitting the review");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800" id="product-review">
        Product Reviews
      </h2>

      {/* Review List */}
      <div className="grid gap-6 sm:grid-cols-2 mb-10">
        {!loading && reviews?.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem key={review._id} {...review} refetch={refetch} />
          ))
        ) : (
          <p className="text-gray-500 col-span-2">No reviews yet.</p>
        )}
      </div>

      {/* Review Form */}
      <form className="" onSubmit={handleReviewSubmit}>
        <p className="text-lg font-medium mb-4 text-gray-900">
          Share your thoughts — leave a review!
        </p>

        {/* Comment */}
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-gray-600 font-semibold mb-2">
            Comment
          </label>
          <textarea
            className="w-full max-w-xl border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            id="comment"
            name="comment"
            rows="3"
            placeholder="Write something about the product..."
          />
        </div>

        {/* Rating */}
        <div className="mb-4 flex items-center gap-4">
          <label htmlFor="rating" className="text-gray-600 font-semibold">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            className="rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} ⭐
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <SpinnerBtn
          className="bg-gray-700 hover:bg-gray-800 transition text-white px-6 py-2 rounded-lg"
          type="submit"
          primaryName="Submit Review"
          loading={isLoading}
        />
      </form>
    </div>
  );
};

export default ProductReview;

const ReviewItem = ({ refetch, ...review }) => {
  const userId = useSelector((state) => state?.auth?.user?._id);

  const handleDeleteReview = async () => {
    const res = await axiosInstance.delete(`/api/v1/review/${review._id}`);
    if (res.data) {
      refetch();
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg" key={review._id}>
      <div className="flex items-center mb-2 relative">
        <img
          src={review?.userId?.avatar || "https://avatar.iran.liara.run/public"}
          alt="User Avatar"
          className="min-w-9 min-h-9 h-9 w-9 rounded-full object-cover mr-3"
        />
        <div>
          <p className="font-semibold capitalize">{review.userId.username}</p>
          <span className="text-yellow-500">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </span>
        </div>
        {review?.userId?._id === userId && (
          <X
            className="absolute top-2 right-2 cursor-pointer svg-btn p-2"
            onClick={handleDeleteReview}
          />
        )}
      </div>
      <p className="text-gray-700 mb-2 line-clamp-4 sm:line-clamp-2">
        {review.comment}
      </p>
      <span className="text-gray-500 text-sm">
        {format(new Date(review.createdAt), "dd MMM yyyy, h:mm a")}
      </span>
    </div>
  );
};
