import { Calendar } from 'react-big-calendar';
import { useLocalizerContext } from '@contexts';
import { useCallback, useMemo, useState } from 'react';
import {
  Autocomplete,
  Button,
  Modal,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { formatDateTime } from '@utils/date-time';
import { CustomToolBar } from '@molecules/CustomToolbar';
import {
  useCreateEventMutation,
  useGetAllEventsByUserQuery,
} from '@redux/api/eventApi';
import { EVENT_TYPE } from '@constants';
import moment from 'moment-timezone';
import debounce from 'lodash.debounce';
import { useGetEmailsQuery } from '@redux/api/userApi';

export interface EventDate {
  start: Date;
  end: Date;
}

export interface Event extends EventDate {
  title: string;
  description: string;
  invite_email: string;
}

export const CalendarEvents = () => {
  const { localizer } = useLocalizerContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [event, setEvent] = useState<Event>({
    start: moment().toDate(),
    end: moment().toDate(),
    title: '',
    description: '',
    invite_email: '',
  });

  const { data: originalEvents = [] } = useGetAllEventsByUserQuery();
  const events = useMemo(
    () =>
      originalEvents.map(({ start, end, ...rest }) => ({
        ...rest,
        start: new Date(start),
        end: new Date(end),
      })),
    [originalEvents],
  );
  const [createEvent, { isLoading: isEventCreating }] =
    useCreateEventMutation();
  const { data: emails = [] } = useGetEmailsQuery(event.invite_email, {
    skip: event.invite_email === '',
  });
  const handleSelectSlot = useCallback(({ start, end }: EventDate) => {
    setEvent((event) => ({ ...event, start, end }));
    open();
  }, []);
  const formattedEventDate = useMemo(
    () => ({
      start: formatDateTime(event.start),
      end: formatDateTime(event.end),
    }),
    [event.start, event.end],
  );
  const handleSaveEvent = () => {
    if (isEventCreating) return;
    createEvent({
      ...event,
      is_recurring: false,
      recurrence_rule: '',
      location: '',
      event_type:
        event.invite_email != '' ? EVENT_TYPE.appointment : EVENT_TYPE.webinar,
      time_zone_code: moment.tz.guess(),
    })
      .then(() => {
        close();
      })
      .finally(() => {
        setEvent({
          start: moment().toDate(),
          end: moment().toDate(),
          title: '',
          description: '',
          invite_email: '',
        });
      });
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEvent((data) => ({ ...data, title: event.target.value }));
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEvent((data) => ({ ...data, description: event.target.value }));
  };
  const debounceDropDown = useCallback(
    debounce((value) => {
      setEvent((event) => ({
        ...event,
        invite_email: value,
      }));
    }, 300),
    [],
  );
  const handleChangeEmail = (value: string) => {
    debounceDropDown(value);
  };
  const handleSelected = (event) => {
    window.open('https://example.com/dummy-event', '_blank');
  };

  return (
    <div className='h-full flex-1 border-2 bg-white'>
      <Modal opened={opened} onClose={close} title='Event'>
        <TextInput
          label='Title'
          placeholder='Enter title'
          onChange={handleChangeTitle}
        />
        <TextInput
          label='Start Date/Time'
          disabled
          value={formattedEventDate.start}
        />
        <TextInput
          label='Start Date/Time'
          disabled
          value={formattedEventDate.end}
        />
        <Autocomplete
          label='Invite email'
          placeholder='Enter invite email'
          onChange={handleChangeEmail}
          data={emails}
        />
        <Textarea
          label='Description'
          placeholder='Enter Description'
          onChange={handleChangeDescription}
        />
        <div className='gap mt-5 flex items-center justify-end gap-5'>
          <Button onClick={close} title='Close' color='gray'>
            Close
          </Button>
          <Button onClick={handleSaveEvent} title='Saves changes'>
            Saves changes
          </Button>
        </div>
      </Modal>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelected}
        components={{ toolbar: CustomToolBar }}
        style={{ height: '70vh' }}
      />
    </div>
  );
};
