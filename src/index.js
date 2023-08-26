import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// import contexts
import ModalContextProvider from 'context/ModalContext';
import TabContextProvider from 'context/TabContext';
import PageContextProvider from 'context/PageContext';
import AuthContextProvider from 'context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PageContextProvider>
      <ModalContextProvider>
        <TabContextProvider>
          <App />
        </TabContextProvider>
      </ModalContextProvider>
    </PageContextProvider>
  </React.StrictMode>
);
