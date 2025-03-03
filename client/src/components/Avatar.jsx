import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { baseUrl } from '../helper/constant';

const Avatar = () => {
  const user = useSelector((state) => state.auth.user);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    setAvatar(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUploadAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatar); // 'image' is the name expected by your server

      const res = await axios.patch(baseUrl + '/api/v1/user/update-avatar', formData);
      if (res.data) {
        toast.success('upload avatar image succeed');
        setPreview(null);
        setAvatar(res.data.avatar);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center max-sm:w-full'>
      <div className='w-32 h-32 rounded-full border-4 border-neutral-600/30 overflow-hidden'>
        {preview ? (
          <img
            src={preview}
            alt='Profile'
            className='w-full h-full object-cover transition-opacity duration-300 opacity-100'
            loading='lazy'
          />
        ) : (
          <img
            src={avatar || 'https://avatar.iran.liara.run/public'}
            alt='Profile'
            className='w-full h-full object-cover transition-opacity duration-300 opacity-100'
            loading='lazy'
          />
        )}
      </div>
      {preview ? (
        <div className='flex gap-4'>
          <button
            onClick={handleUploadAvatar}
            className='mt-4 cursor-pointer px-4 py-2 bg-green-700 hover:bg-green-600 transition-colors duration-300 rounded-md text-white text-sm'>
            Submit
          </button>
          <button
            onClick={() => setPreview(null)}
            className='mt-4 cursor-pointer px-4 py-2 bg-red-700 hover:bg-red-600 transition-colors duration-300 rounded-md text-white text-sm'>
            Cancel
          </button>
        </div>
      ) : (
        <label
          htmlFor='avatar'
          className='mt-4 cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-md text-white text-sm'>
          Change Avatar
        </label>
      )}
      <input id='avatar' onChange={handleImageChange} type='file' className=' opacity-0' />
    </div>
  );
};

export default Avatar;
