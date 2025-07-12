import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loading } from './components/ui';
import {
    CategoryForm,
    PrivateRoute,
    ProductForm,
    UserForm,
} from './components';
import {
    Login,
    Register,
    Notfound,
    Dashboard,
    Customers,
    ProfileSettings,
    Products,
    ProductUpdate,
    Categories,
    CustomerUpdate,
    CategoryUpdate,
    Order,
} from './pages';
import useFetch from './hooks/useFetch';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from './redux/authSlice';
import { fetchCategories } from './redux/categorySlice';
import { fetchBrands } from './redux/brandSlice';
import { AppDispatch } from './redux/store';

const App: React.FC = () => {
    const { data, loading } = useFetch<UserType | null>('/user/current-user');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (data?.role === 'admin' || data?.role === 'seller') {
            dispatch(login(data));
        } else if (data?.role === 'customer') {
            alert('You are not authorized to access this page');
        }
    }, [dispatch, data]);

    useEffect(() => {
        dispatch(fetchBrands());
        dispatch(fetchCategories());
    }, [dispatch]);

    if (loading) return <Loading />;

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path=""
                        element={
                            <PrivateRoute
                                isAuth={
                                    data?.role === 'admin' ||
                                    data?.role === 'seller'
                                }
                            />
                        }>
                        <Route index element={<Dashboard />} />
                        <Route path="/customer" element={<Customers />} />
                        <Route path="/customer/create" element={<UserForm />} />
                        <Route
                            path="/customer/:id"
                            element={<CustomerUpdate />}
                        />
                        <Route path="/product" element={<Products />} />
                        <Route
                            path="/product/:id"
                            element={<ProductUpdate />}
                        />
                        <Route
                            path="/product/create"
                            element={<ProductForm />}
                        />

                        <Route path="/category" element={<Categories />} />
                        <Route path="/brand" element={<Categories />} />
                        <Route
                            path="/category/create"
                            element={<CategoryForm />}
                        />
                        <Route
                            path="/brand/create"
                            element={<CategoryForm />}
                        />
                        <Route
                            path="/category/:id"
                            element={<CategoryUpdate />}
                        />
                        <Route path="/brand/:id" element={<CategoryUpdate />} />
                        <Route path="/profile" element={<ProfileSettings />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="*" element={<Notfound />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
