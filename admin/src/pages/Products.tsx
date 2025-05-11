import { NavLink, useSearchParams } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import {
  Input,
  Loading,
  DropdownMenu,
  Breadcrumb,
  PaginationBtn,
  LazyImage,
} from "../utils";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import axiosInstance from "../constant/axiosInstance";

const sortByOptions = [
  { label: "Title (A-Z)", value: "title-asc" },
  { label: "Title (Z-A)", value: "title-desc" },
  { label: "Price (Low to High)", value: "price-asc" },
  { label: "Price (High to Low)", value: "price-desc" },
];

const pageSizeOptions = [
  { label: "10 items per page", value: 10 },
  { label: "30 items per page", value: 30 },
  { label: "50 items per page", value: 50 },
  { label: "100 items per page", value: 100 },
];

export default function Product() {
  const [sortBy, setSortBy] = useState<string>("title-asc");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const query = useDebounce(search, 500);

  const { data, loading } = useFetch<PaginationType>(
    `/product?title=${query}&page=${page}&limit=${limit}&sortBy=${
      sortBy.split("-")[0]
    }&order=${sortBy.split("-")[1]}`
  );

  useEffect(() => {
    const title = searchParams.get("title");
    if (title) setSearch(title);
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (data?.totalPages || 1)) {
      setPage(newPage);
    }
  };

  const pageItem = () => {
    return (
      <div className="w-[140px]">
        {pageSizeOptions.map((i) => (
          <button
            onClick={() => setLimit(i.value)}
            className={`w-full hover:bg-gray-50 py-1.5 text-sm ${
              i.value == Number(limit) && "text-indigo-600"
            }`}
            key={i.label}>
            {i.label}
          </button>
        ))}
      </div>
    );
  };

  const sortByItem = () => {
    return (
      <div className="w-[140px]">
        {sortByOptions.map((i) => (
          <button
            onClick={() => setSortBy(i.value)}
            className={`w-full text-left pl-4 hover:bg-gray-50 py-1.5 text-sm ${
              i.value === sortBy && "text-indigo-600"
            }`}
            key={i.label}>
            {i.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between p-2">
        <Breadcrumb
          paths={[
            { label: "Home", to: "/" },
            { label: "Product", to: "/product" },
          ]}
        />
        <NavLink
          to={"/product/create"}
          className="btn bg-[--primary] text-white text-sm flex items-center gap-2 capitalize">
          <Plus size={16} /> <span>Add Product</span>
        </NavLink>
      </div>

      <div className="p-4 rounded-lg bg-white">
        {/* Filter products */}
        <div className="flex sm:gap-4 gap-2 items-center justify-between">
          <Input
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="w-full text-sm py-1.5 pl-4"
            placeholder="Search products..."
          />
          <div className="flex items-center justify-between sm:gap-4 gap-2">
            <DropdownMenu name="sort" position="right">
              {sortByItem()}
            </DropdownMenu>
            <DropdownMenu name="page" position="right">
              {pageItem()}
            </DropdownMenu>
          </div>
        </div>

        <hr className="border my-4 border-gray-100" />

        {/* Pagination */}
        <div className="sm:flex-row flex gap-2 flex-col sm:justify-between text-sm">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, data?.totalDocs || 0)} of {data?.totalDocs}{" "}
            products
          </p>
          <div className="flex gap-2 items-center">
            <button
              className={`btn text-xs !py-1 !px-2.5 border border-neutral-200 rounded-lg hover:bg-gray-50 ${
                page === 1 && "hidden"
              }`}
              onClick={() => handlePageChange(page - 1)}>
              Prev
            </button>

            <PaginationBtn
              handlePageChange={handlePageChange}
              page={data?.page || 1}
              totalPages={data?.totalPages || 1}
            />

            <button
              className={`btn text-xs !py-1 !px-2.5 border border-neutral-200 rounded-lg hover:bg-gray-50 ${
                page === data?.totalPages && "hidden"
              }`}
              onClick={() => handlePageChange(page + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>

      {!loading && data?.docs && data?.docs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {data?.docs?.map((item: ProductType) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <Loading className="min-h-[50vh]" />
      )}
    </>
  );
}

const ProductCard = ({ item }: { item: ProductType }) => {
  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/product/${id}`);
      if (res.data) {
        toast.success("Product deleted success");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div
      key={item._id}
      className="border relative bg-white rounded-lg overflow-hidden">
      <button className="svg-btn text-indigo-600 hover:text-indigo-800 absolute top-1 right-10">
        <NavLink to={`/product/${item?._id}`}>
          <Pencil size={18} />
        </NavLink>
      </button>
      <button className="svg-btn text-red-600 hover:text-red-900 cursor-pointer absolute top-1 right-2">
        <Trash2 size={18} onClick={() => handleDelete(item._id)} />
      </button>
      <div className="w-full h-[200px] overflow-hidden">
        <LazyImage
          alt={`${item?.title}_Image`}
          src={
            item?.thumbnail ||
            "https://placehold.co/600x600?text=Image+not+found"
          }
          placeholder="https://placehold.co/600x600?text=Image+not+found"
        />
      </div>
      <div className="p-4 capitalize space-y-1">
        <p className="text-sm">#{item?.brand}</p>
        <h3 className="font-semibold line-clamp-1 capitalize">
          {item.title.toLowerCase()}
        </h3>
        <p className="text-sm text-gray-600">
          {item?.category?.split("-").join(" ")}
        </p>
        <div className="flex flex-wrap gap-1 justify-between items-center">
          <h3 className="whitespace-nowrap font-semibold text-sm text-gray-700">
            Price: ${item.price}
          </h3>
          <span
            className={
              item?.status !== "active" ? "status-inactive" : "status-active"
            }>
            {item?.status}
          </span>
        </div>
      </div>
    </div>
  );
};
