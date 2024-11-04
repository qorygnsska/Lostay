import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AWS from 'aws-sdk';

export default function KakaoApiShare({ title, address, Thumbnail }) {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState(null);
  const webUrl = `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    // AWS S3 설정
    AWS.config.update({
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    });

    // S3 객체 생성
    const s3 = new AWS.S3();

    // Thumbnail이 정의되어 있을 때만 실행
    if (Thumbnail) {
      const uploadImageToS3 = async () => {
        try {
          const response = await fetch(`http://localhost:3000/${Thumbnail}`);
          const blob = await response.blob();

          const params = {
            Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
            Key: `thumbnails/${Thumbnail.split('/').pop()}`, // 파일명 추출
            Body: blob,
            ACL: 'public-read',
            ContentType: 'image/webp', // 파일 형식 지정
          };

          s3.upload(params, (err, data) => {
            if (err) {
              console.error('S3 업로드 실패:', err);
            } else {
              console.log('S3 업로드 성공:', data.Location);
              setImageUrl(data.Location); // 업로드된 이미지 URL 저장
            }
          });
        } catch (error) {
          console.error('이미지 가져오기 실패:', error);
        }
      };

      uploadImageToS3();
    } else {
      console.error("Thumbnail is undefined");
    }

    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('6ce94ba3ce787fda2efe59c95e6bc036'); // 카카오톡 앱 JavaScript 키
    }
  }, [Thumbnail]); // Thumbnail이 변경될 때마다 실행

  const handleShare = (event) => {
    event.preventDefault(); // 기본 동작 방지
    console.log(title, address, imageUrl);
  
    if (window.Kakao && imageUrl) {
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
      console.error("Kakao is not initialized or imageUrl is not available");
    }
  };

  return (
    <div className='d-flex align-items-end'>
      <a id="kakaotalk-sharing-btn" href="javascript" onClick={handleShare}>
        <img
          id="kakao_share"
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="카카오톡 공유하기 버튼"
        />
      </a>
      {imageUrl && <img src={imageUrl} alt="Uploaded Thumbnail" style={{ display: 'none' }} />}
    </div>
  );
}
