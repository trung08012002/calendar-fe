import { CalendarEvents } from '@organisms/CalendarEvents';
import { DayEvent } from '@organisms/DayEvent';

export const CalendarPage = () => {
  return (
    <div className='flex w-screen gap-2 bg-lightGreen px-20 pt-2'>
      <DayEvent />
      <CalendarEvents />
    </div>
  );
};
