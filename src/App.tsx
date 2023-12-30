import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main';
import { SberLine } from './styles/sber-line';
import { Login } from './pages/login';
import { AdminAllPartners } from './pages/admin-panel';
import { PartnerStapper } from './components/partner-stapper';
import { NewPartner } from './pages/new-partner';

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
            <Route path="allPartners" element={<AdminAllPartners />} />
            <Route
              path="partner/:id/:step"
              element={<PartnerStapper partnerStep={1} />}
            />
            <Route path="newPartner/:step" element={<NewPartner />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
