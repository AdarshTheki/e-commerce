import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loading } from './utils';
import { PrivateRoute } from './components';
import {
  Login,
  Register,
  Notfound,
  Analytics,
  Dashboard,
  Customers,
  Inventory,
  Products,
  ProductUpdate,
  ProductCreate,
  ProfileSettings,
} from './pages';
import useFetch from './hooks/useFetch';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from './redux/authSlice';

const App: React.FC = () => {
  const { data, loading } = useFetch('/api/v1/user/current-user');
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?._id) {
      dispatch(login(data));
    }
  }, [data]);

  if (loading) return <Loading />;

  const isAuth = data?._id;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<PrivateRoute isAuth={isAuth} />}>
            <Route index element={<Dashboard />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<ProductUpdate />} />
            <Route path='/products/create' element={<ProductCreate />} />
            <Route path='/settings' element={<ProfileSettings />} />
            <Route path='*' element={<Notfound />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
