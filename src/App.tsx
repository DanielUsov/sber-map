import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AllPartners } from './pages/all-partners';
import { EditPartner } from './pages/edit-partner';
import { Login } from './pages/login';
import { MainPage } from './pages/main';
import { NewPartner } from './pages/new-partner';
import { SberLine } from './styles/sber-line';
import { Error } from './pages/error';
import { PrivateRouter } from './components/privat-router';

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
            <Route
              path="allPartners"
              element={<PrivateRouter element={<AllPartners />} />}
            />
            <Route
              path="partner/:id/:step"
              element={<PrivateRouter element={<EditPartner />} />}
            />
            <Route
              path="newPartner/:step"
              element={<PrivateRouter element={<NewPartner />} />}
            />
          </Route>
          <Route path="error" element={<Error />} />

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
