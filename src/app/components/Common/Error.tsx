import Image from 'next/image';
export default function DataError() {
  return (
    <>
      <div className="w-[122px]">
        <Image
          className="h-full w-full object-cover"
          src="/error/data-error.svg"
          alt="data-error"
          width={120}
          height={120}
        ></Image>
      </div>
      <h2 className="mb-2 text-2xl font-bold text-red">데이터 로딩 오류</h2>
      <p className="mb-4 text-gray">죄송합니다. 데이터를 불러오는 중 문제가 발생했습니다.</p>
    </>
  );
}
