import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

export default function Footer() {
  return (
    <footer className="hidden w-full bg-footerbg px-4 py-4 lg:block">
      <div className="flex items-center justify-between border-t border-bordercolor pt-4 1xl:mx-auto 1xl:max-w-[62.5rem]">
        <div className="w-20">
          <Image
            className="w-full"
            src="/footer/logo_foot.png"
            alt="한국관광공사"
            width={178}
            height={28}
          ></Image>
        </div>
        <div>
          <Link
            className="flex w-full items-center gap-2"
            href="https://github.com/kimdohoon2/trip"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span>kimdohoon2</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
