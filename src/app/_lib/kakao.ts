export const initKakaoSDK = () => {
  if (typeof window === 'undefined') return;

  const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  if (!appKey) {
    console.error('카카오 앱 키가 설정되지 않았습니다.');
    return;
  }
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

export const shareKakaoLink = () => {
  if (typeof window === 'undefined' || !window.Kakao) {
    console.error('카카오 SDK가 로드되지 않았습니다.');
    return;
  }

  const url = window.location.href;
  console.log('url: ', url);

  window.Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '🎉 모임에 초대합니다!',
      description: '그냥 맛집? 나만의 맛집!',
      imageUrl: '/images/example-kakao-bg.png',
      link: {
        mobileWebUrl: url,
        webUrl: url,
      },
    },
    buttons: [
      {
        title: '모임 참여하러 가기',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    ],
  });
};

declare global {
  interface Window {
    Kakao: {
      isInitialized: () => boolean;
      init: (appKey: string) => void;
      Link: {
        sendDefault: (config: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}
