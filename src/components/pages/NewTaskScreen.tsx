import { ChangeEvent, FormEvent, useState } from 'react'; 

import { Box, Button, FormControlLabel, Grid, TextField, Checkbox } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useSnackbar } from 'notistack';
import moment from 'moment';

import { useAppDispatch } from '../../hooks';
import { addTask } from '../../store/slices';
import { ITask } from '../../interfaces/task';



export const NewTaskScreen = () => {

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const [valueDescription, setValueDescription] = useState<string | null>('');
  const [touched, setTouched] = useState(false);
  const [valueDate, setValueDate] = useState<Date | null>( new Date(moment.now()) );
  const [valueVigente, setVigente] = useState<boolean | null>(true);

  const handleDateChange = (newValue: Date | null) => {
    setValueDate(newValue);
  };

  const handleVigenteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVigente(event.target.checked);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueDescription(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(valueDescription ==='') {
      return enqueueSnackbar('Debe ingresar una descripcion', { 
        variant: 'error',
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        } 
      });
    } 

    const newTask: ITask = {
      descripcion : (valueDescription) ? valueDescription : '',
      fechaCreacion: moment(valueDate).format('YYYY-MM-DD HH:mm:ss'),
      vigente : (valueVigente) ? valueVigente : false,
    }

    try {
      const resp = await dispatch(addTask(newTask));

      if(resp.meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Tarea agregada correctamente', { 
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
        <h1>New Task Screen</h1>
        
        <form onSubmit={ handleSubmit } noValidate >
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
              type='submit'
              color='primary' 
              className='circular-btn' 
              size='large'
            >
              Crear Tarea
            </Button>
          </Box>


        </form>
    </>
  )
}
