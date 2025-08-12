import { classNames } from '../config';

const Avatar = ({ name, avatarUrl, className }) => {
  const fallbackLetter = name?.trim()?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <div
      style={{ background: '#777' }}
      className={classNames(
        'w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold overflow-hidden',
        className
      )}>
      {!avatarUrl ? (
        <span className="font-medium !text-white">{fallbackLetter}</span>
      ) : (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
    </div>
  );
};

export default Avatar;
