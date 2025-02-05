import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

import { Input, Select, SpinnerBtn, Textarea } from '../utils';
import { toast } from 'react-toastify';

const ProductForm = ({ data }: { data?: ProductType }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(data?.images.length ? data.images : []);
  const [thumbnail, setThumbnail] = useState<string | null>(data?.thumbnail || '');
  const [preview, setPreview] = useState<File | null>();

  const [formData, setFormData] = useState({
    title: data?.title || '',
    category: data?.category || '',
    brand: data?.brand || '',
    discount: data?.discount || 0,
    price: data?.price || 0,
    rating: data?.rating || 0,
    stock: data?.stock || 0,
  });
  const [description, setDescription] = useState(data?.description || '');
  const [status, setStatus] = useState(data?.status === 'active' ? 'active' : 'inactive');

  interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleImageChange = (event: ImageChangeEvent) => {
    const files = event.target.files as FileList;
    setImages(Array.from(files));
    setPreviews(Array.from(files).map((file: File) => URL.createObjectURL(file)));
  };

  const removeImage = (id: number) => {
    setPreviews(previews.filter((_, index) => index !== id));
    setImages(images.filter((_, index) => index !== id));
  };

  const handleThumbnailChange = (event: ImageChangeEvent) => {
    const file = event.target.files[0];
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value.replace(/[^a-zA-Z0-9\s]|\s{2,}/g, ''));
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!thumbnail) return toast.error('please select product thumbnail');
    if (!images.length) return toast.error('please select product gallery images');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <h3 className='text-xl font-semibold p-2'>
        {data?._id ? 'Update Product' : 'Add New Product'}
      </h3>
      <form onSubmit={handelSubmit} className='bg-white p-2 sm:p-6 rounded-lg'>
        <div className='space-y-4'>
          <Input
            required
            optionals='(required & not allowed special char)'
            name='title'
            label='title'
            type='text'
            onChange={handleChange}
            value={formData?.title}
          />
          <div className='grid sm:grid-cols-3 grid-cols-2 gap-5'>
            <Input
              required
              optionals='(required)'
              name='category'
              label='category'
              onChange={handleChange}
              value={formData?.category}
            />
            <Input
              required
              optionals='(required)'
              name='brand'
              label='brand'
              onChange={handleChange}
              value={formData?.brand}
            />
            <Select
              label='status'
              name='status'
              options={[
                { id: 'active', title: 'Active' },
                { id: 'inactive', title: 'Inactive' },
              ]}
              onChange={handleSelectChange}
              value={status}
            />
          </div>
          <div className='grid sm:grid-cols-4 grid-cols-2 gap-5'>
            <Input
              required
              optionals='(%)'
              name='discount'
              label='discount'
              type='number'
              onChange={handleChange}
              value={formData?.discount}
            />

            <Input
              optionals='($)'
              label='price'
              name='price'
              type='number'
              onChange={handleChange}
              value={formData.price}
            />

            <Input
              optionals='(max 5.0)'
              label='rating'
              name='rating'
              type='number'
              onChange={handleChange}
              value={formData.rating}
            />

            <Input
              optionals='(available)'
              label='stock'
              name='stock'
              type='number'
              onChange={handleChange}
              value={formData.stock}
            />
          </div>

          <Textarea
            optionals='(required & not allowed special char)'
            label='description'
            onChange={handleTextAreaChange}
            value={description}
            name='description'
            rows={5}
            maxLength={1000}
            maxChar={1000}
          />

          {/* select images */}
          <label className='block text-sm font-medium text-gray-700 mt-5'>
            Product Gallery Images
            {previews?.length ? (
              <label htmlFor='image-uploads'>
                <span className='ml-6 text-xs text-indigo-600 hover:bg-gray-100 p-2 rounded cursor-pointer'>
                  Another Upload files
                </span>
                <input
                  type='file'
                  id='image-uploads'
                  onChange={handleImageChange}
                  multiple
                  className='sr-only'
                />
              </label>
            ) : (
              <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg'>
                <div className='space-y-1 text-center'>
                  <div className='flex text-sm text-gray-600'>
                    <label className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none'>
                      <span>Upload multiple files</span>
                      <input
                        type='file'
                        id='image-uploads'
                        onChange={handleImageChange}
                        multiple
                        className='sr-only'
                      />
                    </label>
                    <p className='pl-1'>or drag and drop</p>
                  </div>
                  <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            )}
          </label>

          {/* show previews */}
          {previews.length ? (
            <div className='grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-5'>
              {previews?.map((preview, index) => (
                <div className='border p-1 flex items-center justify-center relative rounded-md'>
                  <img key={index} src={preview} alt={`Image ${index + 1}`} width={200} />
                  <button className='svg-btn text-red-600 absolute top-1 right-1 cursor-pointer'>
                    <Trash2 size={18} strokeWidth={2} onClick={() => removeImage(index)} />
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <div className='flex flex-col gap-3 py-5'>
            <label htmlFor='thumbnail' className='block text-sm font-medium text-gray-700'>
              Product thumbnail
            </label>
            {/* show preview */}
            {preview ? (
              <div className='border p-1 relative rounded-md w-fit'>
                <img src={preview} alt='thumbnail' width={200} />
                <button className='svg-btn text-red-600 absolute top-1 right-1 cursor-pointer'>
                  <Trash2
                    size={18}
                    strokeWidth={2}
                    onClick={() => {
                      setPreview(null);
                      setThumbnail('');
                    }}
                  />
                </button>
              </div>
            ) : (
              <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg'>
                <div className='space-y-1 text-center'>
                  <div className='flex text-sm text-gray-600'>
                    <label className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none'>
                      <span>Upload single file</span>
                      <input
                        type='file'
                        id='thumbnail'
                        className='sr-only'
                        onChange={handleThumbnailChange}
                      />
                    </label>
                    <p className='pl-1'>or drag and drop</p>
                  </div>
                  <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='mt-6 flex justify-end space-x-3'>
          <NavLink
            to={'/products'}
            type='button'
            className='btn border border-red-600 text-red-600'>
            Cancel
          </NavLink>
          {/* spinner button */}
          <SpinnerBtn loading={loading} primaryName='Save Product' type='submit' />
        </div>
      </form>
    </>
  );
};

export default ProductForm;
