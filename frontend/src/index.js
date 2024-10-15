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

import PageEventList from './pages/Event/PageEventList';          //이벤트리스트 페이지
import PageEventDetail from './pages/Event/PageEventDetail';      //이벤트상세 페이지

import PageAdminHome from './pages/Admin/PageAdminHome';          //관리자 홈 페이지
import PageEventManager from './pages/Admin/PageEventManager';    //이벤트관리 페이지
import PageReviewManager from './pages/Admin/PageReviewManager';  //리뷰관리 페이지
import PageUserManager from './pages/Admin/PageUserManager';      //사용자관리 페이지
import MyPage from './pages/MyPage/MyPage';                       // 마이 페이지
import WishList from './pages/MyPage/Wish/WishList';              // 찜 목록 페이지
import Profile from './pages/MyPage/Profile/Profile';             // 내 정보 관리 페이지
import BookingHistory from './pages/MyPage/BookingHistory/BookingHistory';

import RoomList from './pages/Hotel/RoomList';

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
      { path: '/event-list', element: <PageEventList /> },
      { path: '/event-detail', element: <PageEventDetail /> },
      { path: '/admin-home', element: <PageAdminHome /> },
      { path: '/admin-event', element: <PageEventManager /> },
      { path: '/admin-review', element: <PageReviewManager /> },
      { path: '/admin-user', element: <PageUserManager /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/wishlist', element: <WishList /> },
      { path: '/roomList', element: <RoomList /> },
      { path: '/profile', element: <Profile /> },
      { path: '/bookingHistory', element: <BookingHistory /> },

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
  <RouterProvider router={router} />
);
