import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex items-center justify-between lg:w-full lg:gap-[50px]">
        <li className="w-[50%] text-center lg:w-auto">
          <Link
            href="/"
            className={`nav-affter w-full block py-[10px] relative text-[14px] lg:text-[20px] ${
              pathname === "/" ? "on" : ""
            }`}
          >
            홈
          </Link>
        </li>
        <li className="w-[50%] text-center lg:w-auto">
          <Link
            href="/area"
            className={`nav-affter w-full block py-[10px] relative text-[14px] lg:text-[20px] ${
              pathname === "/area" ? "on" : ""
            }`}
          >
            지역
          </Link>
        </li>
      </ul>
    </nav>
  );
}
