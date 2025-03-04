import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  Notfound,
  RegisterPage,
  SettingPage,
  CartsPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
} from './pages';
import useFetch from './hooks/useFetch';
import { Footer, Header, MenuBar, PrivateRoute, TopBar } from './components';
import { Loading } from './utils';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';

const App = () => {
  const { data, loading } = useFetch('/api/v1/user/current-user');
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?._id) {
      dispatch(login(data));
    }
  }, [data, dispatch]);

  if (loading) return <Loading />;

  return (
    <div className='w-full'>
      <Router>
        <TopBar />
        <Header />
        <MenuBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/setting' element={<SettingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/product' element={<ProductsPage />} />
          <Route path='/product/:id' element={<SingleProductPage />} />
          <Route element={<PrivateRoute isAuth={data?._id} />}>
            <Route path='/cart' element={<CartsPage />} />
          </Route>
          <Route path='*' element={<Notfound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
