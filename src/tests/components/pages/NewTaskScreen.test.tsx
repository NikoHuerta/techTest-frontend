import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { darkTheme } from '../../../themes';
import { store } from '../../../store';
import { NewTaskScreen } from '../../../components/pages';


describe('Pruebas en NewTaskScreen.tsx', () => {

    const { asFragment, container } = render( 
        <Provider store={ store }>
            <ThemeProvider theme={ darkTheme }>
                <SnackbarProvider>

                    <NewTaskScreen />

                <CssBaseline />
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>);

    test('Debe de renderizarse correctamente', () => {
        expect(asFragment()).toMatchSnapshot();
    });

    test('Debe de mostrar el titulo', () => {
        expect(container.querySelectorAll('h1')).toBeDefined();
    });

    test('Debe de mostrar el formulario de creacion', () => {
        expect(container.querySelectorAll('form')).toBeDefined();
    });



});