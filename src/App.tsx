import React from 'react';
import './App.css';

import 'antd/dist/antd.css'

import GlobalStyle from './styles/global';
import Routes from './routes';

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/AuthContext';

const App:React.FC = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
      <GlobalStyle />
    </>
  );
}
export default App;
