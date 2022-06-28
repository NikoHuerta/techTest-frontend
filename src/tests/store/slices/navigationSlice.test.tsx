import reducer, { setNavigationStatus } from '../../../store/slices/navigationSlice';
import { NavState } from '../../../store/slices/navigationSlice';

describe('Pruebas sobre el reducer : navigation, navigationSlice.ts', () => {

    test('Debe devolver el estado inicial', () => {
        const state = reducer(undefined, { type: '@@INIT' });
        expect(state).toEqual({
            status: 'home',
        });
    });

    test('Debe de cambiar estado de navegacion', () => {
        const initialState: NavState = { status: 'home' };
        const state = reducer(initialState, setNavigationStatus({ status: 'newTask'}));
        expect(state).toEqual({ status: 'newTask' });
    });

});

