import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppScreen } from '../components/pages';




export const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppScreen />} />
                <Route path='*' element={<Navigate replace to={'/'} />} />
            </Routes>
        </BrowserRouter>
    )
}