import { EVENT_TYPE } from '@constants';
import { AppointmentEvent } from '@molecules/AppointmentEvent';
import { WebinarEvent } from '@molecules/WebinarEvent';
import { AppointmentEventType, EventType, WebinarEventType } from 'types/event';

export interface EventFactoryProps {
  event: EventType;
}

export const EventFactory = (props: EventFactoryProps) => {
  const { event } = props;

  switch (true) {
    case isAppointmentEvent(event):
      return <AppointmentEvent event={event} />;
    case isWebinarEvent(event):
      return <WebinarEvent event={event} />;
  }
};

export const isAppointmentEvent = (
  event: EventType,
): event is AppointmentEventType => event.event_type === EVENT_TYPE.appointment;

export const isWebinarEvent = (event: EventType): event is WebinarEventType =>
  event.event_type === EVENT_TYPE.webinar;
