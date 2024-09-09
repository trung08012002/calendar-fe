import {
  CreateEventRequest,
  EventDetailResponse,
  EventResponse,
  SuccessResponse,
} from 'types';
import { rootApi } from './rootApi';
import { API_URL } from '@constants';
import moment from 'moment-timezone';

export const eventApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEventsByUser: build.query<EventResponse[], void>({
      query: () => ({
        url: API_URL.EVENTS_BY_USER,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<EventResponse[]>) =>
        response.data,
      providesTags: ['Events'],
    }),
    getEventsByDay: build.query<EventDetailResponse[], Date>({
      query: (date: Date) => ({
        url: `${API_URL.EVENTS_BY_DAY}?date=${moment(date).format('YYYY-MM-DD')}&timeZoneCode=${moment.tz.guess()}`,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<EventDetailResponse[]>) =>
        response.data,
      providesTags: (_result, _error, date) => [
        { type: 'Events', id: date.toISOString() },
      ],
    }),
    createEvent: build.mutation<void, CreateEventRequest>({
      query: (data: CreateEventRequest) => ({
        url: API_URL.EVENTS,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Events'],
    }),
  }),
});

export const {
  useGetAllEventsByUserQuery,
  useCreateEventMutation,
  useGetEventsByDayQuery,
} = eventApi;
