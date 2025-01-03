import AreaSlide from './AreaSlide';

export default function AreaHeader() {
  return (
    <div className="bg-areabg pb-10 pt-3">
      <div className="relative right-5 mb-2 flex items-center justify-end">
        <label className="mx-[5px] text-[11px] text-black">내위치</label>
        <button className="relative h-[13px] w-[22px] rounded-3xl bg-gray">
          <div className="h-[11px] w-[11px] rounded-[50%] bg-white"></div>
        </button>
      </div>
      <AreaSlide />
    </div>
  );
}
