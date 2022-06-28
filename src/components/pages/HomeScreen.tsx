import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { loadTasks } from "../../store/slices";

export const HomeScreen = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);
  
  
  return (
    <>
      <h1>Home Screen</h1>

      <Typography variant='subtitle1' gutterBottom sx={{ my: 5 }}>
        App encargada de manejar tareas. 
      </Typography>

      <Typography variant='subtitle2' gutterBottom sx={{ mb: 2 }}>
        Para ver las tareas, haga click en el boton "Ver Tareas".
      </Typography>

      <Typography variant='subtitle2' gutterBottom>
        Para agregar una nueva tarea, haga click en el boton "Nueva Tarea".
      </Typography>
      <Typography variant='subtitle2' gutterBottom>
        En la visualizacion usted podra Editar y Borrar una tarea respectiva.
      </Typography>
    </>
  )
}