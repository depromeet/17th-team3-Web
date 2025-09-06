import { SurveyItem } from '@/app/survey';

const page = () => {
  return (
    <div className="flex h-[100%] flex-col gap-4 bg-gray-100 p-4">
      <SurveyItem>술안주랑 함께, 한잔하는 자리가 좋아요</SurveyItem>
      <SurveyItem selected>해장 제대로! 얼큰한 게 좋아요</SurveyItem>
      <SurveyItem>어떤 분위기든 좋아요!</SurveyItem>
    </div>
  );
};

export default page;
