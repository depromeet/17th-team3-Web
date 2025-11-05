import Image from 'next/image';

interface AvatarListProps {
  // TODO: 추후 아바타 ID로 변경해, 타입 체크 강화
  avatars: string[];
  additionalCount: number;
}

const AvatarList = ({ avatars, additionalCount }: AvatarListProps) => {
  return (
    <div className="flex w-fit items-center justify-center gap-3 rounded-[20px] bg-neutral-100 px-2 py-1">
      <div className="flex">
        {avatars.map((avatar, index) => (
          <div key={index} className="-mr-2 h-5 w-5 rounded-full bg-neutral-100">
            <Image alt="avatar" src={avatar} width={20} height={20} />
          </div>
        ))}
      </div>
      <p className="label-2 font-semibold text-orange-800">{`+${additionalCount}`}</p>
    </div>
  );
};

export default AvatarList;
