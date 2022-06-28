import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ITask } from '../../../interfaces';
import { addTask, removeTask, updateTask, loadTasks } from '../../../store/slices/taskSlice';



import apiModule from '../../../helpers/fetch';



jest.mock('../../../helpers/fetch');


describe( 'Pruebas Asincronas sobre el reducer : task, taskSlice.ts', () => {
    
    let api: jest.Mocked<typeof apiModule>;

    beforeAll(() => {
        api = apiModule as any;
      });

    afterAll(() => {
        jest.unmock('../../../helpers/fetch');
    });

    describe('Añadir nueva Tarea [addTask]', () => {

        let action: AsyncThunkAction<any, ITask, {}>;
        let dispatch: Dispatch;
        let getState: () => unknown;

        let arg: ITask;
        let result: AxiosResponse;

        beforeEach(() => {

            dispatch = jest.fn();
            getState = jest.fn();

            arg = { descripcion: 'descripcion 1', fechaCreacion: '2022-06-28 17:00:00', vigente: true };
            result = { 
                data: { 
                    descripcion: 'descripcion 1', 
                    fechaCreacion: '2022-06-28 17:00:00', 
                    vigente: true, 
                    objectId: '62b5f7f6bd7fc31ea94414f8' 
                },
                status: 201, 
                statusText: 'OK', 
                headers: {}, 
                config: {},
                request: {}
            };
            
            (api as jest.Mock).mockResolvedValue(result);

            action = addTask(arg);
        });

        test('Debe de ejecutar la llamada a API con el argumento correcto', async () => {
            await action(dispatch, getState, undefined);
            expect(api).toHaveBeenCalledWith('task', arg, 'POST');
        });

        test('Debe de ser exitosa la llamada a API', async () => {
            const resp = await action(dispatch, getState, undefined);
            expect(resp.meta.requestStatus).toEqual('fulfilled');
        });
    });

    describe('Obtener todas las Tareas [loadTasks]', () => {

        let action: AsyncThunkAction<ITask[], any, {}>;
        let dispatch: Dispatch;
        let getState: () => unknown;

        let result: AxiosResponse;

        beforeEach(() => {

            dispatch = jest.fn();
            getState = jest.fn();

            result = { 
                data:[{
                        descripcion: "descripcion 1",
                        fechaCreacion: "2022-06-24T19:59:00.000Z",
                        vigente: true,
                        taskId: 1,
                        objectId: "62b5f7f6bd7fc31ea94414f8"
                    },
                    {
                        descripcion: "descripcion 3",
                        fechaCreacion: "2022-06-24T17:45:00.000Z",
                        vigente: true,
                        taskId: 3,
                        objectId: "62b5f88f95705d4ba327e6d0"
                    },
                    {
                        descripcion: "Coding in TypeScript",
                        fechaCreacion: "2022-06-24T19:50:00.000Z",
                        vigente: true,
                        taskId: 5,
                        objectId: "62b621292bc2f617b7b32cd5"
                    }],
                status: 200, 
                statusText: 'OK', 
                headers: {}, 
                config: {},
                request: {}
            };
            
            (api as jest.Mock).mockResolvedValue({ ...result });

            action = loadTasks();
        });

        test('Debe de ejecutar la llamada a API con el argumento correcto', async () => {
            await action(dispatch, getState, null);
            expect(api).toHaveBeenCalledWith('task', undefined, 'GET');
        });

        test('Debe de ser exitosa la llamada a API', async () => {
            const resp = await action(dispatch, getState, undefined);
            expect(resp.meta.requestStatus).toEqual('fulfilled');
        });
    });

    describe('Actualizar Tarea [updateTask]', () => {

        let action: AsyncThunkAction<ITask, ITask, {}>;
        let dispatch: Dispatch;
        let getState: () => unknown;

        let arg: ITask;
        let result: AxiosResponse;

        beforeEach(() => {

            dispatch = jest.fn();
            getState = jest.fn();

            arg = { descripcion: 'descripcion 1 UPDATED', fechaCreacion: '2022-06-28 17:00:00', vigente: true, objectId: '62b5f7f6bd7fc31ea94414f8' };
            result = { 
                data:{
                        descripcion: "descripcion 1 UPDATED",
                        fechaCreacion: "2022-06-24T19:59:00.000Z",
                        vigente: true,
                        taskId: 1,
                        objectId: "62b5f7f6bd7fc31ea94414f8"
                    },
                status: 200, 
                statusText: 'OK', 
                headers: {}, 
                config: {},
                request: {}
            };
            
            (api as jest.Mock).mockResolvedValue({ ...result });

            action = updateTask(arg);
        });

        test('Debe de ejecutar la llamada a API con el argumento correcto', () => { 
            action(dispatch, getState, undefined);
            expect(api).toHaveBeenCalledWith('task/62b5f7f6bd7fc31ea94414f8', arg, 'PUT');
        });

        test('Debe de ser exitosa la llamada a API', async () => {
            const resp = await action(dispatch, getState, undefined);
            expect(resp.meta.requestStatus).toEqual('fulfilled');
        });

    });

    describe('Eliminar Tarea [removeTask]', () => {
            
            let action: AsyncThunkAction<string, any, {}>;
            let dispatch: Dispatch;
            let getState: () => unknown;
    
            let arg: string;
            let result: AxiosResponse;
    
            beforeEach(() => {
    
                dispatch = jest.fn();
                getState = jest.fn();
    
                arg = '62b5f7f6bd7fc31ea94414f8';
                result = { 
                    data:{
                            descripcion: "descripcion 1",
                            fechaCreacion: "2022-06-24T19:59:00.000Z",
                            vigente: true,
                            taskId: 1,
                            objectId: "62b5f7f6bd7fc31ea94414f8"
                        },
                    status: 200, 
                    statusText: 'OK', 
                    headers: {}, 
                    config: {},
                    request: {}
                };
                
                (api as jest.Mock).mockResolvedValue({ ...result });
    
                action = removeTask(arg);
            });
    
            test('Debe de ejecutar la llamada a API con el argumento correcto', () => { 
                action(dispatch, getState, undefined);
                expect(api).toHaveBeenCalledWith('task/62b5f7f6bd7fc31ea94414f8', {}, 'DELETE');
            });
    
            test('Debe de ser exitosa la llamada a API', async () => {
                const resp = await action(dispatch, getState, undefined);
                expect(resp.meta.requestStatus).toEqual('fulfilled');
            });
    
    });
    

});






