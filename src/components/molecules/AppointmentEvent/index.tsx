import { formatTime } from '@utils/date-time';
import { useMemo } from 'react';
import { AppointmentEventType } from 'types/event';
import { HiOutlineVideoCamera } from 'react-icons/hi2';

export interface AppointmentEventProps {
  event: AppointmentEventType;
}

export const AppointmentEvent = (props: AppointmentEventProps) => {
  const { event } = props;
  const formattedStartDate = useMemo(() => formatTime(event.start), []);
  const formattedEndDate = useMemo(() => formatTime(event.end), []);

  return (
    <div className='flex w-full rounded-lg'>
      <div className='w-[6px] rounded-s-lg bg-darkBlue' />
      <div className='relative max-w-full flex-1 rounded-e-lg bg-darkOrange py-2 pl-2'>
        <div className='flex flex-col'>
          <div className='line-clamp-1 flex w-[calc(100%-60px)] font-medium text-darkBlue'>
            {event.title}
          </div>
          <div className='line-clamp-1 flex w-[calc(100%-60px)] overflow-x-clip text-slate-400'>
            <span>{formattedStartDate}</span>
            <span>-</span>
            <span>{formattedEndDate}</span>
            <span className='ml-1'>{event.time_zone_code}</span>
          </div>
        </div>
        <a
          className='text-xs text-slate-400'
          href={event.creator.user_id.toString()}
        >
          View Client Profile
        </a>
        <div className='absolute right-4 top-4 rounded-full bg-darkBlue px-2 py-1'>
          <HiOutlineVideoCamera className='text-white' />
        </div>
      </div>
    </div>
  );
};
