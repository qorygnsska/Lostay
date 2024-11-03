// kakaoApiShare.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function KakaoApiShare({ title, address ,Thumbnail}) {
  const location = useLocation(); // 현재 위치 가져오기
  const imageUrl = `http://localhost:3000/${Thumbnail}`;
  const webUrl = `${window.location.origin}${location.pathname}`; // 현재 URL 설정


  const handleShare = () => {
    console.log(title,address,imageUrl);
  
    if (window.Kakao) {
      window.Kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title: title,
          description: address,
          imageUrl: imageUrl,
          link: {
      
            webUrl: webUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
    
              webUrl: webUrl,
            },
          },
        ],
      });
    } else {
      console.error("Kakao is not initialized");
    }
  };

  useEffect(() => {
    // 카카오톡 JavaScript SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('6ce94ba3ce787fda2efe59c95e6bc036'); // 카카오톡 앱 JavaScript 키
      
    }
  }, []);

  return (
    <div>
      <a id="kakaotalk-sharing-btn" href="javascript:;" onClick={handleShare}>
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="카카오톡 공유하기 버튼"
        />
      </a>
    </div>
  );
}
