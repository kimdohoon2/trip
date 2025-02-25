import { getDaysInMonth, getPrevMonthDays } from '@/app/utils/getFormattedDate';

interface CalendarGridProps {
  currentYear: number;
  currentMonth: number;
  selectedDate: Date;
  onDateClick: (year: number, month: number, day: number) => void;
}

export default function CalendarGrid({
  currentYear,
  currentMonth,
  selectedDate,
  onDateClick,
}: CalendarGridProps) {
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const prevMonthDays = getPrevMonthDays(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = [
    ...Array(firstDay)
      .fill(null)
      .map((_, i) => ({ day: prevMonthDays - firstDay + i + 1, isCurrentMonth: false })),
    ...Array(daysInMonth)
      .fill(null)
      .map((_, i) => ({ day: i + 1, isCurrentMonth: true })),
  ];

  const getDayColor = (index: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return 'text-gray6';
    if (index % 7 === 0) return 'text-red'; // 일요일
    if (index % 7 === 6) return 'text-blue-500'; // 토요일
    return '';
  };

  return (
    <div className="grid grid-cols-7 gap-1 text-center text-sm">
      {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
        <div
          key={day}
          className={`font-bold ${index === 0 ? 'text-red' : index === 6 ? 'text-blue-500' : ''}`}
        >
          {day}
        </div>
      ))}
      {calendarDays.map(({ day, isCurrentMonth }, index) => (
        <div
          key={index}
          className={`hover:bg-gray-200 cursor-pointer rounded p-[5px] ${getDayColor(
            index,
            isCurrentMonth
          )} ${
            isCurrentMonth &&
            day === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear()
              ? 'bg-black text-white'
              : ''
          }`}
          onClick={() => isCurrentMonth && onDateClick(currentYear, currentMonth, day)}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
