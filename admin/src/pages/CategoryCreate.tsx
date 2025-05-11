import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb, Input, Select, SpinnerBtn, Textarea } from "../utils";
import { Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../constant/axiosInstance";

const statusOptions = [
  { id: "active", title: "active" },
  { id: "inactive", title: "inactive" },
];

const CategoryCreate = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
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
    try {
      const response = await axiosInstance.post("/category", {
        ...formData,
        thumbnail: image,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* location links */}
      <div className="flex items-center justify-between p-2">
        <Breadcrumb
          paths={[
            { label: "Home", to: "/" },
            { label: path, to: `/${path}` },
          ]}
        />
        <h2 className="capitalize font-medium text-gray-600 p-2">Add {path}</h2>
      </div>

      {/* item form data */}
      <form
        onSubmit={handleSubmit}
        className="sm:p-6 p-3 min-h-screen space-y-4 bg-white text-gray-600 rounded-lg">
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
            onChange={handleChange}
            name="status"
            label="status"
            value={formData.status}
            options={statusOptions}
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
    </>
  );
};

export default CategoryCreate;
