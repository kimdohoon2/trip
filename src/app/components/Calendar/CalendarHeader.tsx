import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

interface CalendarHeaderProps {
  currentYear: number;
  currentMonth: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeader({
  currentYear,
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between text-lg font-semibold">
      <button onClick={onPrevMonth} className="p-1">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span>
        {currentYear}년 {currentMonth + 1}월
      </span>
      <button onClick={onNextMonth} className="p-1">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}
