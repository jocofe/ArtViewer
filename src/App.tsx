import './styles/index.scss';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/config';
import { UserContextProviderFirebase } from './context/UserContextProvider';
import { Outlet } from 'react-router-dom';
import { LikesProvider } from './components/Likes/LikesContext';

initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <UserContextProviderFirebase>
        <LikesProvider>
          <Outlet />
        </LikesProvider>
      </UserContextProviderFirebase>
    </>
  );
}

export default App;
