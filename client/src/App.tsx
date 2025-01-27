import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ProductUpdate,
  ProductCreate,
  ProductListing,
  ProfileSettings,
  CategoryListing,
} from './Admin/Pages';
import { PrivateRoute, Login, Register } from './Component';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Header, Footer } from './Utils';
import { login } from './Redux/authSlice';
import instance from './axiosInstance';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    instance
      .get('/users/me')
      .then((res) => dispatch(login(res?.data?.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <div className='bg-[#F3F4F6]'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<h2>Home....</h2>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<PrivateRoute />}>
            <Route path='product' element={<ProductListing />} />
            <Route path='category' element={<CategoryListing />} />
            <Route path='profile' element={<ProfileSettings />} />
            <Route path='product/create' element={<ProductCreate />} />
            <Route path='product/:id/update' element={<ProductUpdate />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
