import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main';
import { SberLine } from './styles/sber-line';

export const App = () => {
  return (
    <BrowserRouter>
      <SberLine />
      <Routes>
        <Route path={'/'}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
