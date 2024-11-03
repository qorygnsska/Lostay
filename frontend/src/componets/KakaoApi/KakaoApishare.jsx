// kakaoApiShare.jsx
import React, { useEffect } from 'react';

export default function KakaoApiShare() {
  // 공유할 내용 정의
  const title = '호텔 이름';
  const description = '호텔 설명';
  const imageUrl = 'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png';
  const mobileWebUrl = 'https://developers.kakao.com';
  const webUrl = 'https://developers.kakao.com';

  const handleShare = () => {
    console.log('Sharing initiated...');

    if (window.Kakao) {
      window.Kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: mobileWebUrl,
            webUrl: webUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: mobileWebUrl,
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
    if (window.Kakao) {
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
