import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useLike from '@/app/hooks/useLike';

interface ItemTypes {
  item: {
    firstimage: string;
    title: string;
    contentid: string;
    addr1?: string;
  };
  onClick: () => void;
}

export default function AreaSlideProps({ item, onClick }: ItemTypes) {
  const { heartStates, toggleHeart } = useLike();
  return (
    <>
      <div
        className="relative aspect-[4/3] h-[34.38vw] w-full cursor-pointer overflow-hidden rounded-md lg:aspect-square lg:h-full"
        onClick={onClick}
      >
        <Image
          className="h-full w-full object-cover"
          src={item.firstimage || '/error/no-image.png'}
          alt={item.title}
          width={300}
          height={225}
          priority
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleHeart(item.contentid);
          }}
          className="absolute right-2 top-2 h-5 w-5 cursor-pointer rounded-full bg-white lg:h-7 lg:w-7"
        >
          <FontAwesomeIcon
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm ${heartStates[item.contentid] ? 'text-[#ff6b6b]' : 'text-black opacity-[50%]'} transition-transform duration-300 hover:text-[#ff6b6b] lg:text-lg`}
            icon={faHeart}
          />
        </div>
      </div>
      <div className="shadow-indigo-500/40 lg:shadow-lg">
        <p className="mt-2 text-center text-[0.8125rem] font-bold lg:text-lg">{item.title}</p>
        <p className="text-center text-[0.6875rem] text-bordercolor lg:pb-3 lg:text-[0.9375rem]">
          {item.addr1 || '주소를 준비중입니다.'}
        </p>
      </div>
    </>
  );
}
