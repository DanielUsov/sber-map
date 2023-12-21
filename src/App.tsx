import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { YMap } from './components/y-map';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'}>
          <Route index element={<YMap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
