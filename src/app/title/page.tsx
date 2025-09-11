import { Heading, Text } from '@/app/_components/typography';

const Page = () => {
  return (
    <div className="min-h-dvh bg-amber-50 p-4">
      <Text>
        <>
          덩허니 님이 <strong className="text-black">강남역</strong> 근처로 초대했어요.
          <br />
          설문에 참여하면, 모임에 알맞는 식당을 추천해드려요.
        </>
      </Text>
      <br />
      <br />
      <br />
      {/* <Title title={`당신의 이름을 알려주세요`} description="원하는 별명을 입력해도 괜찮아요." /> */}
      <br />
      <br />
      <br />
      <Heading as="h3">당신의 이름을 알려주세요</Heading>
      <Text>원하는 별명을 입력해도 괜찮아요.</Text>
    </div>
  );
};

export default Page;
