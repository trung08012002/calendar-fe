import { EventFactory } from '@molecules/EventFactory';
import { formatDate } from '@utils/date-time';
import { useMemo } from 'react';
import { EventType } from 'types/event';
import { useGetEventsByDayQuery } from '@redux/api/eventApi';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export interface UpcomingEventsProps {
  date: Date;
}

const AppointmentEventSkeleton = () => (
  <div className='flex w-full animate-pulse rounded-lg'>
    <div className='w-[6px] rounded-s-lg bg-gray-300' />
    <div className='relative flex-1 rounded-e-lg bg-gray-200 py-2 pl-2'>
      <div className='flex flex-col'>
        <div className='mb-2 h-5 w-10/12 rounded bg-gray-300'></div>
        <div className='flex space-x-2'>
          <div className='h-4 w-16 rounded bg-gray-300'></div>
          <div className='h-4 w-4 rounded bg-gray-300'></div>
          <div className='h-4 w-16 rounded bg-gray-300'></div>
          <div className='h-4 w-8 rounded bg-gray-300'></div>
        </div>
      </div>
      <div className='mt-2 h-4 w-32 rounded bg-gray-300'></div>
      <div className='absolute right-4 top-4 h-8 w-8 rounded-full bg-gray-300'></div>
    </div>
  </div>
);

export const UpcomingEvents = (props: UpcomingEventsProps) => {
  const { date } = props;
  const formattedDate = useMemo(() => formatDate(date), [date]);
  const {
    data: upComingEvents = [],
    error,
    isFetching,
  } = useGetEventsByDayQuery(date);
  const events = useMemo(
    () => (error ? [] : upComingEvents),
    [error, upComingEvents],
  );
  return (
    <div className='flex flex-col gap-2 px-2'>
      <div className='text-xl font-bold text-mainColor'>UpcomingEvents</div>
      <div className='font-medium text-gray-500'>{formattedDate}</div>
      <TransitionGroup className='flex flex-col gap-3'>
        {isFetching
          ? events.map((_, index) => (
              <CSSTransition
                key={`skeleton-${index}`}
                timeout={300}
                classNames='fade'
              >
                <AppointmentEventSkeleton />
              </CSSTransition>
            ))
          : events.map((event) => (
              <CSSTransition key={event.event_id} classNames='fade'>
                <EventFactory event={{ ...event } as EventType} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </div>
  );
};
