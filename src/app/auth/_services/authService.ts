export const exchangeCodeForCookie = async (code: string) => {
  // const response = await fetch(`/api/proxy/auth/kakao-login?code=${code}`, {
  const response = await fetch(`/api/auth/auth/kakao/callback?code=${code}`, {
    method: 'GET',
    // credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('백엔드 에러 응답:', errorText);
    throw new Error(`쿠키 교환에 실패하였습니다: ${response.status}`);
  }
};
