import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function KakaoApiShare({ title, address, Thumbnail }) {
  const location = useLocation();
  const webUrl = `${window.location.origin}${location.pathname}`;
  const imageUrl = `http://localhost:3000/${Thumbnail}`; // public 폴더의 이미지 URL

  const handleShare = async () => {
    console.log(title, address, imageUrl);

    try {
      // 이미지 가져오기
      const response = await fetch(imageUrl);

      // 응답 상태 확인
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob(); // Blob으로 변환
      console.log('Blob:', blob); // Blob 상태 확인

      const file = new File([blob], 'thumbnail.webp', { type: blob.type }); // 파일 객체 생성
      console.log('File:', file); // 파일 객체 상태 확인

      // Kakao API에 이미지 업로드
      const uploadResponse = await window.Kakao.Share.uploadImage({
        file: file, // 업로드할 파일
      });
      const uploadedImageUrl = uploadResponse.infos.original.url; // 업로드된 이미지 URL

      // 공유 버튼 생성
      if (window.Kakao) {
        window.Kakao.Share.createDefaultButton({
          container: '#kakaotalk-sharing-btn',
          objectType: 'feed',
          content: {
            title: title,
            description: address,
            imageUrl: uploadedImageUrl, // 업로드된 이미지 URL
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
        console.error("Kakao가 초기화되지 않았습니다.");
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  useEffect(() => {
    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('6ce94ba3ce787fda2efe59c95e6bc036'); // 카카오 JavaScript 키
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