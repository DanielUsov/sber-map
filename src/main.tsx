import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { CSSReset } from './styles/index.ts';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CSSReset />
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
