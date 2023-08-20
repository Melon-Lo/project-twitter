import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import ModalContextProvider from 'context/ModalContext';
import TabContextProvider from 'context/TabContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModalContextProvider>
      <TabContextProvider>
        <App />
      </TabContextProvider>
    </ModalContextProvider>
  </React.StrictMode>
);
