import { format } from "date-fns";
import Counter from "./Counter";

const UserCard = ({
  avatar,
  email,
  fullName,
  role,
  status,
  createdAt,
}: UserType) => {
  const url = avatar ?? "https://avatar.iran.liara.run/public";

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={url}
            alt="Customer"
            className="w-12 object-cover h-12 rounded-full transition-opacity duration-300 opacity-100"
            loading="lazy"
          />
          <div>
            <h3 className="font-medium">{fullName || "jane smite"}</h3>
            <p className="text-sm text-gray-500">
              {email || "jane@example.com"}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Member Since</span>
          <span>
            {format(new Date(createdAt || Date.now()), "dd MMM yyyy")}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Orders</span>
          <span>18</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Spent</span>
          <span>
            $<Counter target={1856} />
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
            {status}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Role</span>
          <span>{role}</span>
        </div>
      </div>
    </>
  );
};

export default UserCard;
