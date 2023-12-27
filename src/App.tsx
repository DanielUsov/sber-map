import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main';
import { SberLine } from './styles/sber-line';

export const App = () => {
  return (
    <BrowserRouter>
      <SberLine />
      <Routes>
        <Route path={'/'}>
          <Route index element={<MainPage />} />
          <Route path="admin" element={<>admin</>} />

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
