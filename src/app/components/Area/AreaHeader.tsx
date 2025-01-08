import AreaSlide from './AreaSlide';
import { AreaSlideProps } from '@/app/type/ItemType';

export default function AreaHeader({ selectedArea, setSelectedArea }: AreaSlideProps) {
  return (
    <div className="1xl:pt-20 bg-areabg pb-8 pt-3 lg:pb-0 lg:pt-28">
      <div className="1xl:right-16 relative right-5 mb-2 flex items-center justify-end lg:right-7">
        <label className="mx-[5px] text-[11px] text-black lg:text-base">내위치</label>
        <button className="relative h-[13px] w-[22px] rounded-3xl bg-gray lg:h-[15px] lg:w-[30px]">
          <div className="h-[13px] w-[13px] rounded-[50%] bg-white lg:h-[15px] lg:w-[15px]"></div>
        </button>
      </div>
      <AreaSlide selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
    </div>
  );
}
