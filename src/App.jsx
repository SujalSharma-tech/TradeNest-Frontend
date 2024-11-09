import "./layout.scss";

import "./App.css";
import Homepage from "./routes/homepage/Homepage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./routes/Layout/Layout";
import BuyExchange from "./routes/buyexchange/BuyExchange";
import SingleProductPage from "./routes/singleproduct/SingleProductPage";
import SignupPage from "./routes/signup/SignupPage";
import LoginPage from "./routes/login/LoginPage";
import UserProducts from "./routes/userproducts/UserProducts";
import CreateListing from "./routes/createlisting/CreateListing";
import { useEffect, useState } from "react";
import { useAppStore } from "./store/index";
import { apiClient } from "./lib/api-client";
import { GET_ALL_PRODUCTS_ROUTE, GET_USER_INFO } from "./utils/constants";
const App = () => {
  const { userInfo, setUserInfo, products, setProducts, setProductsTriggered } =
    useAppStore();
  const isProductsTriggered = useAppStore((state) => state.isProductsTriggered);
  const [loading, setLoading] = useState(true);
  const [isProductsFetched, setIsProductsFetched] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (data) {
          console.log(data);
          setUserInfo(data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    const getAllProducts = async () => {
      try {
        const data = await apiClient.get(GET_ALL_PRODUCTS_ROUTE);
        if (data) {
          setProducts(data.data.products);
          setIsProductsFetched(true);
          console.log(data.data.products);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!isProductsFetched || isProductsTriggered) {
      getAllProducts();
      setProductsTriggered(false);
    }

    if (!userInfo) {
      getUserInfo();
    }
  }, [
    setUserInfo,
    userInfo,
    products,
    setProducts,
    isProductsTriggered,
    setProductsTriggered,
    isProductsFetched,
  ]);

  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    const isAuthenticated = !!userInfo;
    console.log("isauth:", userInfo);
    return isAuthenticated ? children : <Navigate to="/signup" />;
  };
  // eslint-disable-next-line react/prop-types
  const AuthRoute = ({ children }) => {
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to="/" /> : children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/buyexchange", element: <BuyExchange /> },
        { path: "/productdetails/:id", element: <SingleProductPage /> },
        {
          path: "/signup",
          element: (
            <AuthRoute>
              <SignupPage />
            </AuthRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          ),
        },
        {
          path: "/mylistings",
          element: (
            <ProtectedRoute>
              <UserProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "/createlisting",
          element: (
            <ProtectedRoute>
              <CreateListing />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return loading ? (
    <h1>Loading... </h1>
  ) : (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
