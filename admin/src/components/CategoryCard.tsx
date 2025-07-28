import { LazyImage } from '@/components/ui';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const CategoryCard = ({
  status,
  title,
  createdAt,
  thumbnail,
}: CategoryType) => {
  return (
    <div
      className="w-full bg-white overflow-hidden rounded-lg text-slate-700 shadow-sm hover:shadow-md transition duration-300 group animate-fadeIn"
      style={{ animationDelay: '100ms' }}>
      <LazyImage
        src={thumbnail}
        placeholder={'/placeholder.jpg'}
        alt={title}
        className="w-full h-[200px] object-cover transform group-hover:scale-105 transition duration-500"
      />

      <div className="p-4 bg-white">
        <p className="sm:text-lg text-base text-gray-600 capitalize leading-[1.4] font-medium sm:line-clamp-1 line-clamp-2">
          {title}
        </p>
        <div className="text-sm mt-2 text-slate-500 flex items-center justify-between">
          <span>{format(new Date(createdAt), 'dd MMM yyyy, h:mm a')}</span>
          <span
            className={cn(
              status === 'active' ? 'status-active' : 'status-inactive'
            )}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
