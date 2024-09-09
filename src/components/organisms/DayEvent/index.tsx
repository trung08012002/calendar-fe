import { Divider } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { UpcomingEvents } from '@molecules/UpComingEvents';
import { useState } from 'react';
import moment from 'moment';

export const DayEvent = () => {
  const [currentDate, setCurrentDate] = useState(moment().toDate());

  return (
    <div className='h-[calc(100vh-8px)] w-[350px] flex-col items-center border-2 bg-white'>
      <Calendar
        classNames={{
          levelsGroup: 'w-full',
          calendarHeader: 'mx-auto',
          month: 'w-full',
        }}
        date={currentDate}
        renderDay={(date) => {
          return (
            <div
              className={
                moment(date).isSame(currentDate, 'day')
                  ? 'rounded-full bg-darkBlue px-3 py-1 text-white'
                  : ''
              }
            >
              {date.getDate()}
            </div>
          );
        }}
        __onDayClick={(event, date) => setCurrentDate(date)}
        onDateChange={(date) => setCurrentDate(date)}
      />
      <Divider />
      <UpcomingEvents date={currentDate} />
    </div>
  );
};
