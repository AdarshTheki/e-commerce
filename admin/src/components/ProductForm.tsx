import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

import { Input, SpinnerBtn, Textarea } from './ui';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from './ui/Select';

import { toast } from 'react-toastify';
import useTitle from '../hooks/useTitle';
import { AxiosError } from 'axios';
import { errorHandler, axiosInstance } from '@/lib/utils';

const ProductForm = ({ data }: { data?: ProductType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(
    data?.images.length ? data?.images : []
  );
  useTitle(`Cartify: ${data?._id ? 'Update Product' : 'Add New Product'}`);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(data?.thumbnail || '');

  const [formData, setFormData] = useState({
    title: data?.title || '',
    category: data?.category || '',
    brand: data?.brand || '',
    status: data?.status || '',
    description: data?.description || '',
    discount: data?.discount,
    price: data?.price,
    rating: data?.rating,
    stock: data?.stock,
  });

  interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleImageChange = (event: ImageChangeEvent) => {
    const files = event.target.files as FileList;
    setImages(Array.from(files));
    setPreviews(
      Array.from(files).map((file: File) => URL.createObjectURL(file))
    );
  };

  const removeImage = (id: number) => {
    setPreviews(previews.filter((_, index) => index !== id));
    setImages(images.filter((_, index) => index !== id));
  };

  const handleThumbnailChange = (event: ImageChangeEvent) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Validation
    if (!preview?.length) {
      toast.error('Upload the product thumbnail');
      setLoading(false);
      return;
    }
    if (!previews?.length) {
      toast.error('Upload the product gallery images');
      setLoading(false);
      return;
    }
    if (
      !formData.title ||
      !formData.category ||
      !formData.brand ||
      !formData.description ||
      !formData.status ||
      !formData.discount ||
      !formData.price ||
      !formData.rating ||
      !formData.stock
    ) {
      setLoading(false);
      toast.error('Please fill all the fields');
      return;
    }

    // Prepare FormData
    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('category', formData.category);
    uploadData.append('brand', formData.brand);
    uploadData.append('description', formData.description);
    uploadData.append('discount', formData.discount.toString());
    uploadData.append('price', formData.price.toString());
    uploadData.append('rating', formData.rating.toString());
    uploadData.append('stock', formData.stock.toString());
    uploadData.append('status', formData.status);
    if (thumbnail) uploadData.append('thumbnail', thumbnail);
    images.forEach((image) => uploadData.append('images', image));

    // API Call
    try {
      const endpoint = data?._id ? `/product/${data._id}` : '/product';
      const method = data?._id ? 'patch' : 'post';
      const res = await axiosInstance[method](endpoint, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data) {
        navigate('/product');
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handelSubmit} className="bg-white p-2 sm:p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-10">
          {data?._id ? 'Update Product' : 'Add New Product'}
        </h3>
        <div className="space-y-4">
          <Input
            required
            name="title"
            type="text"
            onChange={handleChange}
            value={formData?.title}
          />
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-5 items-end">
            <Input
              required
              name="category"
              onChange={handleChange}
              value={formData?.category}
            />
            <Input
              required
              name="brand"
              onChange={handleChange}
              value={formData?.brand}
            />
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={formData?.status || 'Select Status'}
                />
              </SelectTrigger>
              <SelectContent>
                {[
                  { id: 'active', title: 'Active' },
                  { id: 'inactive', title: 'Inactive' },
                  {
                    id: 'out-of-stock',
                    title: 'Out of Stock',
                  },
                  { id: 'pending', title: 'Pending' },
                ].map((item) => (
                  <SelectItem value={item.id} className="bg-white">
                    {item.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid sm:grid-cols-4 grid-cols-2 gap-5">
            <Input
              placeholder="Discount in %"
              name="discount"
              type="number"
              onChange={handleChange}
              value={formData?.discount}
            />

            <Input
              placeholder="Price in $"
              name="price"
              type="number"
              onChange={handleChange}
              value={formData.price}
            />

            <Input
              placeholder="Rating up to 5"
              name="rating"
              type="number"
              max={5}
              onChange={handleChange}
              value={formData.rating}
            />

            <Input
              placeholder="Stock"
              name="stock"
              type="number"
              max={51}
              onChange={handleChange}
              value={formData.stock}
            />
          </div>

          <Textarea
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            value={formData.description}
            name="description"
            rows={5}
            placeholder="Please enter a description char between 100 to 1000"
            maxLength={1000}
            minLength={100}
          />

          {/* select images */}
          <label className="block text-sm font-medium text-gray-700 mt-5">
            Product Gallery Images
            {previews?.length ? (
              <span>
                <label
                  htmlFor="image-uploads"
                  className="ml-6 border text-xs text-indigo-600 hover:bg-gray-100 p-2 rounded cursor-pointer">
                  Another Upload files
                </label>
                <input
                  type="file"
                  id="image-uploads"
                  onChange={handleImageChange}
                  multiple
                  className="sr-only"
                />
              </span>
            ) : (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                      <label htmlFor="upload-multi-files">
                        Upload multiple files
                      </label>
                      <input
                        type="file"
                        id="upload-multi-files"
                        onChange={handleImageChange}
                        multiple
                        className="sr-only"
                      />
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </label>

          {/* show previews */}
          {previews.length ? (
            <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-5">
              {previews?.map((preview, index) => (
                <div className="border p-1 flex items-center justify-center relative rounded-md">
                  <img
                    key={index}
                    src={preview}
                    alt={`Image ${index + 1}`}
                    width={200}
                  />
                  <button
                    type="button"
                    className="svg-btn text-red-600 absolute top-1 right-1 cursor-pointer">
                    <Trash2
                      size={18}
                      strokeWidth={2}
                      onClick={() => removeImage(index)}
                    />
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 py-5">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700">
              Product thumbnail
            </label>
            {/* show preview */}
            {preview ? (
              <div className="border p-1 relative rounded-md w-fit">
                <img src={preview} alt="thumbnail" width={200} />
                <button
                  type="button"
                  className="svg-btn text-red-600 absolute top-1 right-1 cursor-pointer">
                  <Trash2
                    size={18}
                    strokeWidth={2}
                    onClick={() => {
                      setPreview(null);
                      setThumbnail(null);
                    }}
                  />
                </button>
              </div>
            ) : (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                      <span>Upload single file</span>
                      <input
                        type="file"
                        id="thumbnail"
                        className="sr-only"
                        onChange={handleThumbnailChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <NavLink
            to={'/products'}
            type="button"
            className="btn border border-red-600 text-red-600">
            Cancel
          </NavLink>
          {/* spinner button */}
          <SpinnerBtn
            loading={loading}
            primaryName="Save Product"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default ProductForm;
