import { NavLink, useSearchParams } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { Input, Loading, DeleteModal, NotFound } from '../components/ui';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ProductCard } from '@/components';
import { errorHandler, axiosInstance, cn } from '@/lib/utils';
import { AxiosError } from 'axios';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/Select';

const sortByOptions = [
    { label: 'Title (A-Z)', value: 'title-asc' },
    { label: 'Title (Z-A)', value: 'title-desc' },
    { label: 'Price (Low to High)', value: 'price-asc' },
    { label: 'Price (High to Low)', value: 'price-desc' },
];

const pageSizeOptions = [
    { label: '10 items per page', value: 10 },
    { label: '30 items per page', value: 30 },
    { label: '50 items per page', value: 50 },
    { label: '100 items per page', value: 100 },
];

export default function Product() {
    const [sortBy, setSortBy] = useState<string>('title-asc');
    const [limit, setLimit] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState<string>('');
    const query = useDebounce(search, 500);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const [products, setProducts] = useState<ProductType[]>([]);

    const { data, loading, error } = useFetch<
        PaginationTypeWithDocs<ProductType>
    >(
        `/product?title=${query}&page=${page}&limit=${limit}&sortBy=${
            sortBy.split('-')[0]
        }&order=${sortBy.split('-')[1]}`
    );

    useEffect(() => {
        const title = searchParams.get('title');
        if (title) setSearch(title);
    }, [searchParams]);

    useEffect(() => {
        if (data?.items?.length) {
            setProducts(data.items);
        }
    }, [data?.items]);

    const handleDelete = async (id: string) => {
        try {
            setProducts((prev) => prev.filter((p) => p?._id !== id));
            const res = await axiosInstance.delete(`/product/${id}`);
            if (res.data) {
                toast.success('Product deleted');
            }
        } catch (err) {
            errorHandler(err as AxiosError);
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-700 capitalize">
                    Products
                </h2>
                <NavLink
                    to={'/product/create'}
                    className="btn bg-[--primary] text-white text-sm flex items-center gap-2 capitalize">
                    <Plus size={16} /> <span>Add Product</span>
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
                <Select onValueChange={(value) => setSortBy(value)}>
                    <SelectTrigger className="w-1/3">
                        <SelectValue
                            placeholder={
                                sortByOptions.filter(
                                    (i) => i.value === sortBy
                                )[0]?.label
                            }
                        />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {sortByOptions.map((item) => (
                            <SelectItem value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setLimit(parseInt(value))}>
                    <SelectTrigger className="w-1/3">
                        <SelectValue placeholder={`${limit} items per page`} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {pageSizeOptions.map((item) => (
                            <SelectItem value={item.value.toString()}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {error && <NotFound title={JSON.stringify(error)} />}

            {loading && <Loading />}

            {products?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {products?.map((item) => (
                        <div
                            className="border relative group rounded-lg overflow-hidden"
                            key={item._id}>
                            <ProductCard key={item._id} item={item} />

                            {/* Hover Modal */}
                            {(user?.role === 'admin' ||
                                user?._id === item?.createdBy) && (
                                <div className="absolute right-0 top-0 mt-2 mr-2 w-fit opacity-0 group-hover:opacity-100">
                                    <div className="flex items-center">
                                        <NavLink
                                            to={`/product/${item?._id}`}
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
                                        onConfirm={() => handleDelete(item._id)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <Pagination className="text-gray-800 cursor-pointer">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className={cn(
                                !data?.hasPreviousPage && '!cursor-not-allowed'
                            )}
                            onClick={() => {
                                if (data?.hasPreviousPage)
                                    setPage((prev) => prev - 1);
                            }}
                        />
                    </PaginationItem>
                    {data?.hasPreviousPage && page - 1 && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => setPage((prev) => prev - 1)}>
                                {page - 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            className={
                                'bg-gray-800 text-white hover:opacity-80'
                            }>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                    {(data?.totalPages || 0) > page && (
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={() =>
                                    data?.hasNextPage &&
                                    setPage((prev) => prev + 1)
                                }>
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    {(data?.totalPages || 0) > page + 2 && (
                        <PaginationItem>
                            <PaginationEllipsis
                                onClick={() => setPage((prev) => prev + 4)}
                            />
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationNext
                            className={cn(
                                data?.hasNextPage && data?.totalPages > page
                                    ? ''
                                    : '!cursor-not-allowed'
                            )}
                            onClick={() => {
                                if (
                                    data?.hasNextPage &&
                                    data?.totalPages > page
                                )
                                    setPage((prev) => prev + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
