const OAuthButtons = () => {
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

  const handleOAuthLogin = (provider) => {
    window.location.href = `${BACKEND_URL}/api/v1/user/${provider}`;
  };

  return (
    <div className="flex flex-col gap-4 mb-4 mx-5">
      <button
        onClick={() => handleOAuthLogin("google")}
        className="flex items-center justify-center gap-2 hover:scale-105 duration-200 border px-4 py-2 rounded-xl bg-white shadow text-black">
        <img src="./google.svg" className="h-6 w-6" /> Continue with Google
      </button>

      <button
        onClick={() => handleOAuthLogin("github")}
        className="flex items-center justify-center gap-2 hover:scale-105 duration-200 border px-4 py-2 rounded-xl bg-black shadow text-white">
        <img src="./github.svg" className="h-6 w-6" /> Continue with GitHub
      </button>
    </div>
  );
};

export default OAuthButtons;
