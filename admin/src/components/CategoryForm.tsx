import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Select, SpinnerBtn, Textarea } from "../utils";
import { Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../constant/axiosInstance";

const CategoryForm = ({ item }: { item?: CategoryType }) => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: item?.title || "",
    description: item?.description || "",
    status: item?.status || "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(item?.thumbnail || "");
  const [loading, setLoading] = useState(false);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement & HTMLSelectElement
  > = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });

    if (files && files.length > 0) {
      setImage(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.description || !formData.status) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("status", formData.status);
      if (image) payload.append("thumbnail", image);

      const endpoint = `/${path}${item?._id ? `/${item._id}` : ""}`;
      const method = item?._id ? "patch" : "post";

      const response = await axiosInstance[method](endpoint, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        console.log(response?.data);
        navigate(`/${path}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700 capitalize pb-5">
        {path}
      </h2>

      {/* item form data */}
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
        <div className="sm:flex gap-5 items-center">
          <Input
            name="title"
            label="Title"
            required
            value={formData.title}
            onChange={handleChange}
          />
          <Select
            required
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            name="status"
            label="status"
            value={formData.status}
            options={[
              { id: "active", title: "active" },
              { id: "inactive", title: "inactive" },
              { id: "pending", title: "pending" },
            ]}
          />
        </div>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          name="description"
          label="description"
          required
          maxChar={1000}
          rows={4}
        />

        <Input type="file" name="thumbnail" onChange={handleChange} />
        {preview && (
          <div className="relative">
            <img src={preview} alt="preview" width={300} />
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreview("");
              }}
              className="svg-btn text-red-600 absolute top-2 left-2">
              <Trash2 size={18} />
            </button>
          </div>
        )}
        <div className="flex items-center justify-end gap-5 pt-10">
          <NavLink
            to={"/" + path}
            className="btn !text-red-600 border border-red-600  text-sm">
            Cancel
          </NavLink>
          <SpinnerBtn
            loading={loading}
            type="submit"
            primaryName={"save " + path}
          />
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
