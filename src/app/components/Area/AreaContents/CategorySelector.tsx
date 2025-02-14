import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useInteractionStore } from '@/app/stores/useInteractionStore';
import { useUIStore } from '@/app/stores/useAreaUiStore';
interface CategorySelectorTypes {
  availableCategories: string[];
}
export default function CategorySelector({ availableCategories }: CategorySelectorTypes) {
  const { category, setCategory } = useInteractionStore();
  const { visible, setVisible } = useUIStore();
  return (
    <div className="align-center relative flex items-center">
      <span className="mr-2 text-sm text-bgopacity lg:text-2xl">다양한</span>
      <button onClick={() => setVisible(!visible)}>
        <div className="z-20 flex w-[120px] justify-between border-b border-black bg-white text-lg font-bold lg:w-[170px] lg:text-3xl 1xl:w-[195px]">
          {category}
          <span>
            <FontAwesomeIcon
              className={`z-20 text-sm text-black transition-transform duration-300 lg:text-2xl ${visible ? 'rotate-180' : ''}`}
              icon={faAngleDown}
            />
          </span>
        </div>
        <ul
          aria-hidden={!visible}
          className={`absolute top-[29px] z-10 w-full max-w-[120px] lg:top-[38px] lg:max-w-[170px] ${visible ? 'block' : 'hidden'}`}
        >
          {availableCategories.map((item) => (
            <li
              key={item}
              onClick={() => {
                setCategory(item);
                setVisible(false);
              }}
              className="lg:pl-1.25 pt-1.25 pr-1.25 pb-1.25 flex w-full justify-between border-b border-black bg-white pl-0.5 font-bold text-bgopacity lg:pb-2.5 lg:pr-2.5 lg:pt-2.5 lg:text-3xl"
            >
              {item}
            </li>
          ))}
        </ul>
      </button>
      <span className="ml-2 text-sm text-bgopacity lg:text-2xl">알려드릴게요!</span>
    </div>
  );
}
