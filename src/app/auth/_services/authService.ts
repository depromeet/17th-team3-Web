export const exchangeCodeForCookie = async (code: string) => {
  const response = await fetch(`/api/proxy/auth/kakao-login?code=${code}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('백엔드 에러 응답:', errorText);
    throw new Error(`쿠키 교환에 실패하였습니다: ${response.status}`);
  }
};
