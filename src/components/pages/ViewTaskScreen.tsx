import { Button, Chip, Grid, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment';
import { useSnackbar } from 'notistack';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveTask, setNavigationStatus, removeTask } from '../../store/slices';


export const ViewTaskScreen = () => {

  const dataRows = useAppSelector(state => state.task.tasks);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const rows = dataRows.map( (task, index) => {
    return {
      id: index,
      num: index + 1,
      descripcion: task.descripcion,
      fechaCreacion: moment(task.fechaCreacion).format('MMMM Do YYYY, h:mm'),
      vigente: task.vigente,
      objectId: task.objectId
    }
  });

  const columns: GridColDef[] = [
      { field: 'num', headerName: 'Num', width: 100, sortable: true },
      { field: 'descripcion', headerName: 'Descripcion', width: 400, sortable: true },
      { field: 'fechaCreacion', headerName: 'Fecha de Creacion', width: 300, sortable: true },
      { 
        field: 'vigente', 
        headerName: 'Vigente',
        renderCell: ({ row }: GridValueGetterParams) => {
          return row.vigente 
            ? (<Chip variant='outlined' label='Si' color='success' />) 
            : (<Chip variant='outlined' label='No' color='error' />)
        },
        width: 100, 
        sortable: true 
      },
      {
        field: 'actions',
        headerName: 'Acciones',
        renderCell: ({ row }: GridValueGetterParams) => {
          return (
            <>
              <Tooltip title='Editar'>
                <Button
                    color='primary'
                    onClick={() =>  { handleEdit(row.objectId) } }
                  >
                    <ModeEditOutlineIcon />
                </Button>
              </Tooltip>

              <Tooltip title='Eliminar'>
                <Button
                  color='primary'
                  onClick={() =>  { handleDelete(row.objectId) } }
                >
                  <DeleteOutlineIcon />
                </Button>
              </Tooltip>
            </>
          )
        },
        width: 200,
      }
  ];

  const handleEdit = (taskObjectId: string) => {
    console.log('Editar tarea: ', taskObjectId);
    dispatch( setActiveTask( taskObjectId ) );
    dispatch( setNavigationStatus({ status: 'editTask' }) );
    
  }
  const handleDelete = async (taskObjectId: string) => {

    try {
      const resp = await dispatch( removeTask( taskObjectId ) );
      if(resp.meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Tarea eliminada correctamente', {
          variant: 'success',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }
        });
      } else {
        enqueueSnackbar('Error en la comunicacion con backend', {
          variant: 'error',
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }
        });
      }
    } catch (e: any) {
      console.log('error', e);
    }
  }

  

  return (
    <>
        <h1>View Task Screen</h1>

        <Grid container className='fadeIn'>
          <Grid item xs={12} sx={{ height:650, width:'100%' }}>
              <DataGrid
                  columns={ columns } 
                  rows={ rows }                    
                  pageSize={10}
                  rowsPerPageOptions={[5, 10, 20, 50]}
              />
          </Grid>
        </Grid>
        
    </>
  )
}
