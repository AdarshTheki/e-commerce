const Avatar = ({ name, avatarUrl }) => {
  const fallbackLetter = name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold overflow-hidden">
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
