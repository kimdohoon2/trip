import { useState } from 'react';
import DateDisplay from '@/app/components/Calendar/DateDisplay';
import CalendarHeader from '@/app/components/Calendar/CalendarHeader';
import CalendarGrid from '@/app/components/Calendar/CalendarGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface CustomCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function CustomCalendar({ selectedDate, onDateChange }: CustomCalendarProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());

  const handleDateClick = (year: number, month: number, day: number) => {
    const newDate = new Date(year, month, day);
    onDateChange(newDate);
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };
  const handleClose = () => {
    setShowCalendar(false);
  };

  return (
    <div className="relative inline-block">
      <DateDisplay selectedDate={selectedDate} onClick={() => setShowCalendar(!showCalendar)} />
      {showCalendar && (
        <div className="absolute left-1/2 z-10 mt-2 w-64 -translate-x-1/2 rounded-lg bg-white p-4 shadow-lg">
          <div className="flex justify-end">
            <div className="cursor-pointer" onClick={handleClose}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <CalendarHeader
            currentYear={currentYear}
            currentMonth={currentMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
          <CalendarGrid
            currentYear={currentYear}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
          />
        </div>
      )}
    </div>
  );
}
