import React, { ChangeEvent, useState } from 'react'; 

import { Box, Button, Grid, Input, TextField } from '@mui/material';
import moment, { Moment } from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



import { useForm } from 'react-hook-form';


type FormData = {
  descripcion : string;
  fechaCreacion: Moment;
  vigente : boolean;
}

const taskInitialData = {
  descripcion : '',
  fechaCreacion: moment.now(),
  vigente : true,
}


export const NewTaskScreen = () => {


  const [valueDescription, setValueDescription] = useState<string | null>('');
  const [touched, setTouched] = useState(false);

  const [valueDate, setValueDate] = useState<Date | null>( new Date(moment.now()) );
  const [valueVigente, setVigente] = useState<boolean | null>(true);

  const handleDateChange = (newValue: Date | null) => {
    setValueDate(newValue);
  };

  const handleVigenteChange = (newValue: boolean | null) => {
    setVigente(newValue);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueDescription(event.target.value);
  };

  const handleSubmit = (  ) =>{
    // console.log(data);
    // reset(taskInitialData);
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
              <TextField
                label='Vigente'
                variant='filled'
                fullWidth
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
