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
  const [isLoading, seIsLoading] = useState(false);

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
      return;
    }

    try {
      seIsLoading(true);
      const res = await axiosInstance.post(`/api/v1/review`, {
        productId: id,
        ...formObject,
      });
      if (res.data) {
        setReviews(res.data.reviews);
        e.target.reset();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while submitting the review"
      );
    } finally {
      seIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-5" id="product-review">
        Product Reviews
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {!loading &&
          reviews?.length > 0 &&
          reviews?.map((review) => (
            <ReviewItem key={review._id} {...review} refetch={refetch} />
          ))}
      </div>

      <form
        className="p-4 bg-white shadow-md rounded-lg mt-4"
        onSubmit={handleReviewSubmit}>
        <p className="font-medium mb-4">
          You are looking to structure reviews with rating, mood, and comments
        </p>
        <div>
          <label htmlFor="comment" className="block cursor-pointer">
            Comment:
          </label>
          <textarea
            className="border max-w-sm w-full border-gray-400 p-4 rounded-lg"
            id="comment"
            name="comment"
            rows="2"></textarea>
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            name="rating"
            className="w-18 ml-5 rounded-lg border border-gray-400 text-center py-1 cursor-pointer">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <SpinnerBtn
          className="bg-gray-600 mt-5 text-white"
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
