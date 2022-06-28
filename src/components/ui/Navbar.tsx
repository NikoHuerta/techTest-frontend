import { MouseEvent } from 'react';
import { AppBar, Box, Button, Container,Toolbar, Typography } from '@mui/material';

import AdbIcon from '@mui/icons-material/Adb';
import { useAppDispatch } from '../../hooks';
import { setNavigationStatus } from '../../store/slices';

const pages = ['Ver Tareas', 'Nueva Tarea'];

export const Navbar = () => {

    const dispatch = useAppDispatch();

    const handleClickNavMenu = (event: MouseEvent<HTMLElement>) => {
        const button = event.currentTarget.getAttribute('value');
        switch(button){
            case 'Ver Tareas':
                dispatch(setNavigationStatus({ status: 'allTasks' }));
                break;

            case 'Nueva Tarea':
                dispatch(setNavigationStatus({ status: 'newTask' }));
                break;

            case 'Home':
                dispatch(setNavigationStatus({ status: 'home' }));
                break;
            
            default:
                dispatch(setNavigationStatus({ status: 'home' }));
                break;
        }
    };

  return (
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar>
                <AdbIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} />
                <Button
                    key="home"
                    value="Inicio"
                    onClick={ handleClickNavMenu }
                >
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                        mr: 2,
                        display: { xs: 'none', sm: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        TAREAS APP
                    </Typography>
                </Button>
                

                <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                    { pages.map((page) => (
                        <Button
                            key={ page }
                            value={ page }
                            onClick={ handleClickNavMenu }
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            { page }
                        </Button>
                    ))}
                </Box>

            </Toolbar>
        </Container>
    </AppBar>
  )
}
