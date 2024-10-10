import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import LoginPopup from './pages/Login/LoginPopup';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //    errorElement: < />, // 404페이지
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/login-opup', element: <LoginPopup /> }
      // {
      //   path: '/products/new',
      //   element: <NewProduct />,
      //   children: [
      //     { path: 'new2', element: <NewProduct2 /> }
      //   ]
      // },
      // { path: '/products/:id', element: <ProductDetail /> },
      // { path: '/carts', element: <MyCart /> },
      // { path: '/joinForm', element: <JoinForm /> },
      // { path: '/loginForm', element: <LoginForm /> },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

