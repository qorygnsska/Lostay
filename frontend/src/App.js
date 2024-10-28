import { Outlet } from "react-router-dom";
import "./App.css";

// CustomCSS for components
import "../src/componets/Admin/AdminComponent.css";
import "../src/componets/BackNav/BackNav.css";
import "../src/componets/Carousel/HotelCarousel.css";
import "../src/componets/Carousel/EventCarousel.css";
import "../src/componets/Carousel/LocationCarousel.css";
import "../src/componets/Carousel/LocationHotelCarousel.css";
import "../src/componets/Event/EventComponent.css";
import "../src/componets/Footer/Footer.css";
import "../src/componets/Header/HeaderComponent.css";
import "../src/componets/Navbar/Navbar.css";
import "../src/componets/NavToTop/NavTop.css";
import "../src/componets/Search/SearchComponent.css";
import "../src/componets/MyPage/WishList/WishList.css";
import "../src/componets/Hotel/HotelCarousel.css";
import "../src/componets/MyPage/BookingHistory/BookingHistory.css";
import "../src/componets/Map/KakaoMap.css";
import "../src/componets/MyPage/MyReview/MyReview.css";
import "../src/componets/MyPage/MyPoint/MyPoint.css";
import "../src/componets/MyPage/BookingHistory/ReviewModal.css";
import "../src/componets/MyPage/BookingHistory/PreviewImg.css";
import "../src/componets/Toast/Toast.css";
import "../src/componets/Reservation/PayType.css";
import "../src/componets/Reservation/AgreeInfo.css";
import "../src/componets/Reservation/AgreeChkInfo.css";
import "../src/componets/Room/RoomGrid.css";
import "../src/componets/Hotel/HotelIntroduce.css";
import "../src/componets/Hotel/HotelService.css";
import "../src/componets/Hotel/HotelReview.css";
import "../src/componets/RoomNav/RoomNav.css";
import "../src/componets/MyPage/BookingHistory/OkCancleModal.css"
import "../src/componets/HotelReview/ReImgModal.css";
import "../src/componets/HotelReview/AllImgModal.css";
import "../src/componets/HotelReview/RoomFilterModal.css";
import "../src/componets/HotelReview/RoomOrderModal.css";
import "../src/componets/Carousel/ReviewCarousel.css"


// CustomCSS for pages
import "../src/pages/Admin/AdminPage.css";
import "../src/pages/Event/EventPage.css";
import "../src/pages/Home/Home.css";
import "../src/pages/Hotel/HotelList.css";
import "../src/pages/Login/Login.css";
import "../src/pages/MyPage/MyPage.css";
import "../src/pages/Hotel/HotelList.css";
import "../src/pages/MyPage/Wish/WishList.css";
import "../src/pages/MyPage/Profile/Profile.css";
import "../src/pages/Hotel/RoomList.css";
import "../src/pages/MyPage/BookingHistory/BookingHistory.css";
import "../src/pages/Hotel/HotelMap.css";
import "../src/pages/MyPage/BookingHistory/Payment/Payment.css";
import "../src/pages/MyPage/MyReview/MyReview.css";
import "../src/pages/MyPage/MyPoint/MyPoint.css";
import "../src/pages/Reservation/Reservation.css";
import "../src/pages/Hotel/RoomDetail.css";
import "../src/pages/Hotel/HotelReviews.css";
import "../src/pages/Login/LoginPhone.css"

function App() {
    return (
        <div className="App">
            <div className="App-Container">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
