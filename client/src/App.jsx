import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Import Pages
import {
  FavoritePage,
  GalleryPage,
  HomePage,
  LoginPage,
  OrderFailed,
  OrderListing,
  OrderSuccess,
  ProductsPage,
  RegisterPage,
  Setting,
  ShippingAddress,
  ShoppingCartPage,
  SingleProductPage,
  ChatPage,
} from "./pages";
import RootLayout from "./RootLayout";

import {
  AIDashboard,
  AILayout,
  BlogTitles,
  GenerateImages,
  ImageTransformations,
  ReviewResume,
  WriteArticles,
} from "./pages/AI";
import { NotFound } from "./utils";

// Protected Layout for authenticated routes
const ProtectedLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id", element: <SingleProductPage /> },
      { path: "gallery", element: <GalleryPage /> },
      {
        element: <ProtectedLayout />,
        children: [
          { path: "cart", element: <ShoppingCartPage /> },
          { path: "shipping-address", element: <ShippingAddress /> },
          { path: "setting", element: <Setting /> },
          { path: "favorite", element: <FavoritePage /> },
          { path: "order/failed", element: <OrderFailed /> },
          { path: "order/success", element: <OrderSuccess /> },
          { path: "orders", element: <OrderListing /> },
          { path: "message", element: <ChatPage /> },
          {
            path: "ai",
            element: <AILayout />,
            children: [
              { index: true, element: <AIDashboard /> },
              { path: "write-articles", element: <WriteArticles /> },
              { path: "blog-titles", element: <BlogTitles /> },
              { path: "generate-images", element: <GenerateImages /> },
              {
                path: "image-transformation",
                element: <ImageTransformations />,
              },
              { path: "review-resume", element: <ReviewResume /> },
            ],
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
