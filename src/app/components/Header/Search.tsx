import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default function Search() {
  return (
    <div className="mb-[10px] lg:mb-0">
      <div className="block w-auto lg:w-[300px] px-[20px] lg:px-[10px] mr-0 h-[35px] bg-[#eef0f2] lg:bg-transparent rounded-full lg:rounded-none border-transparent lg:border-b lg:border-b-black flex items-center justify-between">
        <input
          className="w-full h-full bg-transparent border-none outline-none placeholder:text-[13px] lg:placeholder:text-[18px] lg:placeholder:font-thin"
          type="text"
          placeholder="어디로 여행을 떠날 예정인가요?"
        />
        <FontAwesomeIcon
          className="text-[#6d6d6d] lg:text-[24px] lg:text-[black]"
          icon={faSearch}
        />
      </div>
    </div>
  );
}
