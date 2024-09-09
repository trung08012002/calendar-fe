import { formatTime } from '@utils/date-time';
import { useMemo } from 'react';
import { WebinarEventType } from 'types/event';

export type WebinarEventProps = {
  event: WebinarEventType;
};

export const WebinarEvent = (props: WebinarEventProps) => {
  const { event } = props;
  const formattedStartDate = useMemo(() => formatTime(event.start), []);
  const formattedEndDate = useMemo(() => formatTime(event.end), []);

  return (
    <div className='flex w-full rounded-lg'>
      <div className='w-[6px] rounded-s-lg bg-darkBlue' />
      <div className='flex max-w-[calc(100%-6px)] flex-1 flex-col rounded-e-lg bg-lightBlue py-2 pl-2 pr-2'>
        <div className='line-clamp-1 overflow-x-hidden font-medium text-darkBlue'>
          {event.title}
        </div>
        <div className='line-clamp-1 flex w-full text-slate-400'>
          <span>{formattedStartDate}</span>
          <span>-</span>
          <span>{formattedEndDate}</span>
          <span className='ml-1'>{event.time_zone_code}</span>
        </div>
      </div>
    </div>
  );
};
