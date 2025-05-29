import { LazyImage } from "@/utils";

const ProductCard = ({ item }: { item: ProductType }) => {
  return (
    <>
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
    </>
  );
};

export default ProductCard;
