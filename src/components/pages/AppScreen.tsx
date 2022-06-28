import { AppLayout } from '../layout';
import { useAppSelector } from '../../hooks';
import { HomeScreen, ViewTaskScreen, NewTaskScreen, EditTaskScreen } from './';


export const AppScreen = () => {

  const page = useAppSelector(state => state.navigation.status);

  return (
    <>
        <AppLayout>
            { 
                page === 'allTasks' ? <ViewTaskScreen />
                : page === 'newTask' ? <NewTaskScreen />
                : page === 'editTask' ? <EditTaskScreen />
                : <HomeScreen />
            }
        </AppLayout>
    </>
  )
}
