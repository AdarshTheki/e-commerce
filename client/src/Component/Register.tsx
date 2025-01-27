import React from 'react';
import { Input } from '../Utils';
import { NavLink, useNavigate } from 'react-router-dom';
import instance from '../axiosInstance';

const Register = () => {
  const navigate = useNavigate();

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const conPassword = (form.elements.namedItem('confirm-password') as HTMLInputElement).value;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;

    try {
      if (password !== conPassword) {
        throw new Error('please check your password');
      }
      await instance.post('/users/sign-up', { email, password, username }).then((data) => {
        console.log(data.data);
        navigate('/login');
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id='auth' className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        {/* <!-- Register Form --> */}
        <div
          className='bg-white p-8 rounded-lg border border-gray-200'
          x-show='isRegister'
          x-cloak=''>
          <div className='text-center mb-8'>
            <h2 className='text-2xl font-bold text-gray-900'>Create account</h2>
            <p className='text-gray-600 mt-2'>Sign up for a new account</p>
          </div>

          <form className='space-y-6' onSubmit={handelSubmit}>
            <Input name='username' type='text' label='Username' autoComplete='off' />
            <Input name='email' type='email' label='Email' autoComplete='off' />
            <Input name='password' type='text' label='Password' autoComplete='off' />
            <Input
              name='confirm-password'
              type='text'
              label='Confirm Password'
              autoComplete='off'
            />

            <label
              htmlFor='checkbox'
              className='gap-2 cursor-pointer text-sm flex items-center text-gray-600'>
              <input
                type='checkbox'
                id='checkbox'
                className='h-4 w-4 text-blue-600 border-gray-300 rounded'
                required
              />
              <span>I agree to the Terms and Privacy Policy</span>
            </label>

            <button
              type='submit'
              className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
              Create account
            </button>
          </form>

          <p className='mt-6 text-center text-sm text-gray-600'>
            Already have an account?
            <NavLink to={'/login'} className='text-blue-600 mx-2 hover:text-blue-500'>
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
