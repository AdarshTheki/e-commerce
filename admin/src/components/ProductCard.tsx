import { LazyImage } from '@/components/ui';
import { Star } from 'lucide-react';

const ProductCard = ({ item, delay }: { item: ProductType; delay: string }) => {
  return (
    <div
      className="w-full bg-white rounded-lg text-slate-700 shadow-sm hover:shadow-md transition duration-300 group animate-fadeIn"
      style={{ animationDelay: delay }}>
      <LazyImage
        src={item.thumbnail}
        placeholder={'/placeholder.jpg'}
        alt={item.title}
        className="w-full h-[200px] object-cover transform group-hover:scale-105 transition duration-500"
      />

      <div className="p-4">
        <p className="sm:text-lg text-base text-gray-600 leading-[1.4] font-medium sm:line-clamp-1 line-clamp-2">
          {item.title}
        </p>
        <p className="text-gray-600 text-sm mb-3 max-sm:hidden flex gap-2 justify-between capitalize">
          <span>{item.category && '#' + item.category}</span>
          <span>{item.brand && '#' + item.brand}</span>
        </p>
        <div className="flex items-center mt-2 justify-between">
          <span className="text-lg font-bold">${item.price}</span>
          <div className="ml-auto flex items-center text-amber-400">
            <Star className="w-4" fill="#fbbf24" />
            <span className="ml-1 text-sm text-gray-600">{item?.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
