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
} from './pages';
import useFetch from './hooks/useFetch';

const App: React.FC = () => {
  const { data, loading } = useFetch<FetchResponseProp>('/api/v1/user/me');

  if (loading) return <Loading />;

  const isAuth = data?.user?._id;

  return (
    <div className='bg-[#F3F4F6]'>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<PrivateRoute isAuth={isAuth} />}>
            <Route index element={<Dashboard />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/products' element={<Products />} />
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
