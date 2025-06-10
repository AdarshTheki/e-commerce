import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  HeartFavorite,
  HomeCertificate,
  HomeNew,
  HomeWishlist,
  ProductReview,
} from "../components";
import { Loading } from "../utils";
import errorHandler from "../helper/errorHandler";
import instance from "../helper/axiosInstance";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("black");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await instance.get(`/product/${id}`);
        if (res.data) {
          setProduct(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const res = await instance.post(`/cart`, { productId, quantity });
      if (res.data) {
        toast.success("Add to cart success");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <section>
      <div className="mx-auto max-w-6xl p-4 text-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* <!-- Product Images --> */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg">
              <img
                src={product?.thumbnail || "https://placehold.co/600x600"}
                alt="Product"
                className="object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }, (_, index) => (
                <button
                  key={index}
                  className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg">
                  <img
                    src={
                      product?.images[index] || "https://placehold.co/150x150"
                    }
                    alt={index + "_Product-images"}
                    className="object-cover w-full h-full rounded-lg transition-opacity duration-300 opacity-100"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* <!-- Product Info --> */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="text-yellow-400" />
                  <span className="ml-2 text-sm ">(128 reviews)</span>
                </div>
                <span className="text-green-600">In Stock</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-3xl font-bold">${product?.price}</span>
                <span className="ml-4 text-lg  line-through">
                  ${(product?.price / (1 - product?.discount / 100)).toFixed(2)}
                </span>
                <span className="ml-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
                  {product?.discount}% OFF
                </span>
              </div>
              <p className="text-sm ">Price includes VAT</p>
            </div>

            {/* <!-- Color Selection --> */}
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex space-x-3">
                {["black", "blue", "gray"].map((i) => (
                  <button
                    onClick={() => setColor(i)}
                    style={{ background: i }}
                    key={i}
                    className={`w-8 h-8 rounded-full cursor-pointer ${
                      i === color && "ring-2 ring-offset-2 ring-black"
                    }`}></button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xl capitalize">{product?.brand}</span>
              <span className="px-4 py-1 ml-4 capitalize rounded-lg bg-gray-100">
                {product?.category}
              </span>
              <p className="pt-5">{product?.description}</p>
            </div>

            {/* <!-- Quantity --> */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg border-gray-300">
                  <button
                    onClick={() =>
                      setQuantity((pre) => (pre === 1 ? 1 : pre - 1))
                    }
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    -
                  </button>
                  <button className="px-4 text-center border-x border-gray-300">
                    {quantity}
                  </button>
                  <button
                    onClick={() =>
                      setQuantity((pre) =>
                        pre === product?.stock ? product?.stock : pre + 1
                      )
                    }
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    +
                  </button>
                </div>
                <span className="text-sm ">
                  {product?.stock - quantity} items available
                </span>
              </div>
            </div>

            {/* <!-- Actions --> */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleAddToCart(product?._id || "", quantity)}
                className="flex-1 bg-blue-600 max-w-56 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>

              <HeartFavorite
                id={id || ""}
                className="py-2 px-3 border rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <HomeCertificate />

      <ProductReview />

      <HomeWishlist />
    </section>
  );
};

export default ProductDetail;
