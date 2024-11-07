import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ScrollToTop from "./scrollRestoration/ScrollToTop";

// 효준
import Home from "./pages/Home/Home";                                       // 메인 페이지
import Login from "./pages/Login/Login";                                    // 로그인 페이지
import LoginPopup from "./pages/Login/LoginPopup";                          // 소셜 로그인 팝업 페이지
import LoginPhone from "./pages/Login/LoginPhone";                          // 소셜 휴대폰번호 인증 팝업 페이지
import LoginAdmin from "./pages/Login/LoginAdmin";                          // 어드민 로그인
import MyPage from "./pages/MyPage/MyPage";                                 // 마이페이지 - 메인
import WishList from "./pages/MyPage/Wish/WishList";                        // 마이페이지 - 찜 내역
import Profile from "./pages/MyPage/Profile/Profile";                       // 마이페이지 - 내 정보 관리
import BookingHistory from "./pages/MyPage/BookingHistory/BookingHistory";  // 마이페이지 - 예매 내역
import MyReview from "./pages/MyPage/MyReview/MyReview";                    // 마이페이지 - 리뷰 내역
import MyPoint from "./pages/MyPage/MyPoint/MyPoint";                       // 마이페이지 - 포인트 내역
import Reservation from "./pages/Reservation/Reservation";                  // 예약 결제 페이지

// 교훈
import HotelList from "./pages/Hotel/HotelList";        // 호텔 리스트 페이지
import RoomList from "./pages/Hotel/RoomList";          // 객실 리스트 페이지
import HotelMap from "./pages/Hotel/HotelMap";          // 지도 페이지
import RoomDetail from "./pages/Hotel/RoomDetail";      // 객실 상세 페이지
import HotelReviews from "./pages/Hotel/HotelReviews";  // 호텔 전체 리뷰 페이지

// 정일
import PageEventList from "./pages/Event/PageEventList";            // 이벤트리스트 페이지
import PageEventDetail from "./pages/Event/PageEventDetail";        // 이벤트상세 페이지
import PageAdminHome from "./pages/Admin/PageAdminHome";            // 관리자 페이지 - 메인
import PageEventManager from "./pages/Admin/PageEventManager";      // 관리자 페이지 - 이벤트 관리
import PageHotelManager from "./pages/Admin/PageHotelManager";      // 관리자 페이지 - 호텔 객실 관리
import PageReviewManager from "./pages/Admin/PageReviewManager";    // 관리자 페이지 - 리뷰 관리
import PageUserManager from "./pages/Admin/PageUserManager";        // 관리자 페이지 - 사용자 관리
import PageHotelChart from "./pages/Admin/PageHotelChartManager";   // 관리자 페이지 - 호텔 차트 보기
import ToAdminLogin from "./redirectors/ToAdminLogin";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // 효준
            { index: true, element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/login-popup", element: <LoginPopup /> },
            { path: "/login-phone", element: <LoginPhone /> },
            { path: "/admin-login", element: <LoginAdmin /> },
            { path: "/mypage", element: <MyPage /> },
            { path: "/wishlist", element: <WishList /> },
            { path: "/profile", element: <Profile /> },
            { path: "/booking-history", element: <BookingHistory /> },
            { path: "/my-point", element: <MyPoint /> },
            { path: "/my-review", element: <MyReview /> },
            { path: "/reservation", element: <Reservation /> },

            // 교훈
            { path: "/hotelList", element: <HotelList /> },
            { path: "/roomList/:hotelNo", element: <RoomList /> },
            { path: "/hotelMap", element: <HotelMap /> },
            { path: "/roomDetail/:roomNo", element: <RoomDetail /> },
            { path: "/hotelReviews/:hotelNo/:roomNoo", element: <HotelReviews /> },

            // 정일
            { path: "/event-list", element: <PageEventList /> },
            { path: "/event-detail/:no", element: <PageEventDetail /> },
            { path: "/admin-home", element: <PageAdminHome /> },
            { path: "/admin-hotel", element: <PageHotelManager /> },
            { path: "/admin-user", element: <PageUserManager /> },
            { path: "/admin-event", element: <PageEventManager />, errorElement:<ToAdminLogin /> },
            { path: "/admin-review", element: <PageReviewManager /> },
            { path: "/admin-hotelchart", element: <PageHotelChart /> },

        ],
    },
]);

const persistor = persistStore(store);
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}>
                    <ScrollToTop />
                </RouterProvider>
            </QueryClientProvider>
        </PersistGate>
    </Provider>
);
