import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Input, SpinnerBtn } from '../Utils';
import { login } from '../Redux/authSlice';
import axiosInstance from '../axiosInstance';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    axiosInstance
      .post('/users/sign-in', { email, password })
      .then((res) => {
        setLoading(true);
        if (res.data?.data) {
          document.cookie = `token=${res.data?.data?.accessToken}`;
          dispatch(login(res.data?.data?.user));
          navigate('/');
        } else {
          alert('internal server error');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <section className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        {/* <!-- Login Form --> */}
        <div className='bg-white p-8 rounded-lg border border-gray-200'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl font-bold text-gray-900'>Welcome back</h2>
            <p className='text-gray-600 mt-2'>Sign in to your account</p>
          </div>

          <form className='space-y-6' onSubmit={handelSubmit}>
            <Input name='email' type='email' label='Email' autoComplete='off' />
            <Input name='password' type='password' label='Password' autoComplete='off' />

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='checkbox'
                  type='checkbox'
                  className='h-4 w-4 text-blue-600 border-gray-300 rounded'
                  required
                />
                <label htmlFor='checkbox' className='ml-2 cursor-pointer text-sm text-gray-600'>
                  Remember me
                </label>
              </div>
              <NavLink to='/' className='text-sm text-blue-600 hover:text-blue-500'>
                Forgot password?
              </NavLink>
            </div>

            <div className='flex items-center w-full justify-center'>
              <SpinnerBtn
                loading={loading}
                className='w-full'
                primaryName='Sign in'
                props={{ type: 'submit' }}
              />
            </div>
          </form>

          <p className='mt-6 text-center text-sm text-gray-600'>
            Don't have an account?
            <NavLink to={'/register'} className='text-blue-600 mx-2 hover:text-blue-500'>
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
