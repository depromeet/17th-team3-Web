const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const exchangeCodeForCookie = async (code: string) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/kakao-login?code=${code}`, {
    method: 'GET',
  });

  if (!response.ok) throw new Error('쿠키 교환에 실패하였습니다.');
};
