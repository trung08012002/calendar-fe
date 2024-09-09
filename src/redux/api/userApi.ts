import { SuccessResponse } from 'types';
import { rootApi } from './rootApi';
import { API_URL } from '@constants';

export const userApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getEmails: build.query<string[], string>({
      query: (email: string) => ({
        url: `${API_URL.EMAIL}?email=${email}`,
        method: 'GET',
      }),
      transformResponse: (response: SuccessResponse<string[]>) => response.data,
      providesTags: ['Emails'],
    }),
  }),
});

export const { useGetEmailsQuery } = userApi;
