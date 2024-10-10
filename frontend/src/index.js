import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import LoginPopup from './pages/Login/LoginPopup';
import HotelList from './pages/Hotel/HotelList';
import EventList from './pages/Event/EventList'; //이벤트리스트 페이지
import EventDetail from './pages/Event/EventDetail'; //이벤트상세 페이지
import EventManager from './pages/Admin/EventManager'; //이벤트관리 페이지
import ReviewManager from './pages/Admin/ReviewManager'; //리뷰관리 페이지
import UserManager from './pages/Admin/UserManager'; //사용자관리 페이지




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //    errorElement: < />, // 404페이지
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/hotelList', element: <HotelList /> },
      { path: '/login-popup', element: <LoginPopup /> },
      { path: '/event-list', element: <EventList />},
      { path: '/event-detail', element: <EventDetail />},
      { path: '/admin-event', element: <EventManager />},
      { path: '/admin-review', element: <ReviewManager />},
      { path: '/admin-user', element: <UserManager />}

      
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

