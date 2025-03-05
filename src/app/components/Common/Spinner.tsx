export default function Spinner() {
  return (
    <div className="flex justify-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* 첫 번째 링 */}
        <div className="animate-fancy absolute h-16 w-16 rounded-full border-4 border-transparent border-l-bluebell border-t-bluebell"></div>

        {/* 두 번째 링 */}
        <div className="animate-fancy animation-delay-1000 absolute h-16 w-16 rounded-full border-4 border-transparent border-b-bluebell border-t-bluebell"></div>

        {/* 중앙 점 */}
        <div className="absolute h-4 w-4 rounded-full bg-bluebell"></div>
      </div>
    </div>
  );
}
