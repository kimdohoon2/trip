import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useInteractionStore } from '@/app/stores/useInteractionStore';
import { useToastStore } from '@/app/stores/useToastStore';

interface ItemTypes {
  firstimage: string;
  title: string;
  contentid: string;
  addr1?: string;
}

export default function AreaSlideProps({ item }: { item: ItemTypes }) {
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
    <div>
      <div className="relative aspect-[4/3] h-[34.38vw] w-full overflow-hidden rounded-md lg:aspect-square lg:h-full">
        <Image
          className="h-full w-full object-cover"
          src={item.firstimage || '/error/no-image.png'}
          alt={item.title}
          width={300}
          height={225}
          priority
        />
        <div
          onClick={() => toggleHeart(item.contentid)}
          className="absolute right-2 top-2 h-5 w-5 cursor-pointer rounded-full bg-white lg:h-7 lg:w-7"
        >
          <FontAwesomeIcon
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm ${heartStates[item.contentid] ? 'text-[#ff6b6b]' : 'text-black opacity-[50%]'} transition-transform duration-300`}
            icon={faHeart}
          />
        </div>
      </div>
      <div className="shadow-indigo-500/40 lg:shadow-lg">
        <p className="mt-2 text-center text-[13px] font-bold lg:text-lg">{item.title}</p>
        <p className="text-center text-[11px] text-bordercolor lg:pb-3 lg:text-[15px]">
          {item.addr1 || '주소를 준비중입니다.'}
        </p>
      </div>
    </div>
  );
}
