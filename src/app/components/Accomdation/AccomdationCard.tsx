import Image from 'next/image';
import Link from 'next/link';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import { StayItem } from '@/app/types/ItemType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';

interface AccomdationCardProps {
  stay: StayItem;
  onClick: () => void;
}

export default function AccomdationCard({ stay, onClick }: AccomdationCardProps) {
  return (
    <div className="rounded-lg bg-white shadow-md" onClick={onClick}>
      <div className="relative aspect-[4/3]">
        <Image
          className="h-full w-full"
          src={stay.firstimage || '/error/no-image.png'}
          alt={stay.title}
          width={300}
          height={225}
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h2 className="text-primary mb-2 text-lg font-bold">{filterTitle(stay.title)}</h2>
        <div className="flex items-center gap-2 lg:justify-between lg:gap-0">
          <p className="text-gray-600 text-sm">
            {filterAddress(stay.addr1 || '주소를 준비중입니다.')}
          </p>
          <Link
            className="hover-button relative inline-block h-[1.875rem] w-[1.875rem] rounded-full border border-bordercolor text-sm lg:text-base"
            href={createKakaoMapURL(stay.addr1)}
            target="_blank"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              icon={faMapLocationDot}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
