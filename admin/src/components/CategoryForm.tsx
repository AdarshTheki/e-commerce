import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, SpinnerBtn, Textarea } from './ui';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/Select';

import { Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import { errorHandler, axiosInstance } from '@/lib/utils';
import { AxiosError } from 'axios';

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
            alert('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const payload = new FormData();
            payload.append('title', formData.title);
            payload.append('description', formData.description);
            payload.append('status', formData.status);
            if (image) payload.append('thumbnail', image);

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
            <form onSubmit={handleSubmit} className="space-y-10 text-gray-600">
                <h2 className="text-xl font-bold text-gray-700 capitalize">
                    {path}
                </h2>
                <div className="flex gap-5 max-sm:flex-col sm:items-end">
                    <Input
                        name="title"
                        className="w-full"
                        required={true}
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <Select
                        onValueChange={(value) =>
                            setFormData({ ...formData, status: value })
                        }>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {[
                                { id: 'active', title: 'active' },
                                { id: 'inactive', title: 'inactive' },
                            ].map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
                        required={true}
                        maxLength={1000}
                        rows={4}
                    />
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
