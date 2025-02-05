import React from 'react';
import { Layout, PrivateRoute } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  Notfound,
  RegisterPage,
  SettingPage,
  CartsPage,
  CategoriesPage,
  CheckoutPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
} from './pages';
import { Footer, Header, Loading } from './utils';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/setting' element={<SettingPage />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
