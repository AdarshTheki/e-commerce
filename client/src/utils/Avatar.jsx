import { classNames, getRandomTailwindColorWithHex } from "../helper";

const Avatar = ({ name, avatarUrl, className }) => {
  const fallbackLetter = name?.charAt(0).toUpperCase() || "?";

  const { hex } = getRandomTailwindColorWithHex("dark");

  return (
    <div
      style={{ background: hex }}
      className={classNames(
        "w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold overflow-hidden",
        className
      )}>
      {!avatarUrl ? (
        <span className="font-semibold text-white">{fallbackLetter}</span>
      ) : (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
    </div>
  );
};

export default Avatar;
