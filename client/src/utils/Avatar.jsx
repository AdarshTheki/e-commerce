import { classNames, getRandomTailwindColorWithHex } from "../helper";

const Avatar = ({ name, avatarUrl, className }) => {
  const fallbackLetter = name?.charAt(0).toUpperCase() || "?";

  const { hex } = getRandomTailwindColorWithHex("dark");

  const avatar = `https://placehold.co/100x100/${hex.replace("#", "")}/ffff?text=${fallbackLetter}`;

  return (
    <div
      className={classNames(
        "w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold overflow-hidden",
        className
      )}>
      <img
        src={avatarUrl || avatar}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
    </div>
  );
};

export default Avatar;
