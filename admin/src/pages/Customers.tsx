import { Plus, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import axiosInstance from "../constant/axiosInstance";
import { DeleteModal, Loading } from "../utils";
import { AnimatedCounter } from "../components";

const Customers = () => {
  const { data, loading, refetch } = useFetch<UserType[]>("/user/admin");

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

      {loading || !data?.length ? (
        <Loading />
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {data.map((i: UserType) => (
            <Card key={i?.username} user={i} refresh={refetch} />
          ))}
        </div>
      )}
    </>
  );
};

export default Customers;

const Card = ({ user, refresh }: { user: UserType; refresh: () => void }) => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const url = user?.avatar || "https://avatar.iran.liara.run/public";

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/user/admin/${user?._id}`);
      refresh();
      console.log("delete user", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg border p-6 group relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={url}
            alt="Customer"
            className="w-12 object-cover h-12 rounded-full transition-opacity duration-300 opacity-100"
            loading="lazy"
          />
          <div>
            <h3 className="font-medium">{user.username || "jane smite"}</h3>
            <p className="text-sm text-gray-500">
              {user.email || "jane@example.com"}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Member Since</span>
          <span>
            {format(new Date(user?.createdAt || Date.now()), "dd MMM yyyy")}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Orders</span>
          <span>18</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Spent</span>
          <span>
            $<AnimatedCounter target={1856} />
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
            Active
          </span>
        </div>

        {/* Hover Modal */}
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
        </div>

        <DeleteModal
          isOpen={deleteIsOpen}
          onClose={() => setDeleteIsOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};
