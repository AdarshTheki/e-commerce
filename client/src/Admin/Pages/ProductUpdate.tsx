import { ProductForm } from '../Components';
import { useFetch } from '../../Utils';
import { useParams } from 'react-router-dom';

const ProductUpdate = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`/products/${id}`);

    if (loading || error) return <h2>loading {error}</h2>;

    if (data?._id) return <h2>Product not found</h2>;

    return (
        <div className='sm:p-6'>
            <ProductForm data={data?.data} />
        </div>
    );
};

export default ProductUpdate;
