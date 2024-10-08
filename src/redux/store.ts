import { configureStore } from '@reduxjs/toolkit';

import { rootApi } from './api/rootApi';

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['api/executeQuery/pending'],
        ignoredPaths: ['api.queries'],
      },
    }).concat(rootApi.middleware),
});
