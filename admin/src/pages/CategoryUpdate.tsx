import { useLocation } from "react-router-dom";
import { CategoryForm } from "../components";
import useFetch from "../hooks/useFetch";
import { Loading } from "../utils";

const CategoryUpdate = () => {
  const path = useLocation().pathname.split("/");

  const { data, loading } = useFetch<CategoryType | BrandType>(
    `/${path[1]}/${path[2]}`
  );

  if (loading || !data?._id) return <Loading />;

  return (
    <div>
      <CategoryForm item={data ?? undefined} />
    </div>
  );
};

export default CategoryUpdate;
