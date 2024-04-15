import "./styles/index.scss";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/config";
import { UserContextProviderFirebase } from "./context/UserContextProvider";
import { Outlet } from "react-router-dom";
import { TopBar } from "./layouts/Topbar/TopBar";

initializeApp(firebaseConfig);

function App() {
  console.log('App renderizado');
  return (
    <>
    <UserContextProviderFirebase>
      <TopBar size='normal' type='without-login'/>
      <Outlet />
    </UserContextProviderFirebase>
    </>
  );
}

export default App;
