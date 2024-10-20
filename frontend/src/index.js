import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// 효준
import Home from './pages/Home/Home'                                        // 메인 페이지
import Login from './pages/Login/Login';                                    // 로그인 페이지
import LoginPopup from './pages/Login/LoginPopup';                          // 소셜 로그인 팝업 페이지
import Payment from './pages/MyPage/BookingHistory/Payment/Payment'         // 결제 내역 페이지
import MyPage from './pages/MyPage/MyPage';                                 // 마이페이지 - 메인
import WishList from './pages/MyPage/Wish/WishList';                        // 마이페이지 - 찜 내역
import Profile from './pages/MyPage/Profile/Profile';                       // 마이페이지 - 내 정보 관리
import BookingHistory from './pages/MyPage/BookingHistory/BookingHistory';  // 마이페이지 - 예매 내역
import MyReview from './pages/MyPage/MyReview/MyReview'                     // 마이페이지 - 리뷰 내역
import MyPoint from './pages/MyPage/MyPoint/MyPoint'                        // 마이페이지 - 포인트 내역
import Reservation from './pages/Reservation/Reservation'                   // 예약 결제 페이지


// 교훈
import HotelList from './pages/Hotel/HotelList';                            // 호텔 리스트 페이지
import RoomList from './pages/Hotel/RoomList';                              // 객실 리스트 페이지
import HotelMap from './pages/Hotel/HotelMap';                              // 지도 페이지


// 정일
import PageEventList from './pages/Event/PageEventList';                    // 이벤트리스트 페이지
import PageEventDetail from './pages/Event/PageEventDetail';                // 이벤트상세 페이지
import PageAdminHome from './pages/Admin/PageAdminHome';                    // 관리자 페이지 - 메인
import PageEventManager from './pages/Admin/PageEventManager';              // 관리자 페이지 - 이벤트 관리
import PageReviewManager from './pages/Admin/PageReviewManager';            // 관리자 페이지 - 리뷰 관리
import PageUserManager from './pages/Admin/PageUserManager';                // 관리자 페이지 - 사용자 관리


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

      // 효준
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/login-popup', element: <LoginPopup /> },
      { path: '/payment', element: <Payment /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/wishlist', element: <WishList /> },
      { path: '/profile', element: <Profile /> },
      { path: '/booking-history', element: <BookingHistory />},
      { path: '/my-point', element: <MyPoint /> },
      { path: '/my-review', element: <MyReview /> },
      { path: '/reservation', element: <Reservation />},


      // 교훈
      { path: '/hotelList', element: <HotelList /> },
      { path: '/roomList', element: <RoomList /> },
      { path: '/hotelMap', element: <HotelMap /> },


      // 정일
      { path: '/event-list', element: <PageEventList /> },
      { path: '/event-detail', element: <PageEventDetail /> },
      { path: '/admin-home', element: <PageAdminHome /> },
      { path: '/admin-event', element: <PageEventManager /> },
      { path: '/admin-review', element: <PageReviewManager /> },
      { path: '/admin-user', element: <PageUserManager /> },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
