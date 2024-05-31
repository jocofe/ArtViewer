import './styles/index.scss';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/config';
import { UserContextProviderFirebase } from './context/UserContextProvider';
import { Outlet } from 'react-router-dom';
import { LikesProvider } from './context/LikesProvider';
import React from 'react';

initializeApp(firebaseConfig);

function App() {
  return (
    <React.StrictMode>
      <UserContextProviderFirebase>
        <LikesProvider>
          <Outlet />
        </LikesProvider>
      </UserContextProviderFirebase>
    </React.StrictMode>
  );
}

export default App;
