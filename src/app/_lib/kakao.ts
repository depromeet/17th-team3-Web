/**
 * 카카오 SDK 초기화 및 공유 기능
 * 카카오 JavaScript SDK를 로드하고 초기화
 * @param appKey - 카카오 앱 키
 */
export const initKakaoSDK = (appKey: string) => {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
  script.async = true;

  script.onload = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
    }
  };

  document.head.appendChild(script);
};

/**
 * 카카오톡으로 링크 공유
 * @param url - 공유할 URL
 * @param title - 메시지 제목
 * @param description - 메시지 설명
 */
export const shareKakaoLink = (
  url: string,
  title: string = '모임 초대',
  description: string = '모임 설문에 참여해주세요!'
) => {
  if (typeof window === 'undefined' || !window.Kakao) {
    console.error('카카오 SDK가 로드되지 않았습니다.');
    return;
  }

  window.Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title,
      description,
      imageUrl: 'https://example.com/image.jpg', // 썸네일 이미지 URL
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    buttons: [
      {
        title: '설문 참여하기',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    ],
  });
};

// 전역 Kakao 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}
