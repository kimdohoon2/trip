import AreaSlide from './AreaSlide';

export default function AreaHeader() {
  return (
    <div className="bg-areabg pb-8 pt-3 lg:pb-0 lg:pt-28 1xl:pt-20">
      <div className="relative right-5 mb-2 flex items-center justify-end lg:right-7 1xl:right-16">
        <label className="mx-[5px] text-[11px] text-black lg:text-base">내위치</label>
        <button className="relative h-[13px] w-[22px] rounded-3xl bg-gray lg:h-[15px] lg:w-[30px]">
          <div className="h-[13px] w-[13px] rounded-[50%] bg-white lg:h-[15px] lg:w-[15px]"></div>
        </button>
      </div>
      <AreaSlide />
    </div>
  );
}
