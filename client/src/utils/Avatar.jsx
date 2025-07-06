import { classNames } from "../helper";

const Avatar = ({ name, avatarUrl, className }) => {
  const fallbackLetter = name?.charAt(0).toUpperCase() || "?";

  return (
    <div
      className={classNames(
        "w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold overflow-hidden",
        className
      )}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ) : (
        <span>{fallbackLetter}</span>
      )}
    </div>
  );
};

export default Avatar;
