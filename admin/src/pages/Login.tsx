import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { errorHandler, axiosInstance } from '@/lib/utils';

const Login = () => {
    const [email, setEmail] = useState('guest-user@gmail.com');
    const [password, setPassword] = useState('12345');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (!email || !password)
                return toast.error('please fill the valid inputs');
            const { data } = await axiosInstance.post('/user/sign-in', {
                email,
                password,
            });
            if (data) {
                localStorage.setItem('accessToken', data.accessToken);
                window.location.href = '/';
            }
        } catch (err) {
            errorHandler(err as AxiosError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex items-center justify-center p-4 min-h-screen">
            <div className="max-w-md w-full bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
                <h1 className="text-3xl text-center pb-5 font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                    Sign In
                </h1>

                <form
                    id="loginForm"
                    className="space-y-6"
                    onSubmit={handelSubmit}>
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
                            required={true}
                            autoComplete="off"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2">
                            Password{' '}
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={visible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            required={true}
                            autoComplete="off"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="top-10 right-5 absolute avg-btn"
                            onClick={() => setVisible(!visible)}>
                            {!visible ? <Eye /> : <EyeOff />}
                        </button>
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?
                        <Link
                            to="/register"
                            className="text-blue-600 pl-2 hover:text-blue-800 font-medium"
                            target="_self">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
