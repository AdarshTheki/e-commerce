import { Plus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import axiosInstance from "../constant/axiosInstance";
import { Breadcrumb, DeleteBtn, Loading } from "../utils";

const Customers = () => {
  const { pathname } = useLocation();
  const { data, loading, error, refetch } = useFetch<UserType[]>("/user");

  if (loading || error || !data?.length) return <Loading />;

  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb
          paths={[
            { label: "Home", to: "/" },
            { label: pathname.split("/").join(""), to: `${pathname}` },
          ]}
        />
        <NavLink
          to={`${pathname}/create`}
          className="bg-indigo-600 capitalize flex items-center justify-center gap-2 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700">
          <Plus size={16} /> <span>Add {pathname.split("/").join("")}</span>
        </NavLink>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {data.map((i: UserType) => (
          <Card key={i?.username} user={i} refresh={refetch} />
        ))}
      </div>
    </>
  );
};

export default Customers;

const Card = ({ user, refresh }: { user: UserType; refresh: () => void }) => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const url = user?.avatar || "https://avatar.iran.liara.run/public";

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/user/admin/${user?.username}`
      );
      refresh();
      console.log("delete user", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
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
          <span>$1,856.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
            Active
          </span>
        </div>
        <div className="flex items-center gap-5">
          <NavLink
            to={`/customer/${user.username}`}
            className="btn text-white bg-indigo-600 text-sm">
            Edit
          </NavLink>
          <button
            onClick={() => setDeleteIsOpen(true)}
            className="btn text-white bg-red-600 text-sm">
            Delete
          </button>
        </div>

        <DeleteBtn
          isOpen={deleteIsOpen}
          onClose={() => setDeleteIsOpen(false)}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          message="Do you really want to delete this User permanently?"
        />
      </div>
    </div>
  );
};
