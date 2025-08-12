import React, { useState } from 'react';
import { axios } from '../config';
import { useSelector } from 'react-redux';

const ForgotPasswordRequest = () => {
  const { user } = useSelector((s) => s.auth);
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('/user/forgot-password', { email });
      if (res.data)
        setMessage(
          res.data.message || 'Password reset link sent to your email.'
        );
    } catch (err) {
      setMessage(
        err.response.data.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 rounded-lg text-white py-2 hover:bg-indigo-700 disabled:bg-indigo-300 transition">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-800">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordRequest;
