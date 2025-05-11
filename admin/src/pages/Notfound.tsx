import { NavLink } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <h1 className="text-4xl font-bold text-center mt-4">404 Not Found</h1>
        <p className="text-center mt-2">
          The page you are looking for does not exist. Please check the URL or
          return to the <NavLink to={"/admin"}>home page</NavLink>.
        </p>
      </div>
    </div>
  );
};

export default Notfound;
