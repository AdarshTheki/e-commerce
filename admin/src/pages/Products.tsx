import { NavLink, useSearchParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import {
  Input,
  Loading,
  DropdownMenu,
  PaginationBtn,
  LazyImage,
  DeleteModal,
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
    <div>
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-xl font-bold text-gray-700 capitalize">Products</h2>
        <NavLink
          to={"/product/create"}
          className="btn bg-[--primary] text-white text-sm flex items-center gap-2 capitalize">
          <Plus size={16} /> <span>Add Product</span>
        </NavLink>
      </div>

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

      {/* Pagination */}
      <div className="pt-2 pb-5 flex gap-2 justify-between text-sm">
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

      {!loading && data?.docs && data?.docs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {data?.docs?.map((item: ProductType) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <Loading className="min-h-[50vh]" />
      )}
    </div>
  );
}

const ProductCard = ({ item }: { item: ProductType }) => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

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
      className="border relative group rounded-lg overflow-hidden">
      <div className="w-full overflow-hidden">
        <LazyImage alt={`${item?.title}_Image`} src={item?.thumbnail} />
      </div>
      <div className="p-4 capitalize space-y-1">
        <p className="text-sm">#{item?.brand || "Other"}</p>
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

      {/* Hover Modal */}
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
            onClick={() => setDeleteIsOpen(true)}
            className="svg-btn p-2 text-red-600 cursor-pointer"
          />
        </div>
      </div>

      <DeleteModal
        isOpen={deleteIsOpen}
        onClose={() => setDeleteIsOpen(false)}
        onConfirm={() => handleDelete(item._id)}
      />
    </div>
  );
};
