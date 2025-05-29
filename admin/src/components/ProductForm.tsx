import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

import { Input, Select, SpinnerBtn, Textarea } from "../utils";
import { toast } from "react-toastify";
import axiosInstance from "../constant/axiosInstance";
import useTitle from "../hooks/useTitle";

const ProductForm = ({ data }: { data?: ProductType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(
    data?.images.length ? data?.images : []
  );
  useTitle(`Cartify: ${data?._id ? "Update Product" : "Add New Product"}`);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(data?.thumbnail || "");

  const [formData, setFormData] = useState({
    title: data?.title || "",
    category: data?.category || "",
    brand: data?.brand || "",
    status: data?.status || "",
    description: data?.description || "",
    discount: data?.discount || 0,
    price: data?.price || 0,
    rating: data?.rating || 0,
    stock: data?.stock || 0,
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
    if (!thumbnail && !preview) {
      toast.error("Upload the product thumbnail");
      setLoading(false);
      return;
    }
    if (!images.length && !(previews.length > 1)) {
      toast.error("Upload the product gallery images");
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
      toast.error("Please fill all the fields");
      return;
    }

    // Prepare FormData
    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("category", formData.category);
    uploadData.append("brand", formData.brand);
    uploadData.append("description", formData.description);
    uploadData.append("discount", formData.discount.toString());
    uploadData.append("price", formData.price.toString());
    uploadData.append("rating", formData.rating.toString());
    uploadData.append("stock", formData.stock.toString());
    uploadData.append("status", formData.status);
    if (thumbnail) uploadData.append("thumbnail", thumbnail);
    images.forEach((image) => uploadData.append("images", image));

    // API Call
    try {
      const endpoint = data?._id ? `/product/${data._id}` : "/product";
      const method = data?._id ? "patch" : "post";
      const res = await axiosInstance[method](endpoint, uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data) {
        navigate("/product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold p-2">
        {data?._id ? "Update Product" : "Add New Product"}
      </h3>
      <form onSubmit={handelSubmit} className="bg-white p-2 sm:p-6 rounded-lg">
        <div className="space-y-4">
          <Input
            required
            optionals="(required & not allowed special char)"
            name="title"
            label="title"
            type="text"
            onChange={handleChange}
            value={formData?.title}
          />
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-5">
            <Input
              required
              optionals="(required)"
              name="category"
              label="category"
              onChange={handleChange}
              value={formData?.category}
            />
            <Input
              required
              optionals="(required)"
              name="brand"
              label="brand"
              onChange={handleChange}
              value={formData?.brand}
            />
            <Select
              label="status"
              name="status"
              options={[
                { id: "active", title: "Active" },
                { id: "inactive", title: "Inactive" },
                { id: "out-of-stock", title: "out of stock" },
                { id: "pending", title: "pending" },
              ]}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              value={formData.status}
            />
          </div>
          <div className="grid sm:grid-cols-4 grid-cols-2 gap-5">
            <Input
              required
              optionals="(%)"
              name="discount"
              label="discount"
              type="number"
              onChange={handleChange}
              value={formData?.discount}
            />

            <Input
              optionals="($)"
              label="price"
              name="price"
              type="number"
              onChange={handleChange}
              value={formData.price}
            />

            <Input
              optionals="(max 5.0)"
              label="rating"
              name="rating"
              type="number"
              onChange={handleChange}
              value={formData.rating}
            />

            <Input
              optionals="(available)"
              label="stock"
              name="stock"
              type="number"
              onChange={handleChange}
              value={formData.stock}
            />
          </div>

          <Textarea
            optionals="(required & not allowed special char)"
            label="description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
            name="description"
            rows={5}
            maxLength={1000}
            maxChar={1000}
          />

          {/* select images */}
          <label className="block text-sm font-medium text-gray-700 mt-5">
            Product Gallery Images
            {previews?.length ? (
              <label htmlFor="image-uploads">
                <span className="ml-6 border text-xs text-indigo-600 hover:bg-gray-100 p-2 rounded cursor-pointer">
                  Another Upload files
                </span>
                <input
                  type="file"
                  id="image-uploads"
                  onChange={handleImageChange}
                  multiple
                  className="sr-only"
                />
              </label>
            ) : (
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                      <span>Upload multiple files</span>
                      <input
                        type="file"
                        id="image-uploads"
                        onChange={handleImageChange}
                        multiple
                        className="sr-only"
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
            to={"/products"}
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
