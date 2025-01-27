import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

import { Input, Select, SpinnerBtn, categories, brands, Editor } from '../../Utils';

const ProductForm = ({ data }: { data?: ProductType }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    status: data?.status || '',
    title: data?.title || '',
    original_price: data?.original_price || 0,
    delivery_amount: data?.delivery_amount || 0,
    discount_price: data?.discount_price || 0,
    createdAt: data?.createdAt || '',
    updatedAt: data?.updatedAt || '',
    specification: data?.specification || '',
    overview: data?.overview || '',
    trending: data?.trending || '',
    category: data?.category?._id || '',
    brand: data?.brand?._id || '',
  });

  interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleImageChange = (event: ImageChangeEvent) => {
    const files = event.target.files as FileList;
    setImages(Array.from(files));
    setPreviews(Array.from(files).map((file: File) => URL.createObjectURL(file)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const removeImage = (id: number) => {
    setPreviews(previews.filter((_, index) => index !== id));
    setImages(images.filter((_, index) => index !== id));
  };

  return (
    <div>
      <h3 className='mb-6 text-xl font-semibold'>
        {data?._id ? 'Update Product' : 'Add New Product'}
      </h3>
      <form onSubmit={handelSubmit} className='bg-white p-2 sm:p-6 rounded-lg'>
        <div className='space-y-4'>
          <Input
            required
            name='title'
            label='title'
            type='text'
            onChange={handleChange}
            value={formData?.title}
          />
          <div className='grid gap-2 md:grid-cols-3 grid-cols-2'>
            <Input
              required
              name='delivery_amount'
              label='delivery charge'
              type='number'
              onChange={handleChange}
              value={formData?.delivery_amount}
            />
            <Input
              required
              name='original_price'
              label='original price'
              type='number'
              onChange={handleChange}
              value={formData?.original_price}
            />
            <Input
              required
              name='discount_price'
              label='discount price'
              type='number'
              onChange={handleChange}
              value={formData?.discount_price}
            />

            <Select
              label='category'
              name='category'
              className='capitalize'
              data={data?.category}
              options={categories}
              onChange={handleSelectChange}
              value={formData.category}
            />

            <Select
              label='brand'
              name='brand'
              className='capitalize'
              options={brands}
              data={data?.brand}
              onChange={handleSelectChange}
              value={formData.brand}
            />
            <Select
              label='status'
              name='status'
              className='capitalize'
              options={[
                { _id: 'ACTIVE', title: 'Active' },
                { _id: 'INACTIVE', title: 'Inactive' },
              ]}
              onChange={handleSelectChange}
              value={formData.status}
            />
            <Select
              label='trending'
              name='trending'
              className='capitalize'
              options={[
                { _id: 'NO', title: 'No' },
                { _id: 'YES', title: 'Yes' },
              ]}
            />
          </div>
          <div className='sm:grid grid-cols-2 text-sm gap-5'>
            <div>
              <h4 className='font-semibold'>Overview</h4>
              <Editor
                value={formData.overview}
                onChange={(value: string) => setFormData({ ...formData, overview: value })}
              />
            </div>
            <div>
              <h4 className='font-semibold'>Specification</h4>
              <Editor
                value={formData.specification}
                onChange={(value: string) => setFormData({ ...formData, specification: value })}
              />
            </div>
          </div>

          <label className='block text-sm font-medium text-gray-700 mt-5'>
            Product Images
            {previews?.length ? (
              <label className='relative ml-5 border py-1 cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none'>
                <span className='px-5'>More Upload files</span>
                <input type='file' onChange={handleImageChange} multiple className='sr-only' />
              </label>
            ) : (
              <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg'>
                <div className='space-y-1 text-center'>
                  <div className='flex text-sm text-gray-600'>
                    <label className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none'>
                      <span>Upload files</span>
                      <input
                        type='file'
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
          <div className='grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-5'>
            {previews?.map((preview, index) => (
              <div className='border p-2 flex items-center justify-center relative'>
                <img key={index} src={preview} alt={`Image ${index + 1}`} width={200} />
                <Trash2
                  onClick={() => removeImage(index)}
                  className='hover:text-red-900 text-red-600 absolute top-0 right-0 bg-white cursor-pointer'
                />
              </div>
            ))}
          </div>
        </div>

        <div className='mt-6 flex justify-end space-x-3'>
          <NavLink
            to={'/product'}
            type='button'
            className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'>
            Cancel
          </NavLink>
          {/* spinner button */}
          <SpinnerBtn loading={loading} primaryName='Save Product' props={{ type: 'submit' }} />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
