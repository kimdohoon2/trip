import Image from 'next/image';

type MessageType = 'area' | 'date';

interface EmptyStateProps {
  type?: MessageType;
  mainClassName?: string;
  subClassName?: string;
}

export default function EmptyState({
  type = 'area',
  mainClassName,
  subClassName,
}: EmptyStateProps) {
  const messages = {
    area: {
      main: '찾으시는 지역에 데이터가 없습니다:)',
      sub: '다른 지역을 선택해주세요',
    },
    date: {
      main: '선택하신 날짜에 데이터가 없습니다:)',
      sub: '다른 날짜를 선택해주세요',
    },
  };

  return (
    <div className="mt-7 flex flex-col items-center gap-3">
      <div className="w-[122px]">
        <Image
          className="h-full w-full object-cover"
          src="/error/error.png"
          alt="error"
          width={122}
          height={114}
        />
      </div>
      <div className={`flex h-full items-center justify-center ${mainClassName}`}>
        {messages[type].main}
      </div>
      <div className={`flex h-full items-center justify-center ${subClassName}`}>
        {messages[type].sub}
      </div>
    </div>
  );
}
