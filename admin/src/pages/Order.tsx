import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';

import { PackageSearch } from 'lucide-react';
import { useFetch } from '@/hooks';
import { Loading } from '@/components/ui';
import { axiosInstance, cn, errorHandler } from '@/lib/utils';
import { AxiosError } from 'axios';
import { useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

const OrderEmpty = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="p-8 max-w-md text-center">
                <PackageSearch className="w-20 h-20 text-gray-400 mb-4 mx-auto" />
                <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
                <p className="text-gray-600 mb-6">
                    You haven’t placed any orders. Start shopping to place your
                    first order.
                </p>
                <NavLink
                    to="/"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition">
                    Shop Now
                </NavLink>
            </div>
        </div>
    );
};

const OrderListing = ({ orders }: { orders: OrderType[] }) => {
    const [orderData, setOrderData] = useState<OrderType[]>(orders);

    const handleStatusChange = async (
        orderId: string,
        newStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled'
    ) => {
        try {
            const res = await axiosInstance.patch(`/order/${orderId}/status`, {
                status: newStatus,
            });
            if (res.data) {
                setOrderData((prev) =>
                    prev.map((order: OrderType) =>
                        order._id === orderId
                            ? { ...order, status: newStatus }
                            : order
                    )
                );
            }
        } catch (error) {
            errorHandler(error as AxiosError);
        }
    };

    return (
        <div>
            {orderData?.map((order) => (
                <div
                    key={order._id}
                    className="bg-white shadow-md rounded-xl mb-6 p-4">
                    <div className="flex max-sm:flex-wrap justify-between items-center mb-2">
                        <div>
                            <h3 className="font-semibold text-lg">
                                Order ID: {order._id}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Placed on:{' '}
                                {format(
                                    new Date(order.createdAt).toLocaleString(),
                                    'dd MMM yyyy h:mma'
                                )}
                            </p>
                        </div>
                        <select
                            value={order.status}
                            onChange={(e) =>
                                handleStatusChange(
                                    order._id,
                                    e.target.value as
                                        | 'pending'
                                        | 'shipped'
                                        | 'delivered'
                                        | 'cancelled'
                                )
                            }
                            className="border rounded px-3 py-1 capitalize">
                            {[
                                'pending',
                                'shipped',
                                'delivered',
                                'cancelled',
                            ].map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <p className="text-gray-700 font-medium">
                            Shipping Address:
                        </p>
                        <p className="capitalize">
                            {order.shipping.addressLine}, {order.shipping.city}{' '}
                            - {order.shipping.postalCode},{' '}
                            {order.shipping.countryCode.toUpperCase()}
                        </p>
                    </div>

                    <div>
                        {order.items.map((item) => (
                            <div
                                key={item.productId}
                                className="flex items-center gap-4 border-t py-3">
                                <img
                                    src={item.product?.thumbnail}
                                    alt={item.product?.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold">
                                        {item.product?.title}
                                    </p>
                                    <p>Qty: {item.quantity}</p>
                                    <p className="text-green-600 font-bold">
                                        ₹{item?.product?.price?.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const Order = () => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('createdAt-desc');

    const { data, loading } = useFetch<PaginationTypeWithDocs<OrderType>>(
        `/order?limit=10&page=${page}&sortBy=${filter.split('-')[0]}&orderBy=${filter.split('-')[1]}`
    );

    return (
        <div className="p-6 text-slate-800">
            <div className="flex gap-5 items-center">
                <h2 className="text-2xl font-bold">Order Listing</h2>
                <select
                    name="filter"
                    className="p-2 text-sm rounded-lg cursor-pointer border border-indigo-300 outline-none"
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}>
                    <option value="createdAt-desc">Newest</option>
                    <option value="createdAt-asc">Oldest</option>
                    <option value="updatedAt-asc">Best Sellers</option>
                    <option value="updatedAt-desc">Best Featured</option>
                </select>
            </div>

            {loading && <Loading />}

            {data?.totalItems === 0 ? (
                <OrderEmpty />
            ) : (
                <OrderListing orders={data?.items ?? []} />
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
};

export default Order;
