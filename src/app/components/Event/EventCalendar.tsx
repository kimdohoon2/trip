import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons/faCircleLeft';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons/faCircleRight';
import CustomCalendar from '@/app/components/Calendar/CustomCalendar';

interface EventCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onPrevDay: () => void;
  onNextDay: () => void;
}

export default function EventCalendar({
  currentDate,
  onDateChange,
  onPrevDay,
  onNextDay,
}: EventCalendarProps) {
  return (
    <div className="flex w-full items-center justify-center gap-8">
      <div className="text-md cursor-pointer text-white 2xl:text-lg" onClick={onPrevDay}>
        <FontAwesomeIcon icon={faCircleLeft} />
      </div>
      <CustomCalendar selectedDate={currentDate} onDateChange={onDateChange} />
      <div className="text-md cursor-pointer text-white 2xl:text-lg" onClick={onNextDay}>
        <FontAwesomeIcon icon={faCircleRight} />
      </div>
    </div>
  );
}
