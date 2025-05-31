import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md text-center">
        <ShoppingCart className="w-20 h-20 text-gray-400 mb-4 mx-auto" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven’t added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
