import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, SpinnerBtn, Textarea } from './ui';

import { MultiSelect } from '@/components';
import { Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import { errorHandler, axiosInstance } from '@/lib/utils';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const CategoryForm = ({ item }: { item?: CategoryType }) => {
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  const navigate = useNavigate();
  useTitle(`Cartify: ${path} form`);
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    status: item?.status || '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(item?.thumbnail || '');
  const [loading, setLoading] = useState(false);
  const [AILoading, setAILoading] = useState(false);

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

  const handleDescriptionGenerate = async () => {
    try {
      if (formData.description.length < 50)
        return toast.error('AI to enter at least 50 char entered');
      setAILoading(true);
      const res = await axiosInstance.post('/openai/generate-text', {
        prompt: formData.description,
      });
      if (res.data.data) {
        setFormData({ ...formData, description: res.data.data.response });
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setAILoading(false);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.description || !formData.status) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('status', formData.status);

      if (image?.name) payload.append('thumbnail', image);

      const endpoint = `/${path}${item?._id ? `/${item._id}` : ''}`;
      const method = item?._id ? 'patch' : 'post';

      const response = await axiosInstance[method](endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data) {
        navigate(`/${path}`);
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* item form data */}
      <form
        onSubmit={handleSubmit}
        className="space-y-10 text-gray-700 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-gray-700 capitalize">{path}</h2>
        <div className="flex gap-5 max-sm:flex-col sm:items-end">
          <Input
            name="title"
            className="w-full"
            required={true}
            value={formData.title}
            onChange={handleChange}
          />
          <MultiSelect
            list={['active', 'inactive']}
            onSelected={(e) => setFormData({ ...formData, status: e })}
            selected={formData.status}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            name="description"
            id="description"
            placeholder="Generate a e-commerce description with title of title with 500 to 1000 char."
            required={true}
            maxLength={1000}
            rows={5}
          />
          <small className="text-gray-500">
            {formData.description.length} char, If you generate description with
            AI to enter at least 50 char entered.
          </small>
          <button
            onClick={handleDescriptionGenerate}
            type="button"
            className="text-xs mt-2 w-fit px-6 py-2 rounded-full text-indigo-600 border border-indigo-600 font-semibold hover:opacity-80">
            {AILoading ? 'Generate....' : 'Generate with AI'}
          </button>
        </div>

        <Input type="file" name="thumbnail" onChange={handleChange} />
        {preview && (
          <div className="relative">
            <img src={preview} alt="preview" width={300} />
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreview('');
              }}
              className="svg-btn text-red-600 absolute top-2 left-2">
              <Trash2 size={18} />
            </button>
          </div>
        )}
        <div className="flex items-center justify-end gap-5 pt-10">
          <NavLink
            to={'/' + path}
            className="btn !text-red-600 border border-red-600  text-sm">
            Cancel
          </NavLink>
          <SpinnerBtn
            loading={loading}
            type="submit"
            primaryName={'save ' + path}
          />
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
