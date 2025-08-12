import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { OAuthButtons } from '../components';

const Login = () => {
  const [email, setEmail] = useState('guest-user@gmail.com');
  const [password, setPassword] = useState('12345');
  const [rememberMe, setRememberMe] = useState(false);
  const [visible, setVisible] = useState(false);
  const { loginLoading, handleLogin } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password, rememberMe);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get('accessToken');
    if (t) {
      localStorage.setItem('accessToken', t);
      window.location.href = '/';
    }
  }, []);

  return (
    <section className="flex items-center justify-center p-4 min-h-[80dvh]">
      <div className="max-w-md w-full bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
        <h1 className="text-3xl text-center pb-5 font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
          Sign In
        </h1>

        <OAuthButtons />

        <form id="loginForm" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={visible ? 'text' : 'password'}
              id="password"
              name="password"
              required
              className="w-full py-2 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute top-12 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setVisible(!visible)}>
              {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            disabled={loginLoading}
            type="submit"
            className="w-full font-medium bg-indigo-600 rounded-lg text-white py-2 hover:bg-indigo-700 disabled:bg-indigo-300 transition">
            {loginLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="text-blue-600 pl-2 hover:text-blue-800 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
