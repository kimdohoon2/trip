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
      <div className="text-red-600 text-center">오류</div>
    </>
  );
}
