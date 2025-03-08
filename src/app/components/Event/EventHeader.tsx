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
          alt="축제 및 행사 아이콘"
          width={512}
          height={512}
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="area-select" className="sr-only">
          지역 선택
        </label>
        <select
          id="area-select"
          value={selectedArea}
          onChange={(e) => onAreaChange(e.target.value)}
          className="cursor-pointer bg-transparent"
          aria-label="축제 및 행사 지역 선택"
        >
          {AreaHeaderSlide.map((area) => (
            <option key={area.title} value={area.title}>
              {area.title}
            </option>
          ))}
        </select>
        <h3 className="text-center text-lg">축제·행사 어디까지 가봤니?</h3>
      </div>
    </div>
  );
}
