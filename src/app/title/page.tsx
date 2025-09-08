import Title from '@/app/_components/ui/Title';

const Page = () => {
  return (
    <div className="p-4">
      {/* todo: 스타일 점검 */}
      <Title
        title={`내 프로필을 선택해\n취향 설문을 시작하세요!`}
        description={
          <>
            덩허니 님이 <strong className="text-black">강남역</strong> 근처로 초대했어요.
            <br />
            설문에 참여하면, 모임에 알맞는 식당을 추천해드려요.
          </>
        }
      />
      <br />
      <br />
      <br />
      <Title title={`당신의 이름을 알려주세요`} description="원하는 별명을 입력해도 괜찮아요." />
      <br />
      <br />
      <br />
      <Title title={`당신의 이름을 알려주세요`} />
    </div>
  );
};

export default Page;
