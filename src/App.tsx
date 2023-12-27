import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main';
import { SberLine } from './styles/sber-line';
import { Login } from './pages/login';

export const App = () => {
  return (
    <BrowserRouter>
      <SberLine />
      <Routes>
        <Route path={'/'}>
          <Route index element={<MainPage />} />
          <Route path="admin" element={<Login />} />

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
