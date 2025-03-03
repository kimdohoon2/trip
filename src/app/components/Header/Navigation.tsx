import { usePathname } from 'next/navigation';
import Link from 'next/link';
export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex items-center justify-between lg:w-full lg:gap-[50px]">
        <li className="w-[33.33%] text-center lg:w-auto">
          <Link
            href="/"
            className={`nav-affter relative block w-full py-[10px] text-[14px] lg:text-[20px] ${
              pathname === '/' ? 'on' : ''
            }`}
          >
            홈
          </Link>
        </li>
        <li className="w-[33.33%] text-center lg:w-auto">
          <Link
            href="/area"
            className={`nav-affter relative block w-full py-[10px] text-[14px] lg:text-[20px] ${
              pathname === '/area' ? 'on' : ''
            }`}
          >
            지역
          </Link>
        </li>
        <li className="w-[33.33%] text-center lg:w-auto">
          <Link
            href="/morepage"
            className={`nav-affter relative block w-full py-[10px] text-[14px] lg:text-[20px] ${
              pathname === '/morepage' ? 'on' : ''
            }`}
          >
            여행정보
          </Link>
        </li>
      </ul>
    </nav>
  );
}
