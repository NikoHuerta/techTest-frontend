import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';


import { darkTheme } from './themes';
import { store } from './store';
import { App } from './App';
import { SnackbarProvider } from 'notistack';

const container = document.getElementById( 'root' )!;
const root = createRoot( container );

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <ThemeProvider theme={ darkTheme }>
        <SnackbarProvider>
        
          <CssBaseline />
          <App />

        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);