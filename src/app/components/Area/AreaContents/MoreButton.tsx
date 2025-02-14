import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function MoreButton() {
  return (
    <div className="m-auto block h-[30px] w-[90%] rounded-full border border-black lg:h-[45px] lg:max-w-[240px]">
      <Link
        className="flex h-full w-full items-center justify-center gap-1 text-xs lg:text-base"
        href="/"
      >
        더많은 <strong>여행지</strong> 보러가기
        <FontAwesomeIcon className="text-sm" icon={faAngleRight} />
      </Link>
    </div>
  );
}
