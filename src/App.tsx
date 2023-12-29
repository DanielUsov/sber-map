import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main';
import { SberLine } from './styles/sber-line';
import { Login } from './pages/login';
import { AdminAllPartners } from './pages/admin-panel';

export const App = () => {
  return (
    <BrowserRouter>
      <SberLine />
      <Routes>
        <Route path={'/'}>
          <Route index element={<MainPage />} />
          <Route path="admin">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="allpartners" element={<AdminAllPartners />} />
            <Route path="partneredit/:id" element={<>hi</>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
