import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@redux/axiosBaseQuery';

export const rootApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ['Events', 'Emails'],
});
