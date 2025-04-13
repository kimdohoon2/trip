import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';

interface MoreButtonProps {
  href: string;
  text?: string;
  strongText?: string;
  className?: string;
}

export default function MoreButton({ href, text, strongText, className = '' }: MoreButtonProps) {
  return (
    <div
      className={`hover-button m-auto block h-[1.875rem] w-[90%] rounded-full border border-black lg:h-[2.8125rem] lg:max-w-60 ${className}`}
    >
      <Link
        className="flex h-full w-full items-center justify-center gap-1 text-xs lg:text-base"
        href={href}
      >
        {text} <strong>{strongText}</strong> 보러가기
        <FontAwesomeIcon className="text-sm" icon={faAngleRight} />
      </Link>
    </div>
  );
}
