import { useState } from "react";
import { toast } from "react-toastify";
import { Pen, Plus, Trash2 } from "lucide-react";
import axios from "axios";

import {
  formatDate,
  Input,
  Loading,
  DropdownMenu,
  Breadcrumb,
  PaginationBtn,
} from "../utils";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import { NavLink, useLocation } from "react-router-dom";

const sortByOptions = [
  { label: "Title by asc ", value: "title-asc" },
  { label: "Title by desc ", value: "title-desc" },
  { label: "Created at asc ", value: "createdAt-asc" },
  { label: "Created at desc ", value: "createdAt-desc" },
];

const pageSizeOptions = [
  { label: "10 per page", value: 10 },
  { label: "30 per page", value: 30 },
  { label: "50 per page", value: 50 },
  { label: "100 per page", value: 100 },
];

const CategoryListing = () => {
  const { pathname } = useLocation();
  const [sortBy, setSortBy] = useState<string>("title-asc");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const query = useDebounce(search, 500);

  const { data, refetch } = useFetch(
    `/api/v1${pathname}?limit=${limit}&page=${page}&title=${query}&sortBy=${
      sortBy.split("-")[0]
    }&order=${sortBy.split("-")[1]}`
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= data?.totalPages) {
      setPage(newPage);
    }
  };

  const pageItem = () => {
    return (
      <div className="w-[140px]">
        {pageSizeOptions.map((i) => (
          <button
            onClick={() => setLimit(i.value)}
            className={`w-full hover:bg-gray-50 py-1.5 pl-0 text-sm ${
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
            className={`w-full hover:bg-gray-50 py-1.5 text-sm ${
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
            { label: pathname.split("/").join(""), to: `${pathname}` },
          ]}
        />
        <NavLink
          to={`${pathname}/create`}
          className="btn bg-[--primary] text-white text-sm flex items-center gap-2 capitalize">
          <Plus size={16} /> <span>Add {pathname.split("/").join("")}</span>
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
            className="text-sm py-1.5 pl-4 w-36 sm:w-full"
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
            {Math.min(page * limit, data?.totalDocs)} of {data?.totalDocs}{" "}
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
              page={data?.page}
              totalPages={data?.totalPages}
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

      {data?.totalDocs ? (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2">
          {data?.docs?.map((item: BrandType) => (
            <CategoryItem
              key={item._id}
              path={pathname}
              {...item}
              refetch={refetch}
            />
          ))}
        </div>
      ) : (
        <Loading className="h-[50vh]" />
      )}
    </>
  );
};

export default CategoryListing;

const CategoryItem = ({
  _id,
  status,
  title,
  createdAt,
  thumbnail,
  refetch,
  path,
}: BrandType & { refetch: () => void; path: string }) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/v1${path}/${_id}`);
      if (res.data) {
        refetch();
        toast.success(`${path} deleted success`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200/20">
      <div className="flex items-center justify-between relative rounded-t-lg overflow-hidden">
        <div className="w-full">
          <img
            alt={title}
            src={thumbnail || "https://placehold.co/600x500/png"}
            className="min-h-40"
          />
        </div>
        <NavLink
          to={`${path}/${_id}`}
          className="svg-btn text-indigo-600 absolute top-1 right-10">
          <Pen size={16} />
        </NavLink>
        <button
          onClick={handleDelete}
          className="svg-btn text-red-600  absolute top-1 right-1">
          <Trash2 size={16} />
        </button>
      </div>
      <div className="p-3 text-gray-700">
        <h3 className="mb-2 font-medium capitalize line-clamp-1">
          {title?.split("-")?.join(" ")}
        </h3>
        <div className="flex gap-2 flex-wrap justify-between items-center text-sm">
          <span>{formatDate(createdAt)}</span>
          <span
            className={
              status.toLowerCase() !== "active"
                ? "status-inactive"
                : "status-active"
            }>
            {status.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
};
