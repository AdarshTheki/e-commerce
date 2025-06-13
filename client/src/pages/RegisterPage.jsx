import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../utils";
import { axios } from "../helper";

const Register = () => {
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const fullName = e.target.fullName.value;

    try {
      if (password !== confirmPassword) {
        return toast.error("please check your password");
      }
      const register = await axios.post("/user/sign-up", {
        email,
        password,
        fullName,
        role: "customer",
      });

      if (register.data) {
        toast.success("User register succeeded");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <section className="flex items-center justify-center p-4 min-h-[80vh]">
      <div className="w-full max-w-md space-y-8">
        {/* <!-- Register Form --> */}
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Create account</h2>
            <p className="text-gray-600 mt-2">Sign up for a new account</p>
          </div>

          <form onSubmit={handelSubmit} className="space-y-4">
            <Input name="fullName" type="text" label="fullName" />
            <Input name="email" type="email" label="Email" />
            <Input name="password" type="text" label="Password" />
            <Input
              name="confirmPassword"
              type="text"
              label="Confirm Password"
            />

            <button
              type="submit"
              className="w-full mt-5 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?
            <NavLink
              to={"/login"}
              className="text-indigo-600 mx-2 font-medium underline hover:text-indigo-500">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
