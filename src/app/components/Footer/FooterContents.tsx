import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-footerbg w-full px-4 py-4">
      <div className="flex items-center justify-between border-t border-bordercolor pt-4 1xl:mx-auto 1xl:max-w-[1000px]">
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
          <div className="flex gap-4">
            <div className="w-28">
              <Link className="w-full" href="https://api.visitkorea.or.kr/#/" target="_blank">
                <Image
                  className="w-full"
                  src="/footer/logo_foot_api.png"
                  alt="TourAPI 4.0"
                  width={120}
                  height={30}
                ></Image>
              </Link>
            </div>
            <div className="w-20">
              <Link className="w-full" href="https://knto.or.kr/index" target="_blank">
                <Image
                  className="w-full"
                  src="/footer/logo_foot_gg.png"
                  alt="한국관광공사"
                  width={90}
                  height={30}
                ></Image>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
