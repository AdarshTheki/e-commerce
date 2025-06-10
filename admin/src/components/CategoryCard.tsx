import { LazyImage } from "@/utils";
import { format } from "date-fns";

const CategoryCard = ({
  status,
  title,
  createdAt,
  thumbnail,
}: CategoryType) => {
  return (
    <div className="rounded-lg border">
      <div className="h-36">
        <LazyImage
          className="h-full w-full"
          alt={`${title}_Image`}
          src={thumbnail || "/placeholder.jpg"}
        />
      </div>
      <div className="p-3 text-gray-700">
        <h3 className="mb-2 font-medium capitalize line-clamp-1">{title}</h3>
        <div className="flex gap-2 flex-wrap justify-between items-center text-sm">
          <span className="text-xs">
            {format(new Date(createdAt || Date.now()), "dd MMM yyyy h:mma")}
          </span>
          <span
            className={
              status !== "active" ? "status-inactive" : "status-active"
            }>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
