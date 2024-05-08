import "./styles/index.scss";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/config";
import { UserContextProviderFirebase } from "./context/UserContextProvider";
import { Outlet } from "react-router-dom";

initializeApp(firebaseConfig);

function App() {
  return (
    <>
    <UserContextProviderFirebase>
      <Outlet />
    </UserContextProviderFirebase>
    </>
  );
}

export default App;
