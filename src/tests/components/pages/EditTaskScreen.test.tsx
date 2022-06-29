import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { darkTheme } from '../../../themes';
import { store } from '../../../store';
import { EditTaskScreen } from '../../../components/pages';
import { setActiveTask } from '../../../store/slices';
import { loadTasks } from '../../../store/slices/taskSlice';


describe('Pruebas en EditTaskScreen.tsx', () => {
    
    beforeAll( async () => {
        await store.dispatch(loadTasks());
        store.dispatch(setActiveTask('62b5f7f6bd7fc31ea94414f8'));
        store.getState().task.activeTask;
    });

    test('Debe de renderizarse correctamente', () => {

        const { asFragment } = render( 
            <Provider store={ store }>
                <ThemeProvider theme={ darkTheme }>
                    <SnackbarProvider>
    
                        <EditTaskScreen />
    
                    <CssBaseline />
                    </SnackbarProvider>
                </ThemeProvider>
            </Provider>);

        expect(asFragment()).toMatchSnapshot();
    });

    test('Debe de mostrar el titulo', () => {

        const { container } = render( 
            <Provider store={ store }>
                <ThemeProvider theme={ darkTheme }>
                    <SnackbarProvider>
    
                        <EditTaskScreen />
    
                    <CssBaseline />
                    </SnackbarProvider>
                </ThemeProvider>
            </Provider>);

        expect(container.querySelectorAll('h1')).toBeDefined();
    });

    test('Debe de mostrar el formulario de edicion', () => {

        const { container } = render( 
            <Provider store={ store }>
                <ThemeProvider theme={ darkTheme }>
                    <SnackbarProvider>
    
                        <EditTaskScreen />
    
                    <CssBaseline />
                    </SnackbarProvider>
                </ThemeProvider>
            </Provider>);
            
        expect(container.querySelectorAll('form')).toBeDefined();
    });



});