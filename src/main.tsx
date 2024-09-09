import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { LocalizerContextProvider } from './contexts/localizerContext';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { Layout } from '@templates/Layout';
import { store } from '@redux/store.ts';
import { Provider as ReduxProvider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <LocalizerContextProvider>
        <ReduxProvider store={store}>
          <Layout>
            <App />
          </Layout>
        </ReduxProvider>
      </LocalizerContextProvider>
    </MantineProvider>
  </StrictMode>,
);
