import { Button, Menu, MenuDivider, MenuItem } from '@mantine/core';
import { useCallback, useState, useMemo } from 'react';
import { View } from 'react-big-calendar';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { VALUE_VIEW } from '@constants/react-big-calendar';

export interface ViewMenuProps {
  view: View;
  goToDayView: () => void;
  goToMonthView: () => void;
  goToWeekView: () => void;
}

export const ViewMenu = (props: ViewMenuProps) => {
  const { view, goToDayView, goToMonthView, goToWeekView } = props;
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleChooseView = useCallback((view: 'month' | 'week' | 'day') => {
    const mapView = {
      month: goToMonthView,
      week: goToWeekView,
      day: goToDayView,
    };
    console.log('view');
    console.log('view', mapView[view]);
    return mapView[view];
  }, []);
  const items = useMemo(
    () =>
      VALUE_VIEW.filter((value) => !['work_week', 'agenda'].includes(value)),
    [],
  );

  return (
    <Menu shadow='md'>
      <Menu.Target>
        <Button onClick={handleToggle} radius='lg'>
          <div className='flex items-center justify-center gap-2'>
            <span>{view}</span>
            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {items.map((item, index) => (
          <>
            <MenuItem
              onClick={() => {
                handleChooseView(item as 'month' | 'day' | 'week')();
              }}
            >
              {item}
            </MenuItem>
            {index != items.length - 1 ? <MenuDivider /> : null}
          </>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
