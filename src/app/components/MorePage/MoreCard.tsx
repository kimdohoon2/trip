import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useInteractionStore } from '@/app/stores/useInteractionStore';
import { useToastStore } from '@/app/stores/useToastStore';
import { AreaItem } from '@/app/types/ItemType';
import { filterAddress } from '@/app/utils/filterDate';
import { filterTitle } from '@/app/utils/filterDate';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';

interface MoreCardProps {
  moreData: AreaItem[];
}
export default function MoreCard({ moreData }: MoreCardProps) {
  const { heartStates, setHeartStates } = useInteractionStore();
  // 좋아요 버튼 함수
  const toggleHeart = (contentid: string) => {
    const isLiked = heartStates[contentid];

    if (isLiked) {
      setHeartStates((prevStates) => ({
        ...prevStates,
        [contentid]: false,
      }));
      useToastStore.setState({
        message: '좋아요가 취소되었습니다!',
        type: 'error', // 취소 시 에러 타입
      });
    } else {
      setHeartStates((prevStates) => ({
        ...prevStates,
        [contentid]: true,
      }));
      useToastStore.setState({
        message: '좋아요를 클릭하셨습니다!',
        type: 'success', // 추가 시 성공 타입
      });
    }
  };
  return (
    <div className="grid w-full grid-cols-2 gap-3 px-4 py-4 lg:grid-cols-4 lg:gap-5 lg:px-6 lg:pt-12 1xl:m-auto 1xl:max-w-[1000px]">
      {moreData.map((more) => (
        <div key={more.contentid} className="flex w-full flex-col">
          <div className="relative mb-2 aspect-[4/3] h-[34.38vw] w-full lg:h-[220px]">
            <Image
              className="h-full w-full rounded-lg object-cover"
              src={more.firstimage || '/error/no-image.png'}
              alt={more.title}
              width={500}
              height={333}
            />
            <div
              onClick={() => toggleHeart(more.contentid)}
              className="absolute right-2 top-2 h-5 w-5 cursor-pointer rounded-full bg-white lg:h-7 lg:w-7"
            >
              <FontAwesomeIcon
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm ${heartStates[more.contentid] ? 'text-[#ff6b6b]' : 'text-black opacity-[50%]'} transition-transform duration-300`}
                icon={faHeart}
              />
            </div>
          </div>
          <div className="shadow-indigo-500/40 lg:shadow-lg">
            <div className="text-left lg:pl-3">
              <h1 className="text-base font-bold lg:text-lg">{filterTitle(more.title)}</h1>
              <p className="text-xs lg:text-sm">
                {filterAddress(more.addr1 || '주소를 준비중입니다.')}
              </p>
              <div className="mt-2 lg:mb-4 lg:mt-7">
                <Link
                  className="rounded-xl border border-bordercolor px-6 py-1 text-sm hover:bg-black hover:text-white lg:text-base"
                  href={createKakaoMapURL(more.addr1 || '주소를 준비중입니다.')}
                  target="_blank"
                >
                  길찾기
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
