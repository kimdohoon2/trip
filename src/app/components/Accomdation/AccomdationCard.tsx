import Image from 'next/image';
import { StayItem } from '@/app/types/ItemType';

interface AccomdationCardProps {
  stay: StayItem;
}

export default function AccomdationCard({ stay }: AccomdationCardProps) {
  return (
    <div className="rounded-lg bg-white shadow-md">
      <div className="relative aspect-[4/3]">
        <Image
          className="h-full w-full"
          src={stay.firstimage || '/error/no-image.png'}
          alt={stay.title}
          width={500}
          height={333}
          priority
        />
      </div>
      <div className="p-4">
        <h2 className="text-primary mb-2 text-lg font-bold">{stay.title}</h2>
        <p className="text-gray-600 text-sm">{stay.addr1 || '주소를 준비중입니다.'}</p>
      </div>
    </div>
  );
}
