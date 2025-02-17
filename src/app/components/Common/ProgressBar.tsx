import { useInteractionStore } from '@/app/stores/useInteractionStore';

interface ProgressBarTypes {
  totalPages: number;
  className?: string;
}

export default function ProgressBar({ totalPages, className = '' }: ProgressBarTypes) {
  const { currentPage } = useInteractionStore();

  // 현재 페이지에 대한 이동 위치 (progressLeft)
  const progressLeft = ((currentPage - 1) / totalPages) * 100;

  // 현재 페이지에 대한 너비 (progressWidth)
  const progressWidth = (1 / totalPages) * 100;

  return (
    <div className={`m-auto mb-7 flex w-[90%] items-center justify-between gap-2 ${className}`}>
      <div className="relative h-[2px] w-full bg-gray">
        <div
          className="absolute top-0 h-full bg-black transition-all"
          style={{ left: `${progressLeft}%`, width: `${progressWidth}%` }}
        ></div>
      </div>
      <span className="flex gap-1 text-[11px]">
        <span>{currentPage}</span>
        <span className="text-bordercolor"> / </span>
        <span className="text-bordercolor">{totalPages}</span>
      </span>
    </div>
  );
}
