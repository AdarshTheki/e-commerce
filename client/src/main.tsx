import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Assets/index.css';
import App from './App.tsx';
import { store } from './Redux/store.ts';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
