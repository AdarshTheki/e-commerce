import { ProductForm } from '../components';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { Loading } from '../utils';

const ProductUpdate = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/api/v1/product/${id}`);

  if (loading || error || !data?._id) return <Loading />;

  return <ProductForm data={data} />;
};

export default ProductUpdate;
