import { EVENT_TYPE } from '@constants';

export type AppointmentEventType = {
  title: string;
  start: Date;
  end: Date;
  creator: UserInfoResponse;
  event_type: EVENT_TYPE;
  time_zone_code: string;
  invitations: InvitationResponse;
};

export type WebinarEventType = {
  title: string;
  start: Date;
  end: Date;
  event_type: EVENT_TYPE;
  time_zone_code: string;
  creator: UserInfoResponse;
  invitations: InvitationResponse;
};

export type EventType = AppointmentEventType | WebinarEventType;

export type EventResponse = {
  description: string;
  title: string;
  created_at: Date;
  event_id: number;
  start: Date;
  end: Date;
  location: string;
  is_recurring: boolean;
  recurrence_rule: string;
  event_type: string;
  time_zone_code: string;
  updated_at: Date;
};

export type UserInfoResponse = {
  user_id: number;
  email: number;
  username: number;
};

export type InvitationResponse = {
  User: UserInfoResponse;
  status: string;
  sent_at: Date;
};

export type EventDetailResponse = {
  event_id: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  is_recurring: boolean;
  recurrence_rule: string;
  event_type: string;
  time_zone_code: string;
  created_at: Date;
  updated_at: Date;
  creator: UserInfoResponse;
  invitations: InvitationResponse;
};

export type CreateEventRequest = {
  title: string;
  description: string;
  start: Date;
  end: Date;
  is_recurring: boolean;
  recurrence_rule: string;
  location: string;
  event_type: EVENT_TYPE;
  invite_email: string;
  time_zone_code: string;
};
