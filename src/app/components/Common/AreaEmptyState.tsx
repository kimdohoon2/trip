import Image from 'next/image';

export default function AreaEmptyState() {
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
      <div className="flex h-full items-center justify-center text-lg text-black">
        찾으시는 지역에 데이터가 없습니다:)
      </div>
      <div className="flex h-full items-center justify-center text-bgopacity">
        다른지역을 선택해주세요
      </div>
    </div>
  );
}
