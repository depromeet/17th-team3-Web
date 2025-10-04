/**
 * 카카오 OAuth code를 API Routes로 전달
 * @param code - 카카오로부터 받은 인가 코드(code)
 */
export const exchangeCodeForCookie = async (code: string) => {
  const response = await fetch(`/api/auth/kakao/callback?code=${code}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Routes 에러 응답:', errorText);
    throw new Error(`쿠키 교환에 실패하였습니다: ${response.status}`);
  }
};

/**
 * 로그아웃 처리 (쿠키 삭제)
 */
export const logout = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('로그아웃에 실패하였습니다');
  }
};
