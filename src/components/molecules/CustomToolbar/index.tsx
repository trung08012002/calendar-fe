import { useState } from 'react';
import { Navigate, ToolbarProps, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ViewMenu } from '../ViewMenu';
import { ActionIcon, Button } from '@mantine/core';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

export const CustomToolBar = (props: ToolbarProps) => {
  const [viewState, setViewState] = useState<View>('month');

  const goToDayView = () => {
    props.onView('day');
    setViewState('day');
  };
  const goToWeekView = () => {
    props.onView('week');
    setViewState('week');
  };
  const goToMonthView = () => {
    props.onView('month');
    setViewState('month');
  };

  return (
    <div className='my-2 flex w-full justify-between px-3'>
      <div className='flex items-center'>
        <Button
          variant='outline'
          radius='lg'
          onClick={() => props.onNavigate(Navigate.TODAY)}
        >
          today
        </Button>
        <ActionIcon
          variant='transparent'
          onClick={() => props.onNavigate(Navigate.PREVIOUS)}
        >
          <IoIosArrowBack color='bg-mainColor' />
        </ActionIcon>
        <ActionIcon
          variant='transparent'
          onClick={() => props.onNavigate(Navigate.NEXT)}
        >
          <IoIosArrowForward />
        </ActionIcon>
        <span className='text-mainColor text-xl font-bold'>{props.label}</span>
      </div>
      <div>
        <ViewMenu
          view={viewState}
          goToDayView={goToDayView}
          goToMonthView={goToMonthView}
          goToWeekView={goToWeekView}
        />
      </div>
    </div>
  );
};
