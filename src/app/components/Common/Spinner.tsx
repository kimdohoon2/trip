export default function Spinner() {
  return (
    <div className="flex justify-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* 첫 번째 링 */}
        <div className="border-t-bluebell border-l-bluebell animate-fancy absolute h-16 w-16 rounded-full border-4 border-transparent"></div>

        {/* 두 번째 링 */}
        <div className="border-t-bluebell border-b-bluebell animate-fancy animation-delay-1000 absolute h-16 w-16 rounded-full border-4 border-transparent"></div>

        {/* 중앙 점 */}
        <div className="bg-bluebell absolute h-4 w-4 rounded-full"></div>
      </div>
    </div>
  );
}
