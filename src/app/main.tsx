import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import store from "./store";
import './styles/reset.css';
import './styles/main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
    <App />
      </Provider>
  </StrictMode>,
)
