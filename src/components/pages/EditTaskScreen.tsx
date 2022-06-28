import { ChangeEvent, FormEvent, useState } from 'react'; 

import { Box, Button, FormControlLabel, Grid, TextField, Checkbox } from '@mui/material';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setNavigationStatus, updateTask } from '../../store/slices';
import { ITask } from '../../interfaces';

export const EditTaskScreen = () => {

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { objectId, descripcion, fechaCreacion, vigente } = useAppSelector(state => state.task.activeTask!);


  const [valueDescription, setValueDescription] = useState<string>(descripcion);
  const [touched, setTouched] = useState(false);
  const [valueDate, setValueDate] = useState<Date | null>( new Date(fechaCreacion) );
  const [valueVigente, setVigente] = useState<boolean | null>(vigente);


  const handleDateChange = (newValue: Date | null) => {
    setValueDate(newValue);
  };

  const handleVigenteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVigente(event.target.checked);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueDescription(event.target.value);
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(valueDescription ==='') {
      return enqueueSnackbar('La descripcion no puede ser vacia', { 
        variant: 'error',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        } 
      });
    }
    
    const updatedTask: ITask = {
      descripcion : (valueDescription) ? valueDescription : '',
      fechaCreacion: moment(valueDate).format('YYYY-MM-DD HH:mm:ss'),
      vigente : (valueVigente) ? valueVigente : false,
      objectId,
    }

    try {
      const resp = await dispatch(updateTask(updatedTask));

      if(resp.meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Tarea editada correctamente', { 
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

    } catch (e:any) {
      console.log('error', e);
    }
  }


  return (
    <>
      <h1>Edit Task Screen</h1>


      <form onSubmit={ handleUpdate } noValidate >
          
          <Grid container spacing={2} sx={{ mt:5 }}>
            <Grid item xs={6} sm={4}>
              <TextField
                label='Descripcion'
                name='descripcion'
                variant='filled'
                fullWidth
                required

                helperText={ valueDescription!.length === 0 && touched && 'Ingrese un valor'}
                error={ valueDescription!.length === 0 && touched }
                value={ valueDescription }
                onChange={ handleDescriptionChange }
                onBlur={ () => setTouched(true) }


              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <LocalizationProvider dateAdapter={ AdapterMoment }>
                <DateTimePicker
                  label="Fecha de Creacion"
                  value={ valueDate }
                  onChange={ handleDateChange }
                  renderInput={( params ) => <TextField fullWidth variant='filled' name='fechaCreacion' {...params} />}
                />
              </LocalizationProvider>
              
            </Grid>  
            <Grid item xs={6} sm={4}>
              <FormControlLabel
                control={ 
                  <Checkbox checked={ valueVigente! } onChange={ handleVigenteChange } name='vigente' />
                }
                label='Vigente'
              />
            </Grid>    
          </Grid>

          <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
            
            <Button 
                type='button'
                color='primary' 
                className='circular-btn' 
                size='large'
                onClick={ () => { dispatch(setNavigationStatus({ status: 'allTasks' })) } }
              >
                Volver
            </Button>

            <Button 
              type='submit'
              color='primary' 
              className='circular-btn' 
              size='large'
            >
              Actualizar Tarea
            </Button>
          </Box>
      
      </form>

    </>
  )
}
