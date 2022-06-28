import reducer, { setActiveTask, removeActiveTask, addTask, removeTask, updateTask, loadTasks } from '../../../store/slices/taskSlice';
import { TaskState } from '../../../store/slices/taskSlice';



describe('Pruebas sobre el reducer : task, taskSlice.ts', () => {

    let initialState: TaskState;

    beforeEach(() => {
        initialState = {
            tasks: [
                {
                    descripcion: 'descripcion 1',
                    fechaCreacion: '2022-06-24T19:59:00.000Z',
                    vigente: true,
                    taskId: 1,
                    objectId: '62b5f7f6bd7fc31ea94414f8'
                },
                {
                    descripcion: 'descripcion 3',
                    fechaCreacion: '2022-06-24T17:45:00.000Z',
                    vigente: true,
                    taskId: 3,
                    objectId: '62b5f88f95705d4ba327e6d0'
                },
                {
                    descripcion: 'Coding in TypeScript',
                    fechaCreacion: '2022-06-24T19:50:00.000Z',
                    vigente: true,
                    taskId: 5,
                    objectId: '62b621292bc2f617b7b32cd5'
                }],
            status: 'idle',
            activeTask: null,
        }
    });

    test('Debe devolver el estado inicial', () => {
        const state = reducer(undefined, { type: '@@INIT' });
        expect(state).toEqual({
            tasks: [],
            status: 'idle',
            activeTask: null,
        });
    });

    test('Debe setear tarea activa', () => {

        const state = reducer(initialState, setActiveTask('62b5f7f6bd7fc31ea94414f8'));
        expect(state.activeTask).toEqual({
            descripcion: 'descripcion 1',
            fechaCreacion: '2022-06-24T19:59:00.000Z',
            vigente: true,
            taskId: 1,
            objectId: '62b5f7f6bd7fc31ea94414f8'
        });
    });

    test('Debe eliminar tarea activa', () => {

        let state = reducer(initialState, setActiveTask('62b5f7f6bd7fc31ea94414f8'));
        state = reducer(initialState, removeActiveTask());
        expect(state.activeTask).toBeNull();
    });

});


