import { Plus, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';

import { useFetch, useTitle } from '../hooks';
import { DeleteModal, Input, Loading, NotFound } from '../components/ui';
import { UserCard } from '../components';
import { RootState } from '@/redux/store';
import { axiosInstance, errorHandler } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select';

const sortByOptions = [
    { label: 'Name (A-Z)', value: 'fullName-asc' },
    { label: 'Name (Z-A)', value: 'fullName-desc' },
    { label: 'Email (A-Z)', value: 'email-asc' },
    { label: 'Email (Z-A)', value: 'email-desc' },
    { label: 'Create Asc', value: 'createdAt-asc' },
    { label: 'Create Desc', value: 'createdAt-desc' },
];

const pageSizeOptions = [
    { label: '10 items per page', value: 10 },
    { label: '30 items per page', value: 30 },
    { label: '50 items per page', value: 50 },
    { label: '100 items per page', value: 100 },
];

const Customers = () => {
    const users = useSelector((state: RootState) => state.auth.user);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [customers, setCustomers] = useState<UserType[]>([]);
    const [limit, setLimit] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>('fullName-asc');
    const [search, setSearch] = useState<string>('');

    useTitle('cartify: user information');

    const { data, loading, error } = useFetch<PaginationType<UserType>>(
        `/user/admin?limit=${limit}&sort=${sortBy.split('-')[0]}&order=${sortBy.split('-')[1]}&query=${search}`
    );

    useEffect(() => {
        if (data?.docs.length) {
            setCustomers(data.docs);
        }
    }, [data?.docs]);

    const handleDelete = async (id: string) => {
        try {
            if (!id) return;
            setCustomers((prev) => prev.filter((c) => c._id !== id));
            await axiosInstance.delete(`/user/admin/${id}`);
        } catch (error) {
            errorHandler(error as AxiosError);
        }
    };

    return (
        <div className="space-y-5 py-2">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-700 capitalize">
                    User Information
                </h2>
                <NavLink
                    to={`/customer/create`}
                    className="bg-indigo-600 capitalize flex items-center justify-center gap-2 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700">
                    <Plus size={16} /> <span>Add User</span>
                </NavLink>
            </div>

            {/* Filter products */}
            <div className="flex gap-4 max-sm:flex-wrap items-center sm:justify-between">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="w-full text-sm py-1.5 pl-4"
                    placeholder="Products search..."
                />
                <div className="w-[200px]">
                    <Select onValueChange={(value) => setSortBy(value)}>
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    sortByOptions.filter(
                                        (i) => i.value === sortBy
                                    )[0]?.label
                                }
                            />
                        </SelectTrigger>
                        <SelectContent className="bg-white w-full">
                            {sortByOptions.map((item) => (
                                <SelectItem value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[200px]">
                    <Select
                        onValueChange={(value) => setLimit(parseInt(value))}>
                        <SelectTrigger>
                            <SelectValue
                                placeholder={`${limit} items per page`}
                            />
                        </SelectTrigger>
                        <SelectContent className="bg-white w-full">
                            {pageSizeOptions.map((item) => (
                                <SelectItem value={item.value.toString()}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {loading && <Loading />}

            {error && <NotFound title={JSON.stringify(error)} />}

            {customers?.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-5">
                    {customers.map((user) => (
                        <div
                            key={user?._id}
                            className="rounded-lg border p-6 group relative">
                            <UserCard key={user?._id} {...user} />

                            {/* Hover Modal */}
                            {(users?.role === 'admin' ||
                                users?._id === user?.createdBy) && (
                                <div className="absolute right-0 top-0 mt-2 mr-2 w-fit opacity-0 group-hover:opacity-100">
                                    <div className="flex items-center">
                                        <NavLink
                                            to={`/customer/${user._id}`}
                                            className="svg-btn p-2 text-blue-600 cursor-pointer">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                height="24px"
                                                viewBox="0 -960 960 960"
                                                width="24px"
                                                fill="#2563eb">
                                                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                                            </svg>
                                        </NavLink>
                                        <Trash2
                                            onClick={() =>
                                                setDeleteIsOpen(true)
                                            }
                                            className="svg-btn p-2 text-red-600 cursor-pointer"
                                        />
                                    </div>

                                    <DeleteModal
                                        isOpen={deleteIsOpen}
                                        onClose={() => setDeleteIsOpen(false)}
                                        onConfirm={() => handleDelete(user._id)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Customers;
