import Image from 'next/image';
import Link from 'next/link';
import formatDate from '@/app/utils/formatDate';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';

interface EventCardProps {
  event: {
    contentid: string;
    firstimage?: string;
    title: string;
    addr1: string;
    eventstartdate: string;
    eventenddate: string;
  };
  onClick: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div className="event-card relative w-full rounded-md bg-white p-5" onClick={onClick}>
      <div className="2xl:flex">
        <div className="relative h-[12.5rem] w-full lg:h-72 2xl:w-[12.5rem]">
          <Image
            className="absolute h-full w-full rounded-lg object-contain 2xl:object-cover"
            src={event.firstimage || '/placeholder-image.jpg'}
            alt={event.title}
            width={512}
            height={512}
          />
        </div>
        <div className="border-dashed text-center 2xl:ml-8 2xl:flex 2xl:flex-col 2xl:justify-between 2xl:border-l 2xl:pb-0 2xl:pl-8 2xl:text-left">
          <div className="my-3">
            <h3 className="text-md lg:text-2xl">{filterTitle(event.title)}</h3>
            <p className="text-xs text-gray6 lg:text-base">{filterAddress(event.addr1)}</p>
          </div>
          <div className="border-b border-dashed pb-4 lg:mt-10 lg:flex lg:justify-around lg:gap-10 2xl:border-b-0">
            <div>
              <p className="hidden lg:block">기간</p>
              <div className="flex justify-center gap-3 lg:justify-start">
                <span className="text-xs text-gray6 2xl:text-sm">
                  {formatDate(event.eventstartdate)}
                </span>
                <span className="text-xs text-gray6 2xl:text-sm">~</span>
                <span className="text-xs text-gray6 2xl:text-sm">
                  {formatDate(event.eventenddate)}
                </span>
              </div>
            </div>
            <div>
              <p className="hidden lg:block">장소</p>
              <p className="hidden lg:block lg:text-xs 2xl:text-sm">{event.addr1}</p>
            </div>
          </div>
          <div className="mt-4 lg:mb-4 lg:mt-7">
            <Link
              className="hover-button rounded-xl border border-bordercolor px-6 py-1 text-sm lg:text-base"
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={createKakaoMapURL(event.addr1)}
              target="_blank"
            >
              길찾기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
