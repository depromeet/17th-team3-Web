/**
 * 설문 완료 페이지
 * - 후속 추천 페이지로 연결되기 전 간단한 완료 피드백
 */
const CompletePage = () => {
  return (
    <div className="mx-auto max-w-[480px] px-4 py-12 text-center">
      <h1 className="text-2xl font-bold md:text-3xl">설문이 완료되었습니다 🎉</h1>
      <p className="mt-3 text-gray-600">추천 결과를 준비 중이에요.</p>
    </div>
  );
};

export default CompletePage;
