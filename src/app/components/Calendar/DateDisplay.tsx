import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { getFormattedDate } from '@/app/utils/dateUtils';

interface DateDisplayProps {
  selectedDate: Date;
  onClick: () => void;
}

export default function DateDisplay({ selectedDate, onClick }: DateDisplayProps) {
  return (
    <div className="flex cursor-pointer items-center gap-2 text-white" onClick={onClick}>
      <span>{getFormattedDate(selectedDate)}</span>
      <FontAwesomeIcon icon={faCalendar} />
    </div>
  );
}
