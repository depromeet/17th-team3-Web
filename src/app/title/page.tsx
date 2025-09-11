import { Heading, Text } from '@/app/_components/typography';
import TitleGroup from '@/app/_components/typography/TitleGroup';

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
      <br />
      <TitleGroup title="회원가입" description="정보를 입력해주세요" />
      <TitleGroup
        title={`환영합니다!\n서비스를 시작해보세요`}
        description="몇 가지 정보만 입력하면 됩니다"
      />
      <TitleGroup title="설정" description="계정 정보를 관리하세요" align="left" />
      <TitleGroup title="마지막 단계" level="h3" description="거의 다 끝났어요!" />
    </div>
  );
};

export default Page;
