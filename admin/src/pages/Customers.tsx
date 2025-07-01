import { Plus, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";

import { useFetch, useTitle } from "../hooks";
import { DeleteModal, Loading, NotFound } from "../utils";
import { UserCard } from "../components";
import { RootState } from "@/redux/store";
import { axios, errorHandler } from "@/constant";

const Customers = () => {
  const { data, loading, error } =
    useFetch<PaginationTypeWithDocs<UserType>>("/user/admin");
  const users = useSelector((state: RootState) => state.auth.user);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [customers, setCustomers] = useState<UserType[]>([]);

  useTitle("cartify: user information");

  useEffect(() => {
    if (data?.items.length) {
      setCustomers(data.items);
    }
  }, [data?.items]);

  const handleDelete = async (id: string) => {
    try {
      if (!id) return;
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      await axios.delete(`/user/admin/${id}`);
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-xl font-bold text-gray-700 capitalize">
          User Information
        </h2>
        <NavLink
          to={`/customer/create`}
          className="bg-indigo-600 capitalize flex items-center justify-center gap-2 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700">
          <Plus size={16} /> <span>Add User</span>
        </NavLink>
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
              {(users?.role === "admin" || users?._id === user?.createdBy) && (
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
                      onClick={() => setDeleteIsOpen(true)}
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
    </>
  );
};

export default Customers;
