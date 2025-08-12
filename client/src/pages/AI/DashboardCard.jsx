import React from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Heart, Trash2Icon } from 'lucide-react';
import Markdown from 'react-markdown';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { axios, errorHandler } from '../../config';

const DashboardCard = ({ isActive, onActive, item, onDelete }) => {
  const { user } = useSelector((s) => s.auth);
  const [isLiked, setIsLiked] = useState(item?.likes.includes(user._id));
  const [likes, setLikes] = useState(item?.likes?.length);

  const handleLikeToggle = async () => {
    try {
      setIsLiked(!isLiked);
      const res = await axios.post(`/openai/like/${item._id}`);
      if (res.data?.data) {
        setLikes(res.data?.data?.totalLikes);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="card w-full !pt-4 pb-2" key={item?._id}>
      <div className="w-full flex justify-between gap-2 items-center">
        <div className="flex flex-col gap-1">
          <p className={`font-medium ${isActive ? '' : 'line-clamp-1'}`}>
            {item?.prompt}
          </p>
          <div className="text-gray-500 text-xs">
            <span className="lowercase pr-4">#{item?.model}</span>
            {format(new Date(item?.createdAt), 'dd MMM yyyy, h:mm a')}
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLikeToggle}
              className="btn flex gap-2 items-center hover:bg-gray-100 !rounded-full">
              <Heart
                className={`w-4 h-4 text-red-600`}
                fill={isLiked ? ' oklch(57.7% 0.245 27.325)' : '#fff'}
              />
              {likes}
            </button>
            <button
              className="btn text-indigo-600 hover:bg-gray-100 !rounded-full"
              onClick={onDelete}>
              <Trash2Icon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="cursor-pointer" onClick={onActive}>
          {isActive ? (
            <ChevronUp className="min-w-6 min-h-6" />
          ) : (
            <ChevronDown className="min-w-6 min-h-6" />
          )}
        </div>
      </div>
      {isActive && item?.model !== 'text-to-image' && (
        <div className="p-2 w-full text-sm">
          <div className="reset-tw">
            <Markdown>{item?.response}</Markdown>
          </div>
        </div>
      )}

      {isActive && item?.model === 'text-to-image' && (
        <img src={item?.response} alt="model_Pic" className="w-full" />
      )}
    </div>
  );
};

export default DashboardCard;
