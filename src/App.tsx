import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
