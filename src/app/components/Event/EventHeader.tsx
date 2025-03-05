import Image from 'next/image';
import { AreaHeaderSlide } from '@/app/constant/SlideConstant';

interface EventHeaderProps {
  selectedArea: string;
  onAreaChange: (area: string) => void;
}

export default function EventHeader({ selectedArea, onAreaChange }: EventHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-center gap-2">
      <div className="w-9 lg:w-11">
        <Image
          className="w-full"
          src="/icons/event1.png"
          alt="행사 아이콘"
          width={512}
          height={512}
        />
      </div>
      <h3 className="text-center text-lg">
        <select
          value={selectedArea}
          onChange={(e) => onAreaChange(e.target.value)}
          className="cursor-pointer bg-transparent"
        >
          {AreaHeaderSlide.map((area) => (
            <option key={area.title}>{area.title}</option>
          ))}
        </select>{' '}
        축제·행사 어디까지 가봤니?
      </h3>
    </div>
  );
}
