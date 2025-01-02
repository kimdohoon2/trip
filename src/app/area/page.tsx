export default function AreaPage() {   return (
    <div className="bg-areabg">
      <div className="flex justify-end">
        <label className="mx-[5px] my-0 align-top text-[11px] leading-[13px] text-black">
          내위치
        </label>
        <button className="relative h-[13px] w-[22px] rounded-3xl bg-gray">
          <div className="h-[11px] w-[11px] rounded-[50%] bg-white"></div>
          <div></div>
        </button>
      </div>
    </div>
  );
}
