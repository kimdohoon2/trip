import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import LogoIcon from "@/app/components/LogoIcon";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="flex items-center justify-between h-[50px] px-2">
        <div className="w-[73px] h-[11px]">
          <Link className="block w-full h-full relative" href="/">
            <LogoIcon className="w-full h-full head-logo" />
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
