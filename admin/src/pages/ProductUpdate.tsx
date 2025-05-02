import { ProductForm } from "../components";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Loading } from "../utils";

const ProductUpdate = () => {
  const { id } = useParams();
  const { data, loading } = useFetch<ProductType>(`/product/${id}`);

  if (loading || !data?._id) return <Loading />;

  return <ProductForm data={data} />;
};

export default ProductUpdate;
